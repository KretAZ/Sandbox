import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormInput } from '../useFormInput';

describe('useFormInput', () => {
  it('should initialize with default empty string', () => {
    const { result } = renderHook(() => useFormInput());

    const [value] = result.current;
    expect(value).toBe('');
  });

  it('should initialize with custom initial value', () => {
    const { result } = renderHook(() => useFormInput('initial value'));

    const [value] = result.current;
    expect(value).toBe('initial value');
  });

  it('should return bind object with value and onChange', () => {
    const { result } = renderHook(() => useFormInput());

    const [, bind] = result.current;
    expect(bind).toHaveProperty('value');
    expect(bind).toHaveProperty('onChange');
    expect(typeof bind.onChange).toBe('function');
  });

  it('should handle onChange events', () => {
    const { result } = renderHook(() => useFormInput('initial'));

    const [, bind] = result.current;

    act(() => {
      const event = {
        target: { value: 'new value' },
      };
      bind.onChange(event);
    });

    expect(result.current[0]).toBe('new value');
  });

  it('should update bind.value after change', () => {
    const { result } = renderHook(() => useFormInput());

    const [initialValue, initialBind] = result.current;
    expect(initialBind.value).toBe('');

    act(() => {
      const event = {
        target: { value: 'typed text' },
      };
      initialBind.onChange(event);
    });

    const [newValue, newBind] = result.current;
    expect(newValue).toBe('typed text');
    expect(newBind.value).toBe('typed text');
  });

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useFormInput('initial'));

    const [, , reset] = result.current;

    act(() => {
      const event = {
        target: { value: 'changed' },
      };
      result.current[1].onChange(event);
    });

    expect(result.current[0]).toBe('changed');

    act(() => {
      reset();
    });

    expect(result.current[0]).toBe('initial');
  });

  it('should reset to initial empty string when no initial value provided', () => {
    const { result } = renderHook(() => useFormInput());

    const [, , reset] = result.current;

    act(() => {
      const event = {
        target: { value: 'some text' },
      };
      result.current[1].onChange(event);
    });

    expect(result.current[0]).toBe('some text');

    act(() => {
      reset();
    });

    expect(result.current[0]).toBe('');
  });

  it('should handle multiple consecutive onChange calls', () => {
    const { result } = renderHook(() => useFormInput());

    const [, bind] = result.current;

    act(() => {
      bind.onChange({ target: { value: 'a' } });
    });
    expect(result.current[0]).toBe('a');

    act(() => {
      bind.onChange({ target: { value: 'ab' } });
    });
    expect(result.current[0]).toBe('ab');

    act(() => {
      bind.onChange({ target: { value: 'abc' } });
    });
    expect(result.current[0]).toBe('abc');
  });

  it('should handle empty string input', () => {
    const { result } = renderHook(() => useFormInput('initial'));

    act(() => {
      result.current[1].onChange({ target: { value: '' } });
    });

    expect(result.current[0]).toBe('');
  });

  it('should handle special characters', () => {
    const { result } = renderHook(() => useFormInput());

    const specialText = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/\\';

    act(() => {
      result.current[1].onChange({ target: { value: specialText } });
    });

    expect(result.current[0]).toBe(specialText);
  });

  it('should handle multiline text', () => {
    const { result } = renderHook(() => useFormInput());

    const multilineText = 'line 1\nline 2\nline 3';

    act(() => {
      result.current[1].onChange({ target: { value: multilineText } });
    });

    expect(result.current[0]).toBe(multilineText);
  });

  it('should handle unicode characters', () => {
    const { result } = renderHook(() => useFormInput());

    const unicodeText = 'Hello 世界 🚀 مرحبا';

    act(() => {
      result.current[1].onChange({ target: { value: unicodeText } });
    });

    expect(result.current[0]).toBe(unicodeText);
  });

  it('should handle very long text', () => {
    const { result } = renderHook(() => useFormInput());

    const longText = 'a'.repeat(10000);

    act(() => {
      result.current[1].onChange({ target: { value: longText } });
    });

    expect(result.current[0]).toBe(longText);
    expect(result.current[0].length).toBe(10000);
  });

  it('should maintain independent state for multiple instances', () => {
    const { result: hook1 } = renderHook(() => useFormInput('initial1'));
    const { result: hook2 } = renderHook(() => useFormInput('initial2'));

    act(() => {
      hook1.current[1].onChange({ target: { value: 'changed1' } });
    });

    expect(hook1.current[0]).toBe('changed1');
    expect(hook2.current[0]).toBe('initial2');
  });

  it('should return reset function that is callable', () => {
    const { result } = renderHook(() => useFormInput('test'));

    const [, , reset] = result.current;

    expect(typeof reset).toBe('function');

    act(() => {
      reset();
    });

    expect(result.current[0]).toBe('test');
  });
});
