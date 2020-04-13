import React from 'react';
import { Link } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from './generated/graphql';
import { setAccessToken } from './accessToken';

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>Logged in as: {data.me.username} </div>;
  } else {
    body = <div>Not logged in.</div>;
  }

  return (
    <header>
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/protectedroute">Protected Route</Link>
        </div>
        <div>
          <Link to="/admin">Admin</Link>
        </div>
        {!loading && data && data.me && (
          <button
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
    </header>
  );
};
