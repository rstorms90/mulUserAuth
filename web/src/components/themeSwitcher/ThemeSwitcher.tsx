import React, { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
import { Switch, FormControlLabel } from '@material-ui/core';

const ThemeSwitcher = () => {
  const { toggleTheme, themeMode } = useContext(AppContext);
  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <FormControlLabel
      label={themeMode === 'lightTheme' ? 'Dark Theme' : 'Light Theme'}
      control={
        <Switch
          checked={themeMode === 'lightTheme' ? true : false}
          className="ThemeSwitcher"
          color="primary"
          onChange={handleThemeChange}
        />
      }
    />
  );
};

export default ThemeSwitcher;
