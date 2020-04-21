import React from 'react';
import { Link } from 'react-router-dom';
import { useGetStartedQuery } from '../generated/graphql';

interface Props {}

export const GetStarted: React.FC<Props> = () => {
  const { data, loading, error } = useGetStartedQuery({
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
        <h3>
          <Link className="link" to="/login">
            Login
          </Link>
          to view page.
        </h3>
      </div>
    );
  }

  if (data) {
    body = <div className="page-sub-title">Get started content</div>;
  }

  return (
    <div className="page">
      <h1 className="page-title">Get Started!</h1>
      {body}
    </div>
  );
};
