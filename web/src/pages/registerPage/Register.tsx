import React, { useState } from 'react';
import {
  useRegisterMutation,
  useLoginMutation,
  MeQuery,
  MeDocument,
} from '../../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { FormGroup, TextField } from '@material-ui/core';

import './Register.css';
import { setAccessToken } from '../../accessToken';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  return (
    <div className="Register page">
      <h1 className="page-title">Sign Up</h1>
      <form
        className="register-form"
        onSubmit={async (e) => {
          e.preventDefault();

          let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (re.test(email)) {
            const response = await register({
              variables: {
                username,
                email,
                password,
              },
            });

            const loginResponse = await login({
              variables: {
                username,
                password,
              },
              update: (store, { data }) => {
                if (!data) {
                  return null;
                }
                store.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    me: data.login.user,
                  },
                });
              },
            });

            if (loginResponse && loginResponse.data) {
              setAccessToken(loginResponse.data.login.accessToken);
              history.push('/');
            }
          } else {
            alert('Choose a valid e-mail.');
          }
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
