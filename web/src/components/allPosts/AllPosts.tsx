import React from 'react';
import { usePostsQuery } from '../../generated/graphql';
import Post from '../post/Post';

interface Props {}

const AllPosts: React.FC<Props> = () => {
  const { data, loading, error } = usePostsQuery();

  let postsData: any = null;

  if (loading) {
    postsData = <div>Loading...</div>;
  }

  if (!data) {
    postsData = null;
  }

  if (data) {
    const posts: any = data.posts;

    const allPosts = posts.length ? (
      <ul className="post-list">
        {posts.map((post: any, key: number) => {
          return <Post post={post} key={key} />;
        })}
      </ul>
    ) : (
      <div>0 posts.</div>
    );

    postsData = <>{allPosts}</>;
  }

  return (
    <div>
      <h1>Latest Posts:</h1>
      {postsData}
    </div>
  );
};

export default AllPosts;
