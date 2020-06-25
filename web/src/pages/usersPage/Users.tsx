import React from 'react';
import { useMeQuery } from '../../generated/graphql';

interface Props {}

export const Users: React.FC<Props> = () => {
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
    userData = (
      <div>
        Welcome <span className="current-user">{data.me.username}</span> to the
        users page!
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Users Page</h1>
      {userData}
    </div>
  );
};