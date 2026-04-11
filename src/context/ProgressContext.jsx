import { createContext, useContext } from "react";
import { useProgress } from "../hooks/useProgress";

/**
 * Context for managing learning progress globally
 */
export const ProgressContext = createContext();

/**
 * Provider component for progress tracking
 */
export function ProgressProvider({ children }) {
  const progress = useProgress();

  return (
    <ProgressContext.Provider value={progress}>
      {children}
    </ProgressContext.Provider>
  );
}

/**
 * Hook to use progress context
 */
export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgressContext must be used within ProgressProvider");
  }
  return context;
}
