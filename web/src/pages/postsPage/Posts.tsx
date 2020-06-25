import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { usePostsQuery } from '../../generated/graphql';

interface Props {
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
      posts.map((post: any, idx: any) => {
        return (
          <div key={idx}>
            <h4>Title: {post.title}</h4>
            <h6>{post.description}</h6>
          </div>
        );
      })
    ) : (
      <div>User has 0 posts.</div>
    );

    postData = <div>{usersPosts}</div>;
  }

  return (
    <div className="Posts page">
      <h1>Posts</h1>
      {postData}
    </div>
  );
};
