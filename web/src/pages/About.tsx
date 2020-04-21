import React from 'react';
import { Link } from 'react-router-dom';
import { useMeQuery } from '../generated/graphql';

import '../theme.css';

interface Props {}

export const About: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();

  let user = data?.me;

  return (
    <div className="page">
      <h1 className="page-title">About Project Feather</h1>
      <h4>
        My name is Russ and I created this site in hopes that writers would be
        able to create, organize, and store their creations in a way that is
        easy to navigate. I found that when I started to organize stories, I
        would be between taking notes in a certain app, switching back and forth
        between windows, losing track, etc. I have hopes that albeit this site
        is still in Alpha, eventually we will get writers together to make this
        community something cohesive, helpful, and sensical.
      </h4>
      {user ? (
        <button className="commonBtn">
          <Link to="/createstory" className="white-link">
            Get Started
          </Link>
        </button>
      ) : (
        <button className="commonBtn">
          <Link to="/login" className="white-link">
            Get Started
          </Link>
        </button>
      )}
    </div>
  );
};
