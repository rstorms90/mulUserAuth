import React, { useState } from 'react';
import { useLoginMutation, MeDocument, MeQuery } from '../../generated/graphql';
import { setAccessToken } from '../../accessToken';
import { FormGroup, TextField } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

interface Props {}

const Login: React.FC<Props> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  const history = useHistory();

  return (
    <div className="Login">
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
                  me: data.login?.user,
                },
              });
            },
          });

          if (response && response.data) {
            setAccessToken(response.data?.login?.accessToken as any);
            history.push('/');
          }
        }}
      >
        <div className="login-inputs-container">
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
