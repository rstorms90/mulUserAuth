import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useGetUserQuery } from '../../generated/graphql';

import './UserInfo.css';

interface Props {
  user: string;
  myProfile: boolean;
}

export const UserInfo: React.FC<Props> = ({ user, myProfile }) => {
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
    const searchedUserId: number = searchedUser.id;
    const username: string = searchedUser.username;
    const avatar: string = searchedUser.avatar;
    const role: string = searchedUser.role;
    const capitalizedRole: string =
      role.charAt(0).toUpperCase() + role.slice(1);
    let checkUser = myProfile ? <>My Posts</> : <>{username}'s Posts</>;

    userData = (
      <div>
        <img src={avatar} alt={`${username}'s avatar.`} />
        <div className="username-container">
          <p className="username-title">Username:</p>
          <h3 className="user-info">{username}</h3>
        </div>
        <div className="role-container">
          <p className="role-title">Role:</p>
          <h3 className="user-info">{capitalizedRole}</h3>
        </div>

        <Link
          to={{ pathname: `/user/${user}/${searchedUserId}/posts` }}
          className="posts-link"
        >
          {checkUser}
        </Link>
      </div>
    );
  }

  if (user !== '' && !user) {
    return <Redirect to={{ pathname: '/404' }} />;
  }

  return <div className="UserInfo">{userData}</div>;
};
