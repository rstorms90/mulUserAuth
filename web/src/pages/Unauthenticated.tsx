import React from 'react';

interface Props {}

export const Unauthenticated: React.FC<Props> = () => {
  return (
    <div className="page">
      <h1 className="page-title">Unauthenticated</h1>
    </div>
  );
};
