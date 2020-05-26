import React from "react";
import { Link } from "react-router-dom";

import "../../theme.css";

interface Props {}

export const About: React.FC<Props> = () => {
  return (
    <div className="page">
      <h1 className="page-title">About</h1>

      <div className="right-content">
        <button className="commonBtn">
          <Link to="/login" className="white-link">
            Get Started
          </Link>
        </button>
      </div>
    </div>
  );
};
