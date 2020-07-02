import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { UserInfo } from '../../components/userInfo/UserInfo';
import { useMeQuery } from '../../generated/graphql';

interface Props {
  user: string;
}

export const UserProfile = ({ match }: RouteComponentProps<Props>) => {
  const { data } = useMeQuery();
  const username = match.params.user;
  let history = useHistory();

  let currentUser = null;

  if (data?.me?.username === username) {
    currentUser = <span>My</span>;
  } else {
    currentUser = <div>{username}'s</div>;
  }

  return (
    <div className="UserProfile page">
      <button onClick={() => history.goBack()}>Back</button>
      <h1>{currentUser} Profile</h1>
      <UserInfo user={match.params.user} />
    </div>
  );
};
