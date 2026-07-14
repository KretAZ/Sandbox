import { useApi } from './useApi';
import { dashboardAPI } from '../services/api';

/**
 * Custom hook for fetching dashboard statistics
 */
export function useDashboardStats() {
  const { data: stats, loading, error, setData } = useApi(() => dashboardAPI.getStats(), []);

  return {
    stats: stats || {
      urgentCount: 0,
      newCount: 0,
      inProgressCount: 0,
      missingDocsCount: 0,
    },
    loading,
    error,
    refreshStats: () => setData(null),
  };
}

export default useDashboardStats;
