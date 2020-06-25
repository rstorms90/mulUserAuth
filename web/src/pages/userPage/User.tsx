import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { useGetUserQuery } from '../../generated/graphql';

interface Props {
  id: string;
}

export const User = ({ match }: RouteComponentProps<Props>) => {
  const { data, loading, error } = useGetUserQuery({
    variables: {
      id: parseInt(match.params.id),
    },
  });

  let userData: any = null;

  if (loading) {
    userData = <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    userData = <div>User not found</div>;
  }

  if (!data) {
    userData = <div>User not found</div>;
  }

  if (data) {
    const searchedUser = data.getUser[0];

    userData = (
      <div>
        <h1>{searchedUser.username}</h1>
        <h3>{searchedUser.role}</h3>
        <div>{searchedUser.id}</div>
      </div>
    );
  }

  const id = parseInt(match.params.id);

  if (id !== 0 && !id) {
    return <Redirect to={{ pathname: '/404' }} />;
  }

  return <div>{userData}</div>;
};
