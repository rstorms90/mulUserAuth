import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useUsersQuery, useRemoveUserMutation } from '../../generated/graphql';

import './UsersList.css';

interface Props {
  myRole: any;
}

export const UsersList: React.FC<Props> = ({ myRole }) => {
  const [username, setUsername] = useState('');
  const [skipUsers, setSkipUsers] = useState(0);
  const { data, loading, error, refetch } = useUsersQuery({
    fetchPolicy: 'network-only',
    variables: {
      skip: skipUsers,
      take: 12,
    },
  });

  const history = useHistory();

  const [removeUser] = useRemoveUserMutation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>You are not a user — Unauthenticated.</div>;
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
      <h1>Search for user</h1>
      <form
        className=""
        onSubmit={async (e) => {
          e.preventDefault();
          history.push(`/user/${username}`);
        }}
      >
        <TextField
          label="Search by username"
          variant="filled"
          value={username}
          color="primary"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button className="commonBtn" type="submit">
          Search
        </button>
      </form>
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

UsersList.defaultProps = {
  myRole: '',
};
