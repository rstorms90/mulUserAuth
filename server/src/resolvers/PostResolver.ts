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
import { AuthenticationError } from 'apollo-server-express';

// Post Resolver
@Resolver()
export class PostResolver {
  // Query for all posts
  @Query(() => [Post])
  async posts() {
    // Grab all posts
    let posts = await Post.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
    return posts;
  }

  // Query for all posts by user
  @Query(() => [Post])
  async getPostsByUser(@Arg('userId') userId: number) {
    // Grab all posts by userId
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

  // Query for single post
  @Query(() => [Post])
  async getPost(@Arg('id') id: number) {
    let post: any;
    // Grab post by id
    post = await Post.find({
      where: {
        id,
      },
    });

    if (!post.length) {
      throw new Error('Post not found.');
    } else {
      return post;
    }
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
      if (!title.length || !description.length) {
        throw new Error('You need a title and description.');
      }

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
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(@Arg('id') id: number, @Ctx() context: MyContext) {
    try {
      const meId: number = Number(context.payload?.userId);
      const post: any = await Post.find({ id });

      const postAuthorId = post[0].userId;

      if (meId === postAuthorId) {
        Post.delete({
          id,
        });
        return true;
      } else {
        throw new AuthenticationError('Unauthenticated — Not your post.');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // Edit Post
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async editPost(
    @Arg('id') id: number,
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx() context: MyContext
  ) {
    try {
      const meId: number = Number(context.payload?.userId);
      const post: any = await Post.find({ id });

      const postAuthorId = post[0].userId;

      if (meId === postAuthorId) {
        await Post.update(id, {
          title,
          description,
        });
        return true;
      } else {
        throw new AuthenticationError('Unauthenticated');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
