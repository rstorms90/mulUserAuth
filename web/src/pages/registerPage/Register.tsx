import React, { useState } from 'react';
import { useRegisterMutation } from '../../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { FormGroup, TextField } from '@material-ui/core';

import './Register.css';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  return (
    <div className="Register page">
      <h1 className="page-title">Sign Up</h1>
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
          <FormGroup>
            <TextField
              label="Username"
              variant="filled"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <TextField
              label="Email"
              type="email"
              variant="filled"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="filled"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </FormGroup>
        </div>
        <button className="commonBtn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
