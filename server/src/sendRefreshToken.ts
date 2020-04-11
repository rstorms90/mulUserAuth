import { Response } from 'express';

// Send back token to persist session
export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};
