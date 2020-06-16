import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { UserList } from '../../components/userList/UserList';

interface Props {}

export const Protected: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();

  let userData: any = null;

  if (loading) {
    userData = <div>Loading...</div>;
  }

  if (!data) {
    userData = <div>Error</div>;
  }

  if (data && !data.me?.role) {
    userData = <div>Unauthenticated — Must be user.</div>;
  }

  if (data && data.me?.role) {
    userData = <div>Welcome {data.me.username} to the users page!</div>;
  }

  return (
    <div className="page">
      <h1 className="page-title">Users Page</h1>
      {userData}
    </div>
  );
};
