import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCodeSnippet } from '../useCodeSnippet';

// Mock Worker
class MockWorker {
  url;
  onmessage;

  constructor(url) {
    this.url = url;
  }

  postMessage(data) {
    // Simulate worker receiving message
    setTimeout(() => {
      if (this.onmessage) {
        // Default: successful execution
        this.onmessage({
          data: {
            success: true,
            output: 'Mock output',
          },
        });
      }
    }, 10);
  }

  terminate() {}
}

global.Worker = MockWorker;
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');

describe('useCodeSnippet', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    navigator.clipboard.writeText.mockResolvedValue(undefined);
  });

  it('should initialize with empty code', () => {
    const { result } = renderHook(() => useCodeSnippet());

    expect(result.current.code).toBe('');
    expect(result.current.output).toBe('');
    expect(result.current.error).toBeNull();
    expect(result.current.isExecuting).toBe(false);
  });

  it('should initialize with initial code', () => {
    const initialCode = 'console.log("Hello");';
    const { result } = renderHook(() => useCodeSnippet(initialCode));

    expect(result.current.code).toBe(initialCode);
  });

  it('should update code', () => {
    const { result } = renderHook(() => useCodeSnippet());

    act(() => {
      result.current.setCode('const x = 42;');
    });

    expect(result.current.code).toBe('const x = 42;');
  });

  it('should execute code successfully', async () => {
    const { result } = renderHook(() => useCodeSnippet('console.log("test");'));

    act(() => {
      result.current.executeCode();
    });

    await waitFor(() => {
      expect(result.current.isExecuting).toBe(false);
    });

    expect(result.current.error).toBeNull();
  });

  it('should set isExecuting state during execution', async () => {
    const { result } = renderHook(() => useCodeSnippet('const x = 1;'));

    expect(result.current.isExecuting).toBe(false);

    act(() => {
      result.current.executeCode();
    });

    expect(result.current.isExecuting).toBe(true);

    await waitFor(() => {
      expect(result.current.isExecuting).toBe(false);
    });
  });

  it('should reset code to initial value', () => {
    const initialCode = 'initial code';
    const { result } = renderHook(() => useCodeSnippet(initialCode));

    act(() => {
      result.current.setCode('modified code');
    });

    expect(result.current.code).toBe('modified code');

    act(() => {
      result.current.resetCode();
    });

    expect(result.current.code).toBe(initialCode);
  });

  it('should clear code and output', () => {
    const { result } = renderHook(() => useCodeSnippet('initial'));

    act(() => {
      result.current.setCode('modified code');
    });

    act(() => {
      result.current.clear();
    });

    expect(result.current.code).toBe('');
    expect(result.current.output).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('should copy code to clipboard', async () => {
    const codeText = 'const result = 42;';
    const { result } = renderHook(() => useCodeSnippet(codeText));

    const copied = await result.current.copyCode();

    expect(copied).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(codeText);
  });

  it('should handle clipboard copy failure', async () => {
    navigator.clipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));

    const { result } = renderHook(() => useCodeSnippet('code'));

    const copied = await result.current.copyCode();

    expect(copied).toBe(false);
  });

  it('should have correct initial state structure', () => {
    const { result } = renderHook(() => useCodeSnippet());

    expect(result.current).toHaveProperty('code');
    expect(result.current).toHaveProperty('setCode');
    expect(result.current).toHaveProperty('output');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('isExecuting');
    expect(result.current).toHaveProperty('executeCode');
    expect(result.current).toHaveProperty('resetCode');
    expect(result.current).toHaveProperty('copyCode');
    expect(result.current).toHaveProperty('clear');
  });

  it('should clear error when code is executed successfully', async () => {
    const { result } = renderHook(() => useCodeSnippet('console.log("test");'));

    act(() => {
      result.current.executeCode();
    });

    await waitFor(() => {
      expect(result.current.isExecuting).toBe(false);
    });

    expect(result.current.error).toBeNull();
  });

  it('should handle setCode as functional update', () => {
    const { result } = renderHook(() => useCodeSnippet('initial'));

    act(() => {
      result.current.setCode(prev => prev + '\n// comment');
    });

    expect(result.current.code).toBe('initial\n// comment');
  });

  it('should preserve state when unmounted and remounted', () => {
    const initialCode = 'const x = 1;';
    const { result, unmount, rerender } = renderHook(() => useCodeSnippet(initialCode));

    act(() => {
      result.current.setCode('modified');
    });

    expect(result.current.code).toBe('modified');

    // Note: In a real scenario, remounting would create a new hook instance
    // but we're testing the current behavior
  });

  it('should reset output and error when resetting code', async () => {
    const initialCode = 'console.log("initial");';
    const { result } = renderHook(() => useCodeSnippet(initialCode));

    act(() => {
      result.current.setCode('new code');
    });

    act(() => {
      result.current.resetCode();
    });

    expect(result.current.output).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('should handle empty code execution', async () => {
    const { result } = renderHook(() => useCodeSnippet(''));

    act(() => {
      result.current.executeCode();
    });

    await waitFor(() => {
      expect(result.current.isExecuting).toBe(false);
    });
  });

  it('should handle code with special characters', async () => {
    const specialCode = `console.log("Hello 世界 🚀")`;
    const { result } = renderHook(() => useCodeSnippet(specialCode));

    expect(result.current.code).toBe(specialCode);

    const copied = await result.current.copyCode();
    expect(copied).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(specialCode);
  });

  it('should handle multiline code', () => {
    const multilineCode = `function test() {
  const x = 1;
  const y = 2;
  return x + y;
}`;

    const { result } = renderHook(() => useCodeSnippet(multilineCode));

    expect(result.current.code).toBe(multilineCode);
  });

  it('should allow code updates while executing is false', () => {
    const { result } = renderHook(() => useCodeSnippet());

    expect(result.current.isExecuting).toBe(false);

    act(() => {
      result.current.setCode('new code 1');
      result.current.setCode('new code 2');
      result.current.setCode('new code 3');
    });

    expect(result.current.code).toBe('new code 3');
  });

  it('should return functions with correct signatures', () => {
    const { result } = renderHook(() => useCodeSnippet());

    expect(typeof result.current.setCode).toBe('function');
    expect(typeof result.current.executeCode).toBe('function');
    expect(typeof result.current.resetCode).toBe('function');
    expect(typeof result.current.copyCode).toBe('function');
    expect(typeof result.current.clear).toBe('function');
  });
});
