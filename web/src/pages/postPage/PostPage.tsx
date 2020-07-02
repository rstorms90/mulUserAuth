import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useGetPostQuery, useMeQuery } from '../../generated/graphql';

import '../../theme.css';

interface Props {
  id: string;
  user: any;
}

export const PostPage = ({ match }: RouteComponentProps<Props>) => {
  let history = useHistory();
  const postId = parseInt(match.params.id);
  const user = match.params.user;

  const meQuery = useMeQuery();
  const myUsername = meQuery.data?.me?.username;

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
    const { title, description, createdAt } = data.getPost[0];
    const extractDate = new Date(parseInt(createdAt));
    const date = extractDate.toDateString();
    const currentUser = myUsername === user;

    postData = (
      <div>
        <h2>{title}</h2>
        <h5>{description}</h5>
        <h5>Author: {currentUser ? 'Me' : user}</h5>
        <h6>{date}</h6>
      </div>
    );
  }

  return (
    <div className="page">
      <button onClick={() => history.goBack()}>Back</button>
      {postData}
    </div>
  );
};
