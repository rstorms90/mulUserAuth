import React from 'react';
import Login from '../../components/Login';

import './Login.css';

interface Props {}

export const LoginPage: React.FC<Props> = () => {
  return (
    <div className="Login">
      <h1>Login</h1>
      <Login />
    </div>
  );
};
