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
      primary: "#667eea",
      secondary: "#764ba2",
      border: isDark ? "#333333" : "#e0e0e0",
    },
    glass: {
      dark: {
        background: "rgba(255,255,255,0.1)",
        border: "rgba(255,255,255,0.2)",
        shadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      light: {
        background: "rgba(255,255,255,0.8)",
        border: "rgba(255,255,255,0.5)",
        shadow: "0 8px 32px 0 rgba(200, 200, 200, 0.3)",
      },
    },
    blur: {
      glass: "12px",
      heavy: "20px",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
