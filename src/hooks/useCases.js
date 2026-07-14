import { useState, useCallback } from 'react';
import { useApi, useMutation } from './useApi';
import { casesAPI } from '../services/api';

/**
 * Custom hook for managing cases
 * Provides fetching, filtering, and CRUD operations
 */
export function useCases() {
  const [filter, setFilter] = useState(null);

  // Fetch all cases or filtered cases
  const apiCall = useCallback(() => {
    if (filter === null) {
      return casesAPI.getAll();
    } else if (filter.type === 'broker') {
      return casesAPI.filterByBroker(filter.value);
    } else if (filter.type === 'priority') {
      return casesAPI.filterByPriority(filter.value);
    }
    return casesAPI.getAll();
  }, [filter]);

  const { data: cases, loading, error, setData } = useApi(apiCall, [filter]);

  // CRUD operations
  const createCase = useMutation(casesAPI.create);
  const updateCase = useMutation((id, data) => casesAPI.update(id, data));
  const deleteCase = useMutation(casesAPI.delete);

  // Filter by broker
  const filterByBroker = useCallback((broker) => {
    setFilter({ type: 'broker', value: broker });
  }, []);

  // Filter by priority
  const filterByPriority = useCallback((priority) => {
    setFilter({ type: 'priority', value: priority });
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilter(null);
  }, []);

  return {
    cases: cases || [],
    loading,
    error,
    createCase,
    updateCase,
    deleteCase,
    filterByBroker,
    filterByPriority,
    clearFilters,
    refreshCases: () => setData(null),
  };
}

export default useCases;
