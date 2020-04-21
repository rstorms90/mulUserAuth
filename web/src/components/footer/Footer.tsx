import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className="Footer">
      <div className="no-account">
        <h4>Don't have an account?</h4>
        <button className="commonBtn">
          <Link to="/register" className="white-link">
            Sign Up
          </Link>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
