import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { UserList } from '../../components/userList/UserList';

interface Props {}

export const Admin: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();

  let adminData: any = null;

  if (loading) {
    adminData = <div>Loading...</div>;
  }

  if (!data) {
    adminData = <div>Error</div>;
  }

  return (
    <div className="page">
      <h1 className="page-title">Admin Page</h1>
      <div>{adminData}</div>
    </div>
  );
};
