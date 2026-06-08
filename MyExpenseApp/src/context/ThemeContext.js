/**
 * ThemeContext.js
 * 
 * This file manages the "look and feel" of the app. It handles switching 
 * between Light and Dark mode. 
 * 
 * I set it up so it can either follow the phone's system settings 
 * or let the user manually toggle it from the home screen.
 */

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../constants/theme';

// Create the context for the theme
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Grab the phone's current theme (light or dark)
  const systemColorScheme = useColorScheme();
  
  // We initialize the state based on what the phone is currently using
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // This effect listens for when the user changes their phone's system theme 
  // (like if they have a schedule) and updates our app to match.
  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  // A simple function to flip the switch manually
  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // useMemo is great here—it only swaps the theme objects when isDarkMode changes.
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to grab the theme easily in any component.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider. Check your App.js wrapper!');
  }
  return context;
};
