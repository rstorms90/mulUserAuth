import React from 'react';
import Post from '../../components/post/Post';

import { RouteComponentProps } from 'react-router-dom';
import { usePostsQuery } from '../../generated/graphql';

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
        {posts.map((post: any, key: number) => {
          return <Post post={post} key={key} />;
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
