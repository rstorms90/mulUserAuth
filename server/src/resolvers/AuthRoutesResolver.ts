import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';
import { MyContext } from '../MyContext';
import { isAuth } from '../isAuth';

@Resolver()
export class AuthRoutesResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  protectedRoute(@Ctx() { payload }: MyContext) {
    return `Your user id is: ${payload!.userId}`;
  }
}
