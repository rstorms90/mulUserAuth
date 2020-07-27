import React, { useState, useEffect } from 'react';
import { Routes } from '../../Routes';
import { setAccessToken } from '../../accessToken';

import AppProvider from '../../context/AppProvider';

import './App.css';

export const App: React.FC = () => {
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
      <Routes />
    </AppProvider>
  );
};
