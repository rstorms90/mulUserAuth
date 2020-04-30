import React, { useState } from 'react';
import { useUsersQuery, useRemoveUserMutation } from '../../generated/graphql';

import './UserList.css';

interface Props {
  myRole: string;
}

export const UserList: React.FC<Props> = ({ myRole }) => {
  const { data, loading, error } = useUsersQuery({
    fetchPolicy: 'network-only',
    variables: {
      role: myRole,
      skip: 0,
      take: 12,
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
      <div className="page-sub-title">Site Users:</div>

      <ul className="site-users-list">
        {data.users.map((user) => {
          return (
            <li key={user.id}>
              <div className="user-info">
                <p>
                  ID: <span className="user-id">{user.id}</span>
                </p>
                <p>
                  <span className="user-username">{user.username}</span>
                </p>
                <p>
                  <span className="user-role">{user.role}</span>
                </p>
              </div>

              <div className="admin-btns-container">
                <button
                  className="secondaryBtn"
                  onClick={async (e) => {
                    e.preventDefault();
                    const response = await removeUser({
                      variables: {
                        id: user.id,
                      },
                    });

                    if (response) {
                      alert(`Removed User:${user.username} ID:${user.id}`);
                    }
                  }}
                >
                  Delete User
                </button>
              </div>
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
