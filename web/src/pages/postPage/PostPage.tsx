import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useGetPostQuery } from '../../generated/graphql';

import '../../theme.css';

interface Props {
  id: string;
}

export const PostPage = ({ match }: RouteComponentProps<Props>) => {
  const postId = parseInt(match.params.id);

  const { data, loading, error } = useGetPostQuery({
    variables: {
      id: postId,
    },
  });

  let postData: any = null;

  if (loading) {
    postData = <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    postData = <div>User not found</div>;
  }

  if (data) {
    const { title, description } = data.getPost[0];
    postData = (
      <div>
        <h2>{title}</h2>
        <h5>{description}</h5>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">PostPage</h1>
      {postData}
    </div>
  );
};
