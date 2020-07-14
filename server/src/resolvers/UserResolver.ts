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
  ArgsType,
  Args,
} from 'type-graphql';
import { Min, Max } from 'class-validator';
import { hash, compare } from 'bcryptjs';
import { User } from '../entity/User';
import { MyContext } from '../MyContext';
import { createRefreshToken, createAccessToken } from '../auth';
import { isAuth } from '../isAuth';
import { sendRefreshToken } from '../sendRefreshToken';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail';
import { createConfirmationUrl } from '../utils/createConfirmationUrl';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

// User query arguments for pagination
@ArgsType()
class GetUsersArgs {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;

  @Field(() => Int)
  @Min(1)
  @Max(12)
  take = 12;

  // helpers - index calculations
  get startIndex(): number {
    return this.skip;
  }
  get endIndex(): number {
    return this.skip + this.take;
  }
}

// User Resolver
@Resolver()
export class UserResolver {
  // Query for all users
  @Query(() => [User])
  @UseMiddleware(isAuth)
  async users(@Args() { startIndex, endIndex }: GetUsersArgs) {
    // Grab all users
    let users = await User.find({ relations: ['posts'] });
    // Paginate
    return users.slice(startIndex, endIndex);
  }

  // Query for single user
  @Query(() => [User])
  async getUser(@Arg('username') username: string) {
    let user: any;
    // Grab user by username
    user = await User.find({
      where: {
        username,
      },
    });

    if (!user.length) {
      throw new Error('User not found.');
    } else {
      return user;
    }
  }

  // Identify logged-in user
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
      User.insert({
        username,
        email,
        password: hashedPassword,
      });

      await sendEmail(email, createConfirmationUrl(email));
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => String)
  async confirmUser(@Ctx() context: MyContext) {
    const token = context.req.headers['token'];

    if (!token) {
      return 'Sorry, you must provide a token from confirmed e-mail.';
    }

    try {
      const payload: any = verify(
        token as string,
        process.env.EMAIL_TOKEN_SECRET!
      );

      await User.update({ email: payload?.email }, { confirmed: true });
    } catch (err) {
      console.log(err);
      return 'Sorry, please verify e-mail.';
    }

    return 'User updated and confirmed e-mail.';
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

    if (!user.confirmed) {
      throw new Error('User: Confirm your email.');
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
  async removeUser(@Arg('role') role: string, @Arg('id') id: number) {
    try {
      if (role === 'user' && id) {
        throw new Error('Unauthenticated');
      }

      // if (role === 'admin') {
      await User.delete({
        id,
      });
      console.log(`Admin — Removed User ID:${id}`);
      // }
    } catch (err) {
      console.log(err);
    }

    return true;
  }
}
