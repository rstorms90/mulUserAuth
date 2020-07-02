import React from 'react';
import Post from '../../components/post/Post';

import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useGetPostsByUserQuery } from '../../generated/graphql';

import './Posts.css';

interface Props {
  user: string;
  id: string;
}

export const Posts = ({ match }: RouteComponentProps<Props>) => {
  let history = useHistory();
  const { data, loading, error } = useGetPostsByUserQuery({
    variables: {
      userId: parseInt(match.params.id),
    },
  });

  let usersPosts: any = null;

  if (loading) {
    usersPosts = <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    usersPosts = <div>Posts not found</div>;
  }

  if (data) {
    const posts: any = data.getPostsByUser;

    const postsData = posts.length ? (
      <ul className="post-list">
        {posts.map((post: any, key: number) => {
          return <Post post={post} key={key} />;
        })}
      </ul>
    ) : (
      <div>User has 0 posts.</div>
    );

    usersPosts = <>{postsData}</>;
  }

  const username = match.params.user;

  return (
    <div className="Posts page">
      <button onClick={() => history.goBack()}>Back</button>
      <h1>{username}'s Posts</h1>
      {usersPosts}
    </div>
  );
};
