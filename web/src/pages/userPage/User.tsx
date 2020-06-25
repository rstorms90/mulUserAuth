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
  const id = parseInt(match.params.id);

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

    userData = (
      <div>
        <h1>{username}</h1>
        <h3>Role: {capitalizedRole}</h3>

        <Link to={{ pathname: `/user/${id}/posts` }} className="">
          {username}'s Posts
        </Link>
      </div>
    );
  }

  if (id !== 0 && !id) {
    return <Redirect to={{ pathname: '/404' }} />;
  }

  return <div className="User page">{userData}</div>;
};
