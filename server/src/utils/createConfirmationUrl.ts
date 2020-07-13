import { createEmailToken } from '../auth';
import { v4 } from 'uuid';

export const createConfirmationUrl = (email: string) => {
  const token = v4();
  createEmailToken(token, email);

  return `http://localhost:3000/user/confirm/${token}`;
};
