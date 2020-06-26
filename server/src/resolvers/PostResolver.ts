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
    // Grab all posts by username
    let posts = await Post.find({
      relations: ['user'],
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return posts;
  }

  // Add Post
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addPost(
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

  // Ensure logged-in user.id matches post._userId
  // Delete id of post passed in as argument

  // Delete Post
  // @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  // async deletePost(@Arg('id') id: number, @Ctx() context: MyContext) {
  //   try {
  //     const userId: number = Number(context.payload?.userId);
  //     const posts: any = await this.posts(userId);

  //     for (const post of posts) {
  //       if (post.id === id) {
  //         await Post.delete({
  //           id,
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }

  //   console.log(`Removed post ID: ${id}`);
  //   return true;
  // }
}
