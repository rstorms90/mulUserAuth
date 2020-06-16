import React from 'react';
import Footer from '../../components/footer/Footer';
import { useMeQuery } from '../../generated/graphql';

import './Home.css';

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();

  let userData: any = null;

  if (loading) {
    userData = <div>Loading...</div>;
  }

  if (!data) {
    userData = null;
  }

  if (data && !data.me?.role) {
    userData = null;
  }

  if (data && data.me?.role) {
    userData = <div>Welcome {data.me.username} to this cool project!</div>;
  }

  return (
    <div>
      <div className="Home page">
        <h1 className="page-title">HomePage</h1>
        {userData}
      </div>
      <Footer />
    </div>
  );
};
