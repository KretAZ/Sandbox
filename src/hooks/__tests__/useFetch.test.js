import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useFetch } from '../useFetch';

global.fetch = vi.fn();

describe('useFetch', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should initialize with loading state', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.data).toBeNull();
  });

  it('should handle HTTP error status', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/not-found'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('HTTP error! status: 404');
    expect(result.current.data).toBeNull();
  });

  it('should call fetch with correct URL', async () => {
    const url = 'https://api.example.com/users';

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ([]),
    });

    renderHook(() => useFetch(url));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(url);
    });
  });

  it('should refetch when URL changes', async () => {
    const url1 = 'https://api.example.com/data1';
    const url2 = 'https://api.example.com/data2';

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'first' }),
    });

    const { rerender } = renderHook(
      ({ url }) => useFetch(url),
      { initialProps: { url: url1 } }
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'second' }),
    });

    rerender({ url: url2 });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(url2);
    });
  });

  it('should clear error when fetch succeeds after error', async () => {
    fetch.mockRejectedValueOnce(new Error('First error'));

    const { result, rerender } = renderHook(
      ({ url }) => useFetch(url),
      { initialProps: { url: 'https://api.example.com/data' } }
    );

    await waitFor(() => {
      expect(result.current.error).toBe('First error');
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'success' }),
    });

    rerender({ url: 'https://api.example.com/retry' });

    await waitFor(() => {
      expect(result.current.error).toBeNull();
      expect(result.current.data).toEqual({ data: 'success' });
    });
  });

  it('should handle various HTTP error statuses', async () => {
    const statuses = [400, 401, 403, 404, 500, 502, 503];

    for (const status of statuses) {
      fetch.mockResolvedValueOnce({
        ok: false,
        status,
      });

      const { result } = renderHook(() => useFetch(`https://api.example.com/error${status}`));

      await waitFor(() => {
        expect(result.current.error).toBe(`HTTP error! status: ${status}`);
      });

      fetch.mockClear();
    }
  });

  it('should handle complex JSON responses', async () => {
    const complexData = {
      users: [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
      ],
      metadata: {
        total: 2,
        page: 1,
      },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => complexData,
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/users'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(complexData);
  });

  it('should handle empty array response', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/empty'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
  });

  it('should handle null response', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/null'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
  });

  it('should not update state after unmount', async () => {
    fetch.mockImplementation(() =>
      new Promise(resolve => {
        setTimeout(
          () =>
            resolve({
              ok: true,
              json: async () => ({ data: 'test' }),
            }),
          100
        );
      })
    );

    const { unmount } = renderHook(() => useFetch('https://api.example.com/data'));

    unmount();

    // No errors should occur when trying to update unmounted component
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    }, { timeout: 200 });
  });

  it('should set loading to false after fetch completes', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should set loading to false even on error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
