import {
  Resolver,
  Query,
  Mutation,
  UseMiddleware,
  Arg,
  Ctx,
} from 'type-graphql';
import { Post } from '../entity/Post';
import { isAuth } from '../isAuth';
import { MyContext } from '../MyContext';

// Post Resolver
@Resolver()
export class PostResolver {
  // Query for all posts by user
  @Query(() => [Post])
  async posts(@Arg('userId') userId: number) {
    // Grab all posts
    let posts = await Post.find({
      relations: ['user'],
      where: {
        user: {
          id: userId,
        },
      },
    });

    return posts;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx() context: MyContext
  ) {
    try {
      const userId: number = Number(context.payload?.userId);
      await Post.insert({
        title,
        description,
        userId,
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
