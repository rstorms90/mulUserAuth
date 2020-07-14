import { User } from './entity/User';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );
};

export const createEmailToken = (token: string, email: string) => {
  return sign({ token: token, email: email }, process.env.EMAIL_TOKEN_SECRET!, {
    expiresIn: '1d',
  });
};
