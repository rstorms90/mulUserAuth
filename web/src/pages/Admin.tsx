import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { UserList } from '../UserList';

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

  if (data && data.me?.role !== 'admin') {
    adminData = <div>Unauthenticated — Must be admin.</div>;
  }

  if (data && data.me?.role === 'admin') {
    adminData = <UserList />;
  }

  return <div>{adminData}</div>;
};
