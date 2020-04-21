import React from 'react';
import { Link } from 'react-router-dom';
import { useCreateStoryQuery } from '../../generated/graphql';

interface Props {}

export const CreateStory: React.FC<Props> = () => {
  const { data, loading, error } = useCreateStoryQuery({
    fetchPolicy: 'network-only',
  });

  let body: any = null;

  if (loading) {
    body = null;
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
          to create your story.
        </h3>
      </div>
    );
  }

  if (data) {
    body = <div className="page-sub-title">Choose a genre...</div>;
  }

  return (
    <div className="page">
      <h1 className="page-title">Create Your Story</h1>
      {body}
    </div>
  );
};
