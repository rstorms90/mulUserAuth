import React from 'react';
import { Link } from 'react-router-dom';
import { useProtectedRouteQuery } from '../generated/graphql';

interface Props {}

export const ProtectedRoute: React.FC<Props> = () => {
  const { data, loading, error } = useProtectedRouteQuery({
    fetchPolicy: 'network-only',
  });

  let body: any = null;

  if (loading) {
    body = <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    body = <div>{error}</div>;
  }

  if (!data) {
    body = (
      <div>
        Must{' '}
        <Link className="link" to="/login">
          Login
        </Link>{' '}
        to view page.
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Forum</h1>
      {body}
    </div>
  );
};
