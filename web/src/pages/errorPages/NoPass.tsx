import React from 'react';
import Login from '../../components/Login';
import { Link } from 'react-router-dom';

interface Props {}

export const NoPass: React.FC<Props> = () => {
  return (
    <div className="error-page">
      <h1 className="page-title">Whoops! Wrong Password</h1>
      <h3 className="page-sub-title">Try to login again?</h3>
      <div className="error-page-content">
        <div className="not-found-img" />
        <div>
          <Login />
          <h4>Don't have an account?</h4>
          <Link to="/register" className="sign-up-link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
