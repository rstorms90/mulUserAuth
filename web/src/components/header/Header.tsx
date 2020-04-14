import React from 'react';
import { Link } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from '../../generated/graphql';
import { setAccessToken } from '../../accessToken';

import './Header.css';
import '../../theme.css';

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;
  let user = data?.me;

  if (loading) {
    body = null;
  } else if (data && user) {
    body = (
      <div className="loggedInInfo">
        Logged in as:
        <span className="loggedInUsername"> {user.username}</span>
      </div>
    );
  } else {
    body = null;
  }

  return (
    <header className="header">
      <div className="logout-btn-container">
        {!loading && data && data.me && (
          <button
            className="commonBtn"
            onClick={async () => {
              await logout();
              setAccessToken('');
              await client!.resetStore();
            }}
          >
            Logout
          </button>
        )}
      </div>
      {body}
      <div className="nav-link-container">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div className="nav-link">
          <Link to="/protectedroute">Forum</Link>
        </div>
        {user && user.role === 'admin' && (
          <div className="nav-link">
            <Link to="/admin">Admin</Link>
          </div>
        )}

        {user ? null : (
          <div className="register-login-container">
            <div className="nav-link">
              <Link to="/login">Login</Link>
            </div>
            <div className="nav-link">
              <Link to="/register">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
