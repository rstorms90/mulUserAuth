import React from 'react';
import { RouteComponentProps, Redirect, Link } from 'react-router-dom';
import { useGetUserQuery } from '../../generated/graphql';

interface Props {
  id: string;
}

export const User = ({ match }: RouteComponentProps<Props>) => {
  const { data, loading, error } = useGetUserQuery({
    variables: {
      id: parseInt(match.params.id),
    },
  });

  let userData: any = null;

  if (loading) {
    userData = <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    userData = <div>User not found</div>;
  }

  if (data) {
    const searchedUser = data.getUser[0];
    const username: string = searchedUser.username;
    const role: string = searchedUser.role;
    const capitalizedRole: string =
      role.charAt(0).toUpperCase() + role.slice(1);
    const usersPosts: any = searchedUser.posts.length ? (
      searchedUser.posts.map((post, idx) => {
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

    userData = (
      <div>
        <h1>{username}</h1>
        <h3>Role: {capitalizedRole}</h3>
        <h3>
          {username} has {usersPosts.length} posts.
        </h3>
        {usersPosts}
      </div>
    );
  }

  const id = parseInt(match.params.id);

  if (id !== 0 && !id) {
    return <Redirect to={{ pathname: '/404' }} />;
  }

  return <div className="User page">{userData}</div>;
};
