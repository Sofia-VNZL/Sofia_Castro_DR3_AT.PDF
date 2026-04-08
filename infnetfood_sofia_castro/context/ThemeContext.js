import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = {
    background: isDarkMode ? '#1A1A1A' : '#FDF6E3',
    text: isDarkMode ? '#FDF6E3' : '#2C1A0E',
    card: isDarkMode ? '#2D2D2D' : '#FFFFFF',
    wine: '#8B1A1A',
    mustard: '#C8922A',
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);