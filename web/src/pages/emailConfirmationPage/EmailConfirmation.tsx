import React, { useEffect, useState } from 'react';
import { useConfirmUserMutation } from '../../generated/graphql';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

interface Props {
  emailConfirmationToken: string;
}

export const EmailConfirmation = ({ match }: RouteComponentProps<Props>) => {
  const [confirmUser] = useConfirmUserMutation();
  const [loading, setLoading] = useState(true);
  const paramsUniqueKey = match.params.emailConfirmationToken;
  let history = useHistory();

  useEffect(() => {
    confirmNewUser();
  }, []);

  async function confirmNewUser() {
    fetch('http://localhost:4000/user_confirmation', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { emailConfirmationToken } = await x.json();

      if (!emailConfirmationToken) {
        alert('No token provided.');
        history.push('/');
      } else {
        const decodedToken: any = jwtDecode(emailConfirmationToken);
        setLoading(false);

        if (decodedToken.token === paramsUniqueKey) {
          const response = await confirmUser();

          console.log(response.data?.confirmUser);
          localStorage.removeItem('emc');
          history.push('/');
        }
      }
    });

    if (loading) {
      return <div>Loading...</div>;
    }
  }

  return (
    <div className="EmailConfirmation page">
      <h1>Email Confirmation Page</h1>
    </div>
  );
};
