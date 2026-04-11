import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "./useDebounce";

/**
 * Hook to search across concepts
 * Supports search by title, description, tags
 */
export function useSearch(concepts, initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState({
    category: null,
    difficulty: null,
    tags: [],
  });

  // Debounce the query for performance
  const debouncedQuery = useDebounce(query, 300);

  // Perform the actual search
  const results = useMemo(() => {
    if (!debouncedQuery.trim() && !filters.category && !filters.difficulty && filters.tags.length === 0) {
      return [];
    }

    let filtered = concepts.filter((concept) => {
      // Text search
      const matchesQuery =
        debouncedQuery.trim() === "" ||
        concept.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        concept.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        concept.tags.some((tag) =>
          tag.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

      // Category filter
      const matchesCategory =
        !filters.category || concept.category === filters.category;

      // Difficulty filter
      const matchesDifficulty =
        !filters.difficulty || concept.difficulty === filters.difficulty;

      // Tags filter
      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.some((tag) => concept.tags.includes(tag));

      return matchesQuery && matchesCategory && matchesDifficulty && matchesTags;
    });

    // Sort by relevance (title matches higher than description)
    return filtered.sort((a, b) => {
      const aInTitle = a.title.toLowerCase().includes(debouncedQuery.toLowerCase());
      const bInTitle = b.title.toLowerCase().includes(debouncedQuery.toLowerCase());

      if (aInTitle && !bInTitle) return -1;
      if (!aInTitle && bInTitle) return 1;
      return a.title.localeCompare(b.title);
    });
  }, [debouncedQuery, filters, concepts]);

  /**
   * Update search query
   */
  const updateQuery = (newQuery) => {
    setQuery(newQuery);
  };

  /**
   * Update category filter
   */
  const setCategory = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === category ? null : category,
    }));
  };

  /**
   * Update difficulty filter
   */
  const setDifficulty = (difficulty) => {
    setFilters((prev) => ({
      ...prev,
      difficulty: prev.difficulty === difficulty ? null : difficulty,
    }));
  };

  /**
   * Toggle tag filter
   */
  const toggleTag = (tag) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  /**
   * Reset all filters
   */
  const resetFilters = () => {
    setQuery("");
    setFilters({
      category: null,
      difficulty: null,
      tags: [],
    });
  };

  return {
    query,
    updateQuery,
    results,
    filters,
    setCategory,
    setDifficulty,
    toggleTag,
    resetFilters,
    hasActiveFilters:
      filters.category || filters.difficulty || filters.tags.length > 0,
  };
}
