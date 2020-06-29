import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useGetUserQuery } from '../../generated/graphql';

interface Props {
  user: string;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { data, loading, error } = useGetUserQuery({
    variables: {
      username: user,
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
    const searchedUserId = searchedUser.id;
    const username: string = searchedUser.username;
    const avatar: string = searchedUser.avatar;
    const role: string = searchedUser.role;
    const capitalizedRole: string =
      role.charAt(0).toUpperCase() + role.slice(1);
    userData = (
      <div>
        <img src={avatar} alt={`${username}'s avatar.`} />
        <p>Username:</p>
        <h1>{username}</h1>
        <p>Role:</p>
        <h3>{capitalizedRole}</h3>
        <Link
          to={{ pathname: `/user/${user}/${searchedUserId}/posts` }}
          className=""
        >
          {username}'s Posts
        </Link>
      </div>
    );
  }

  // if (user !== '' && !user) {
  //   return <Redirect to={{ pathname: '/404' }} />;
  // }

  return <div className="UserInfo page">{userData}</div>;
};
