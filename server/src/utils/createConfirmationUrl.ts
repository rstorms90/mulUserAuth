export const createConfirmationUrl = (token: string) => {
  return `http://localhost:3000/user/confirm/${token}`;
};
