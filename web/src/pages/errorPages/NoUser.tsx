import React from 'react';
import Login from '../../components/Login';
import { Link } from 'react-router-dom';

interface Props {}

export const NoUser: React.FC<Props> = () => {
  return (
    <div className="error-page">
      <h1 className="page-title">Whoops! Could not find user.</h1>
      <h3 className="page-sub-title">Try to login again?</h3>
      <div className="error-page-content">
        <div className="not-found-img" />
        <div>
          <Login />
          <div className="no-account">
            <h4>Don't have an account?</h4>
            <button className="commonBtn">
              <Link to="/register" className="white-link">
                Sign Up
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
