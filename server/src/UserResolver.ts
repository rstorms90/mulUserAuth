import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from './entity/User';
import { MyContext } from './MyContext';
import { createRefreshToken, createAccessToken } from './auth';
import { isAuth } from './isAuth';
import { sendRefreshToken } from './sendRefreshToken';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  forum(@Ctx() { payload }: MyContext) {
    return `Your user id is: ${payload!.userId}`;
  }

  // Query for all users
  @Query(() => [User])
  @UseMiddleware(isAuth)
  async users(@Arg('role') role: string) {
    if (role !== 'admin') {
      throw new Error('Unauthenticated');
    } else {
      return User.find();
    }
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // Register User
  @Mutation(() => Boolean)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        username,
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  // Login User
  @Mutation(() => LoginResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('User: User not found.');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('User: Wrong password.');
    }

    // Login successful
    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  // Logout User
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '');

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);

    return true;
  }

  // Super Admin — Remove User
  @Mutation(() => Boolean)
  async removeUser(@Arg('id') id: number) {
    try {
      await User.delete({
        id,
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    console.log(`Admin — Removed User ID:${id}`);
    return true;
  }
}