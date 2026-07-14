import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from the API
 * Handles loading, error, and data states
 */
export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error, setData };
}

/**
 * Custom hook for managing async mutations (POST, PUT, DELETE)
 * Handles loading, error, and success states
 */
export function useMutation(apiCall) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...args);
      return result;
    } catch (err) {
      setError(err.message || 'Operation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

export default useApi;
