import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  usePostsQuery,
  useDeletePostMutation,
  useEditPostMutation,
} from '../../generated/graphql';

import './Posts.css';

interface Props {
  user: string;
  id: string;
}

export const Posts = ({ match }: RouteComponentProps<Props>) => {
  const { data, loading, error } = usePostsQuery({
    variables: {
      userId: parseInt(match.params.id),
    },
  });

  const [deletePost] = useDeletePostMutation();
  const [editPost] = useEditPostMutation();

  let postData: any = null;

  if (loading) {
    postData = <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    postData = <div>Posts not found</div>;
  }

  if (data) {
    const posts: any = data.posts;

    const usersPosts = posts.length ? (
      <ul>
        {posts.map((post: any) => {
          const shortenPostDescription = (post: any) =>
            post.length > 55 ? `${post.substring(0, 55)}...` : post;
          return (
            <li key={post.id}>
              <div>
                <h4>
                  <span className="post-title">Post Title:</span> {post.title}
                </h4>
                <h6>{shortenPostDescription(post.description)}</h6>
                {/* <h6>Author: {user}</h6> */}
              </div>
              <div>
                <button
                  className="primaryBtn"
                  onClick={async (e) => {
                    e.preventDefault();
                    const response = await editPost({
                      variables: {
                        id: post.id,
                        title: 'title',
                        description: 'description',
                      },
                    });

                    if (response) {
                      console.log(`Edited Post`);
                    } else {
                      console.log(`Unauthenticated — Not user.`);
                    }
                  }}
                >
                  Edit Post
                </button>
                <button
                  className="secondaryBtn"
                  onClick={async (e) => {
                    e.preventDefault();
                    console.log(post.id);
                    const response = await deletePost({
                      variables: {
                        id: post.id,
                      },
                    });

                    if (response) {
                      console.log(`Removed Post`);
                    } else {
                      console.log(`Unauthenticated — Not admin.`);
                    }
                  }}
                >
                  Delete Post
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      <div>User has 0 posts.</div>
    );

    postData = <div>{usersPosts}</div>;
  }

  const username = match.params.user;

  return (
    <div className="Posts page">
      <h1>{username}'s Posts</h1>
      {postData}
    </div>
  );
};
