import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { UserInfo } from '../../components/userInfo/UserInfo';

interface Props {
  user: string;
}

export const UserProfile = ({ match }: RouteComponentProps<Props>) => {
  const username = match.params.user;
  let history = useHistory();

  return (
    <div className="UserProfile page">
      <h1>{username}'s Profile</h1>
      <UserInfo user={match.params.user} />
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
};
