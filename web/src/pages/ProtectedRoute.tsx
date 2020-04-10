import React from 'react';
import { useProtectedRouteQuery } from '../generated/graphql';

interface Props {}

export const ProtectedRoute: React.FC<Props> = () => {
  const { data, loading, error } = useProtectedRouteQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Must login to view page.</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
    </div>
  );
};
