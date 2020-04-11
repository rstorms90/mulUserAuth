import React from 'react';
import { useUsersQuery, useRemoveUserMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

export const Admin: React.FC<RouteComponentProps> = ({ history }) => {
  const { data } = useUsersQuery({ fetchPolicy: 'network-only' });
  const [removeUser] = useRemoveUserMutation();

  if (!data) {
    return <div>Loading...</div>;
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
                  console.log(`Removed User ID:${user.id}`);
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
