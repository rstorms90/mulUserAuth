import { Response } from 'express';

// Send back token to persist session
export const sendEmailConfirmationToken = (res: Response, token: string) => {
  res.cookie('emc', token, {
    httpOnly: true,
    path: '/user_confirmation',
  });
};
