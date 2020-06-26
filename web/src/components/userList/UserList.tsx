import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsersQuery, useRemoveUserMutation } from '../../generated/graphql';

import './UserList.css';

interface Props {
  myRole: any;
}

export const UserList: React.FC<Props> = ({ myRole }) => {
  const [skipUsers, setSkipUsers] = useState(0);
  const { data, loading, error, refetch } = useUsersQuery({
    fetchPolicy: 'network-only',
    variables: {
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
    return <div>You are a user — Unauthenticated.</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  // Pagination click
  const handleClick = (skip: number, take: number) => {
    if (skip === 0) {
      setSkipUsers(skipUsers - take);
    } else {
      setSkipUsers(skipUsers + take);
    }
    refetch({ skip, take });
  };

  const userButtons = (
    <div className="userlist-btn-container">
      {skipUsers !== 0 ? (
        <button className="commonBtn" onClick={() => handleClick(0, 12)}>
          Prev
        </button>
      ) : (
        <div />
      )}
      {data.users.length === 12 ? (
        <button className="commonBtn" onClick={() => handleClick(12, 12)}>
          Next
        </button>
      ) : (
        <div />
      )}
    </div>
  );

  const pageNumber = skipUsers / 12 + 1;

  return (
    <div>
      <div className="page-sub-title">Site Users: Page {pageNumber}</div>
      {userButtons}
      <div className="site-users-list-container">
        <ul className="site-users-list">
          {data.users.map((user) => {
            return (
              <li key={user.id}>
                <div className="user-info">
                  <span>
                    ID: <span className="user-id">{user.id}</span>
                  </span>
                  <div>
                    <Link
                      to={{ pathname: `/user/${user.username}` }}
                      className="user-username"
                    >
                      {user.username}
                    </Link>
                  </div>
                  <span className="user-role">{user.role}</span>
                </div>

                {myRole === 'admin' && (
                  <div className="admin-btns-container">
                    <button
                      className="secondaryBtn"
                      onClick={async (e) => {
                        e.preventDefault();
                        const response = await removeUser({
                          variables: {
                            role: myRole,
                            id: user.id,
                          },
                        });

                        if (response) {
                          alert(`Removed User:${user.username} ID:${user.id}`);
                        } else {
                          alert(`Unauthenticated — Not admin.`);
                        }
                      }}
                    >
                      Delete User
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {userButtons}
    </div>
  );
};

UserList.defaultProps = {
  myRole: '',
};
