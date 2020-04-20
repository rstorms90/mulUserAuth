import React from 'react';

interface Props {}

export const NoPass: React.FC<Props> = () => {
  return (
    <div className="page">
      <h1 className="page-title">Wrong Password</h1>
      <h3>Wrong Password. Try again?</h3>
    </div>
  );
};
