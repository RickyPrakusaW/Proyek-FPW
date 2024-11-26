import React, { createContext, useContext, useState } from "react";

// Buat context
export const ThemeContext = createContext();

// ThemeProvider untuk membungkus aplikasi
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook untuk menggunakan tema
export const useTheme = () => useContext(ThemeContext);
