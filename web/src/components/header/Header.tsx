import React from 'react';
import { Link } from 'react-router-dom';
import { useMeQuery } from '../../generated/graphql';

import Drawer from '../drawer/Drawer';

import './Header.css';
import '../../theme.css';

interface Props {}

const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();

  let body: any = null;
  let user = data?.me;

  // Check current user
  if (loading) {
    body = null;
  } else {
    body = null;
  }

  return (
    <header className="Header">
      <Drawer currentUser={user} />

      <div className="nav-link-container">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/about">About</Link>
        </div>
        {user && (
          <>
            <div className="nav-link">
              <Link to="/users">Users</Link>
            </div>
          </>
        )}

        {!user && (
          <div className="register-login-container">
            <button className="nav-link commonBtn">
              <Link to="/login">Login</Link>
            </button>
            <button className="nav-link commonBtn">
              <Link to="/register">Sign Up</Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
