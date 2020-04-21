import React from 'react';
import Login from '../../components/login/Login';

import './Login.css';
import { Link } from 'react-router-dom';

interface Props {}

export const LoginPage: React.FC<Props> = () => {
  return (
    <div className="Login page">
      <h1 className="page-title">Login</h1>
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
  );
};
