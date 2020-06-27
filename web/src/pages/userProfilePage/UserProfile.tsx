import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UserInfo } from '../../components/userInfo/UserInfo';

interface Props {
  user: string;
}

export const UserProfile = ({ match }: RouteComponentProps<Props>) => {
  const username = match.params.user;

  return (
    <div className="UserProfile page">
      <h1>{username}'s Profile</h1>
      <UserInfo user={match.params.user} />
    </div>
  );
};
