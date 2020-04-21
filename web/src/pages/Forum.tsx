import React from 'react';
import { Link } from 'react-router-dom';
import { useForumQuery } from '../generated/graphql';

interface Props {}

export const Forum: React.FC<Props> = () => {
  const { data, loading, error } = useForumQuery({
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
    body = <div>Forum content</div>;
  }

  return (
    <div className="page">
      <h1 className="page-title">Forum</h1>
      {body}
    </div>
  );
};
