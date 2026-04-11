import { createContext, useState, useEffect } from "react";

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

  // Update HTML class when theme changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isDark]);

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
