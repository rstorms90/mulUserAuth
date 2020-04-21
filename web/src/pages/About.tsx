import React from 'react';

interface Props {}

export const About: React.FC<Props> = () => {
  return (
    <div className="page">
      <h1 className="page-title">About Project Feather</h1>
      <h3 className="page-sub-title">What in tarnation?</h3>
      <h4>
        My name is Russ and I created this site in hopes that writers would be
        able to create, organize, and store their creations in a way that is
        easy to navigate. I found that when I started to organize stories, I
        would be between taking notes in a certain app, switching back and forth
        between windows, losing track, etc. I have hopes that albeit this site
        is still in Alpha, eventually we will get writers together to make this
        community something cohesive and sensical.
      </h4>
    </div>
  );
};
