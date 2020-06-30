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
    userData = (
      <div>
        <h3>
          Welcome <span className="current-user">{data.me.username}</span>
        </h3>
        <h4>Designed to mitigate police brutality.</h4>
      </div>
    );
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
