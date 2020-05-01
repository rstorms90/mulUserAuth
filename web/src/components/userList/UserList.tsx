import React, { useState } from 'react';
import { useUsersQuery, useRemoveUserMutation } from '../../generated/graphql';

import './UserList.css';

interface Props {
  myRole: string;
}

export const UserList: React.FC<Props> = ({ myRole }) => {
  const [skipUsers, setSkipUsers] = useState(0);
  const { data, loading, error, refetch } = useUsersQuery({
    fetchPolicy: 'network-only',
    variables: {
      role: myRole,
      skip: skipUsers,
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

  const handleClick = (role: string, skip: number, take: number) => {
    if (skip === 0) {
      setSkipUsers(skipUsers - take);
    } else {
      setSkipUsers(skipUsers + take);
    }
    refetch({ role, skip, take });
  };

  const pageNumber = skipUsers / 12 + 1;

  return (
    <div>
      <div className="page-sub-title">Site Users: Page {pageNumber}</div>
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
                <button disabled>User's Profile</button>
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
      <div className="userlist-btn-container">
        {skipUsers !== 0 ? (
          <button
            className="commonBtn"
            onClick={() => handleClick('admin', 0, 12)}
          >
            Prev
          </button>
        ) : (
          <div />
        )}
        {data.users.length === 12 ? (
          <button
            className="commonBtn"
            onClick={() => handleClick('admin', 12, 12)}
          >
            Next
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

UserList.defaultProps = {
  myRole: '',
};
