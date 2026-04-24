import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should initialize with parsed localStorage value when it exists', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('should update state and localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should support functional updates like useState', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0));

    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(JSON.parse(localStorage.getItem('counter'))).toBe(1);
  });

  it('should handle object values', () => {
    const initialObj = { name: 'John', age: 30 };
    const { result } = renderHook(() => useLocalStorage('user', initialObj));

    const newObj = { name: 'Jane', age: 25 };
    act(() => {
      result.current[1](newObj);
    });

    expect(result.current[0]).toEqual(newObj);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(newObj);
  });

  it('should handle array values', () => {
    const initialArray = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage('numbers', initialArray));

    const newArray = [4, 5, 6];
    act(() => {
      result.current[1](newArray);
    });

    expect(result.current[0]).toEqual(newArray);
    expect(JSON.parse(localStorage.getItem('numbers'))).toEqual(newArray);
  });

  it('should handle null values', () => {
    const { result } = renderHook(() => useLocalStorage('nullable', 'initial'));

    act(() => {
      result.current[1](null);
    });

    expect(result.current[0]).toBeNull();
    expect(localStorage.getItem('nullable')).toBe(JSON.stringify(null));
  });

  it('should return initial value when localStorage has invalid JSON', () => {
    localStorage.setItem('invalid-json', 'not valid json {]');
    const { result } = renderHook(() => useLocalStorage('invalid-json', 'fallback'));

    expect(result.current[0]).toBe('fallback');
  });

  it('should persist updates across hook rerenders', () => {
    const { result, rerender } = renderHook(
      ({ key, initial }) => useLocalStorage(key, initial),
      { initialProps: { key: 'test-key', initial: 'value1' } }
    );

    act(() => {
      result.current[1]('value2');
    });

    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('value2'));

    rerender({ key: 'test-key', initial: 'value1' });
    expect(result.current[0]).toBe('value2');
  });

  it('should handle boolean values', () => {
    const { result } = renderHook(() => useLocalStorage('flag', false));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(JSON.parse(localStorage.getItem('flag'))).toBe(true);
  });

  it('should handle number values including 0', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1](5);
    });

    expect(result.current[0]).toBe(5);
  });

  it('should handle undefined as initial value', () => {
    const { result } = renderHook(() => useLocalStorage('undefined-key', undefined));

    expect(result.current[0]).toBeUndefined();
  });
});
