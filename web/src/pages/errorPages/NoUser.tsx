import React from 'react';

interface Props {}

export const NoUser: React.FC<Props> = () => {
  return (
    <div className="page">
      <h1 className="page-title">Could not find user.</h1>
      <h3>Could not find user. Try again?</h3>
    </div>
  );
};
