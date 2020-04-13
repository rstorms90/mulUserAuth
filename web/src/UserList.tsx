import React from 'react';
import { useUsersQuery, useRemoveUserMutation } from './generated/graphql';

interface Props {}

export const UserList: React.FC<Props> = () => {
  const { data, loading, error } = useUsersQuery({
    fetchPolicy: 'network-only',
    variables: {
      role: 'admin',
    },
  });

  const [removeUser] = useRemoveUserMutation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>You are not the admin — Unauthenticated.</div>;
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
                  console.log(`Removed User:${user.username} ID:${user.id}`);
                }
              }}
            >
              <p>
                ID: {user.id}, {user.username}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
