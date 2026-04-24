import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearch } from '../useSearch';

const mockConcepts = [
  {
    id: 'useState',
    title: 'useState Hook',
    description: 'Learn how to manage state in React components',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    tags: ['hooks', 'state', 'react'],
  },
  {
    id: 'useEffect',
    title: 'useEffect Hook',
    description: 'Handle side effects in your React components',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    tags: ['hooks', 'effects', 'react'],
  },
  {
    id: 'useContext',
    title: 'useContext Hook',
    description: 'Access context values without prop drilling',
    category: 'Advanced',
    difficulty: 'Intermediate',
    tags: ['hooks', 'context', 'react'],
  },
  {
    id: 'redux',
    title: 'Redux Patterns',
    description: 'Enterprise state management patterns',
    category: 'Advanced',
    difficulty: 'Advanced',
    tags: ['state', 'redux', 'patterns'],
  },
];

describe('useSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty results and no filters', () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    expect(result.current.query).toBe('');
    expect(result.current.results).toEqual([]);
    expect(result.current.filters.category).toBeNull();
    expect(result.current.filters.difficulty).toBeNull();
    expect(result.current.filters.tags).toEqual([]);
  });

  it('should initialize with initial query', () => {
    const { result } = renderHook(() => useSearch(mockConcepts, 'useState'));

    expect(result.current.query).toBe('useState');
  });

  it('should search by title', async () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.updateQuery('useState');
    });

    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 350));

    expect(result.current.results).toContainEqual(expect.objectContaining({ id: 'useState' }));
  });

  it('should search by description', async () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.updateQuery('side effects');
    });

    await new Promise(resolve => setTimeout(resolve, 350));

    expect(result.current.results).toContainEqual(expect.objectContaining({ id: 'useEffect' }));
  });

  it('should search by tags', async () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.updateQuery('redux');
    });

    await new Promise(resolve => setTimeout(resolve, 350));

    expect(result.current.results).toContainEqual(expect.objectContaining({ id: 'redux' }));
  });

  it('should be case-insensitive', async () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.updateQuery('USESTATE');
    });

    await new Promise(resolve => setTimeout(resolve, 350));

    expect(result.current.results).toContainEqual(expect.objectContaining({ id: 'useState' }));
  });

  it('should filter by category', async () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.setCategory('Fundamentals');
    });

    expect(result.current.filters.category).toBe('Fundamentals');
    expect(result.current.results.length).toBe(2);
    expect(result.current.results).toContainEqual(expect.objectContaining({ id: 'useState' }));
    expect(result.current.results).toContainEqual(expect.objectContaining({ id: 'useEffect' }));
  });

  it('should toggle category filter on/off', () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.setCategory('Fundamentals');
    });

    expect(result.current.filters.category).toBe('Fundamentals');

    act(() => {
      result.current.setCategory('Fundamentals');
    });

    expect(result.current.filters.category).toBeNull();
  });

  it('should filter by difficulty', async () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.setDifficulty('Beginner');
    });

    expect(result.current.filters.difficulty).toBe('Beginner');
    expect(result.current.results.length).toBe(2);
  });

  it('should toggle difficulty filter on/off', () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.setDifficulty('Advanced');
    });

    expect(result.current.filters.difficulty).toBe('Advanced');

    act(() => {
      result.current.setDifficulty('Advanced');
    });

    expect(result.current.filters.difficulty).toBeNull();
  });

  it('should filter by tags', () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.toggleTag('state');
    });

    expect(result.current.filters.tags).toContain('state');
    expect(result.current.results.length).toBe(3); // useState, useContext, redux
  });

  it('should add and remove tags from filter', () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.toggleTag('state');
    });

    expect(result.current.filters.tags).toContain('state');

    act(() => {
      result.current.toggleTag('state');
    });

    expect(result.current.filters.tags).not.toContain('state');
  });

  it('should combine multiple filters', async () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.setCategory('Fundamentals');
      result.current.toggleTag('hooks');
    });

    expect(result.current.results.length).toBe(2); // useState and useEffect
  });

  it('should reset all filters', async () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.updateQuery('use');
      result.current.setCategory('Fundamentals');
      result.current.setDifficulty('Beginner');
      result.current.toggleTag('hooks');
    });

    expect(result.current.query).not.toBe('');
    expect(result.current.filters.category).not.toBeNull();

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.query).toBe('');
    expect(result.current.filters.category).toBeNull();
    expect(result.current.filters.difficulty).toBeNull();
    expect(result.current.filters.tags).toEqual([]);
    expect(result.current.results).toEqual([]);
  });

  it('should sort results by title relevance', async () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.updateQuery('use');
    });

    await new Promise(resolve => setTimeout(resolve, 350));

    // Results that have "use" in title should come first
    expect(result.current.results[0].id).toBe('useContext');
  });

  it('should indicate active filters', () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    expect(result.current.hasActiveFilters).toBe(false);

    act(() => {
      result.current.setCategory('Fundamentals');
    });

    expect(result.current.hasActiveFilters).toBe(true);
  });

  it('should handle empty concepts array', () => {
    const { result } = renderHook(() => useSearch([]));

    expect(result.current.results).toEqual([]);
  });

  it('should handle no matches', async () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.updateQuery('nonexistent');
    });

    await new Promise(resolve => setTimeout(resolve, 350));

    expect(result.current.results).toEqual([]);
  });

  it('should debounce search query', async () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    // Rapid updates
    act(() => {
      result.current.updateQuery('u');
      result.current.updateQuery('us');
      result.current.updateQuery('use');
    });

    // Results should still be empty because debounce hasn't finished
    expect(result.current.results).toEqual([]);

    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 350));

    // Now results should be available
    expect(result.current.results.length).toBeGreaterThan(0);
  });

  it('should handle multiple tags', () => {
    const { result } = renderHook(() => useSearch(mockConcepts));

    act(() => {
      result.current.toggleTag('hooks');
      result.current.toggleTag('state');
    });

    expect(result.current.filters.tags.length).toBe(2);
    expect(result.current.results.length).toBe(3); // useState, useEffect, useContext
  });

  it('should return alphabetically sorted results when relevance is equal', async () => {
    const customConcepts = [
      {
        id: 'zebra',
        title: 'Zebra Hook',
        description: 'A zebra concept',
        category: 'Test',
        difficulty: 'Beginner',
        tags: ['test'],
      },
      {
        id: 'apple',
        title: 'Apple Hook',
        description: 'An apple concept',
        category: 'Test',
        difficulty: 'Beginner',
        tags: ['test'],
      },
    ];

    const { result } = renderHook(() => useSearch(customConcepts));

    act(() => {
      result.current.updateQuery('Hook');
    });

    await new Promise(resolve => setTimeout(resolve, 350));

    expect(result.current.results[0].id).toBe('apple');
    expect(result.current.results[1].id).toBe('zebra');
  });
});
