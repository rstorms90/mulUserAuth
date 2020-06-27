import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { UsersList } from '../../components/usersList/UsersList';

interface Props {}

export const Users: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();

  let usersData: any = null;

  if (loading) {
    usersData = <div>Loading...</div>;
  }

  if (!data) {
    usersData = <div>Error</div>;
  }

  if (data) {
    usersData = <UsersList myRole={data?.me?.role} />;
  }

  return (
    <div className="page">
      <h1 className="page-title">Users Page</h1>
      <div>{usersData}</div>
    </div>
  );
};
