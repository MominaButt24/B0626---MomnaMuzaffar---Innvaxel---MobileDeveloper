import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../constants/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // Listen for system theme changes and update the app theme
  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
