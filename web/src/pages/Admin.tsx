import React from 'react';
import { useUsersQuery, useRemoveUserMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

export const Admin: React.FC<RouteComponentProps> = ({ history }) => {
  const { data, loading, error } = useUsersQuery({
    fetchPolicy: 'network-only',
  });
  const [removeUser] = useRemoveUserMutation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>You are not the admin — unauthenticated.</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <div>Users:</div>

      <ul>
        {data.users.map((user) => {
          return (
            <li
              key={user.id}
              onClick={async (e) => {
                e.preventDefault();
                const response = await removeUser({
                  variables: {
                    id: user.id,
                  },
                });

                if (response) {
                  history.push('/');
                  console.log(`Removed User:${user.email} ID:${user.id}`);
                }
              }}
            >
              {user.email}, {user.id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
