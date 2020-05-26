import React from "react";
import Footer from "../../components/footer/Footer";

import "./Home.css";

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <div>
      <div className="Home page">
        <h1 className="page-title">HomePage</h1>
      </div>
      <Footer />
    </div>
  );
};
