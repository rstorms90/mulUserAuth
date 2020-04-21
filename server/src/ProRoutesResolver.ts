import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';
import { MyContext } from './MyContext';
import { isAuth } from './isAuth';

@Resolver()
export class ProRoutesResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  getStarted(@Ctx() { payload }: MyContext) {
    return `Your user id is: ${payload!.userId}`;
  }
}
