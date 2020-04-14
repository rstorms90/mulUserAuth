import React, { useState } from 'react';
import { useRegisterMutation } from '../../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

import './Register.css';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  return (
    <div className="Register">
      <h1>Sign Up</h1>
      <form
        className="register-form"
        onSubmit={async (e) => {
          e.preventDefault();
          console.log('Registered User');
          const response = await register({
            variables: {
              username,
              email,
              password,
            },
          });

          if (response.data?.register === false) {
            alert('E-mail or username being used. Choose another.');
          }
          history.push('/login');
        }}
      >
        <div className="register-inputs-container">
          <input
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="commonBtn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
