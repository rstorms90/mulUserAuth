import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useLoginMutation, MeDocument, MeQuery } from '../../generated/graphql';
import { setAccessToken } from '../../accessToken';

import './Login.css';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  return (
    <div className="Login">
      <h1>Login</h1>
      <form
        className="login-form"
        onSubmit={async (e) => {
          e.preventDefault();

          const response = await login({
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

          if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
          }

          history.push('/');
        }}
      >
        <div className="login-inputs-container">
          <input
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
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
          Login
        </button>
      </form>
    </div>
  );
};
