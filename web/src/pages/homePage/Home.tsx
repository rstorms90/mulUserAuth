import React from 'react';
import Footer from '../../components/Footer';

import './Home.css';

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <div className="page">
      <div className="Home">
        <h1 className="page-title">Quill & Bishop</h1>
        <h4 className="page-sub-title">
          Construct, organize, & create your story!
        </h4>
      </div>
      <Footer />
    </div>
  );
};
