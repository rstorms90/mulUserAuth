import React, { createContext, useState } from 'react';
import { GlobalStyles, theme } from '../styles';
import { ThemeProvider } from 'styled-components';

export const AppContext = createContext();

// Dark & Light themes
const AppProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('darkTheme');

  const toggleTheme = () => {
    setThemeMode((prevState) => {
      if (prevState === 'lightTheme') {
        return 'darkTheme';
      } else {
        return 'lightTheme';
      }
    });
  };

  const value = { toggleTheme, themeMode };
  const customTheme = theme[themeMode];

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={customTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
