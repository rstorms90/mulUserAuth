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
    return <div>No data</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <h4>For Users Only</h4>
      <h5>I'm warning you!</h5>
      <h6>I'm warning you...again!</h6>
      <p>...</p>
    </div>
  );
};
