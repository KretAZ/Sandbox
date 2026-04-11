import { createContext, useContext, useMemo } from "react";
import { useSearch } from "../hooks/useSearch";
import { conceptsMap } from "../data/conceptsMap";

/**
 * Context for managing global search
 */
export const SearchContext = createContext();

/**
 * Provider component for search functionality
 */
export function SearchProvider({ children }) {
  const search = useSearch(conceptsMap);

  return (
    <SearchContext.Provider value={search}>
      {children}
    </SearchContext.Provider>
  );
}

/**
 * Hook to use search context
 */
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within SearchProvider");
  }
  return context;
}
