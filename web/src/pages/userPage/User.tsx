import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props {
  id: string;
}

export const User = ({ match }: RouteComponentProps<Props>) => {
  return <h1>{match.params.id}</h1>;
};
