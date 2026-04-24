import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgress } from '../useProgress';

describe('useProgress', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty progress', () => {
    const { result } = renderHook(() => useProgress());

    expect(result.current.progress).toEqual({});
    expect(result.current.getCompletedCount()).toBe(0);
  });

  it('should mark a lesson as complete', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markLessonComplete('lesson-1');
    });

    expect(result.current.isLessonComplete('lesson-1')).toBe(true);
    expect(result.current.getCompletedCount()).toBe(1);
  });

  it('should mark a lesson as incomplete', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markLessonComplete('lesson-1');
    });

    expect(result.current.isLessonComplete('lesson-1')).toBe(true);

    act(() => {
      result.current.markLessonIncomplete('lesson-1');
    });

    expect(result.current.isLessonComplete('lesson-1')).toBe(false);
    expect(result.current.getCompletedCount()).toBe(0);
  });

  it('should calculate progress percentage correctly', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markLessonComplete('lesson-1');
      result.current.markLessonComplete('lesson-2');
    });

    const percentage = result.current.getProgressPercentage(4);
    expect(percentage).toBe(50);
  });

  it('should return 0% when total lessons is 0', () => {
    const { result } = renderHook(() => useProgress());

    const percentage = result.current.getProgressPercentage(0);
    expect(percentage).toBe(0);
  });

  it('should return 100% when all lessons are completed', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markLessonComplete('lesson-1');
      result.current.markLessonComplete('lesson-2');
      result.current.markLessonComplete('lesson-3');
    });

    const percentage = result.current.getProgressPercentage(3);
    expect(percentage).toBe(100);
  });

  it('should round progress percentage correctly', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markLessonComplete('lesson-1');
    });

    const percentage = result.current.getProgressPercentage(3);
    expect(percentage).toBe(33); // 1/3 = 0.333... rounds to 33
  });

  it('should store completion date when marking lesson complete', () => {
    const { result } = renderHook(() => useProgress());

    const beforeCompletion = new Date();

    act(() => {
      result.current.markLessonComplete('lesson-1');
    });

    const completionDate = result.current.getCompletionDate('lesson-1');
    const afterCompletion = new Date();

    expect(completionDate).not.toBeNull();
    const dateObj = new Date(completionDate);
    expect(dateObj.getTime()).toBeGreaterThanOrEqual(beforeCompletion.getTime());
    expect(dateObj.getTime()).toBeLessThanOrEqual(afterCompletion.getTime());
  });

  it('should return null for completion date of incomplete lesson', () => {
    const { result } = renderHook(() => useProgress());

    expect(result.current.getCompletionDate('lesson-1')).toBeNull();
  });

  it('should reset all progress', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markLessonComplete('lesson-1');
      result.current.markLessonComplete('lesson-2');
    });

    expect(result.current.getCompletedCount()).toBe(2);

    act(() => {
      result.current.resetProgress();
    });

    expect(result.current.progress).toEqual({});
    expect(result.current.getCompletedCount()).toBe(0);
  });

  it('should persist progress to localStorage', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markLessonComplete('lesson-1');
    });

    const stored = JSON.parse(localStorage.getItem('react-learning-progress'));
    expect(stored['lesson-1']).toBeDefined();
    expect(stored['lesson-1'].completed).toBe(true);
  });

  it('should restore progress from localStorage', () => {
    const savedProgress = {
      'lesson-1': {
        completed: true,
        completedAt: '2024-04-24T10:00:00.000Z',
      },
      'lesson-2': {
        completed: true,
        completedAt: '2024-04-24T11:00:00.000Z',
      },
    };

    localStorage.setItem('react-learning-progress', JSON.stringify(savedProgress));

    const { result } = renderHook(() => useProgress());

    expect(result.current.isLessonComplete('lesson-1')).toBe(true);
    expect(result.current.isLessonComplete('lesson-2')).toBe(true);
    expect(result.current.getCompletedCount()).toBe(2);
  });

  it('should handle multiple lessons correctly', () => {
    const { result } = renderHook(() => useProgress());

    const lessons = ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5'];

    act(() => {
      lessons.forEach(lesson => {
        result.current.markLessonComplete(lesson);
      });
    });

    expect(result.current.getCompletedCount()).toBe(5);
    expect(result.current.getProgressPercentage(10)).toBe(50);

    act(() => {
      result.current.markLessonIncomplete('lesson-3');
    });

    expect(result.current.getCompletedCount()).toBe(4);
    expect(result.current.getProgressPercentage(10)).toBe(40);
  });

  it('should return false for uncompleted lesson check', () => {
    const { result } = renderHook(() => useProgress());

    expect(result.current.isLessonComplete('non-existent')).toBe(false);
  });

  it('should update localStorage when marking lesson complete', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markLessonComplete('lesson-1');
    });

    const stored = JSON.parse(localStorage.getItem('react-learning-progress'));
    expect('lesson-1' in stored).toBe(true);
  });

  it('should handle rapid successive marks', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markLessonComplete('lesson-1');
      result.current.markLessonIncomplete('lesson-1');
      result.current.markLessonComplete('lesson-1');
    });

    expect(result.current.isLessonComplete('lesson-1')).toBe(true);
    expect(result.current.getCompletedCount()).toBe(1);
  });
});
