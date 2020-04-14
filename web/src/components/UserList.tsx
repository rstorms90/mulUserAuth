import React from 'react';
import { useUsersQuery, useRemoveUserMutation } from '../generated/graphql';

interface Props {
  myRole: string;
}

export const UserList: React.FC<Props> = ({ myRole }) => {
  const { data, loading, error } = useUsersQuery({
    fetchPolicy: 'network-only',
    variables: {
      role: myRole,
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

UserList.defaultProps = {
  myRole: '',
};
