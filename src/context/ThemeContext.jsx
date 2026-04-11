import { createContext, useState } from "react";

/**
 * ThemeContext demonstrates:
 * - createContext API
 * - useContext hook
 * - Provider pattern
 * - Global state management
 */
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    isDark,
    toggleTheme: () => setIsDark(!isDark),
    colors: {
      bg: isDark ? "#1a1a1a" : "#ffffff",
      text: isDark ? "#ffffff" : "#000000",
      primary: isDark ? "#667eea" : "#667eea",
      secondary: isDark ? "#764ba2" : "#764ba2",
      border: isDark ? "#333333" : "#e0e0e0",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
