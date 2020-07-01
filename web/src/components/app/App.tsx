import React, { useState, useEffect } from 'react';
import { Routes } from '../../Routes';
import { setAccessToken } from '../../accessToken';

import AppProvider from '../../context/AppProvider';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';

import './App.css';

interface Props {}

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);

  // Retrieve refresh token
  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json();

      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AppProvider>
      <ThemeSwitcher />
      <Routes />
    </AppProvider>
  );
};
