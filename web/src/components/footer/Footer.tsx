import React from 'react';
import { Link } from 'react-router-dom';
import { useMeQuery } from '../../generated/graphql';

const Footer: React.FC = () => {
  const { data, loading } = useMeQuery();

  let userData: any = null;

  if (loading) {
    userData = <div>Loading...</div>;
  }

  if (!data) {
    userData = null;
  }

  if (data && !data.me?.role) {
    userData = (
      <div className="no-account">
        <h4>Don't have an account?</h4>
        <button className="commonBtn">
          <Link to="/register" className="white-link">
            Sign Up
          </Link>
        </button>
      </div>
    );
  }

  return <footer className="Footer">{userData}</footer>;
};

export default Footer;
