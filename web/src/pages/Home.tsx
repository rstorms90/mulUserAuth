import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <div className="page">
      <h1 className="page-title">Project Feather</h1>
      <h4 className="page-sub-title">Construct your story!</h4>
      <div>
        <h4>Don't have an account?</h4>
        <button className="commonBtn">
          <Link to="/register" className="white-link">
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
};
