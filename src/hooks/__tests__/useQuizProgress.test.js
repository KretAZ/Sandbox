import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuizProgress } from '../useQuizProgress';

describe('useQuizProgress', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty progress data', () => {
    const { result } = renderHook(() => useQuizProgress());

    expect(result.current.getCompletedQuizzes()).toBe(0);
    expect(result.current.getCorrectQuizzes()).toBe(0);
    expect(result.current.getCompletedChallenges()).toBe(0);
    expect(result.current.getQuizAccuracy()).toBe(0);
  });

  // Quiz Methods
  it('should mark a quiz as complete with correct answer', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('useState-q1', true);
    });

    expect(result.current.isQuizComplete('useState-q1')).toBe(true);
    expect(result.current.wasQuizCorrect('useState-q1')).toBe(true);
    expect(result.current.getQuizAttempts('useState-q1')).toBe(1);
  });

  it('should mark a quiz as complete with incorrect answer', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('useState-q1', false);
    });

    expect(result.current.isQuizComplete('useState-q1')).toBe(true);
    expect(result.current.wasQuizCorrect('useState-q1')).toBe(false);
    expect(result.current.getQuizAttempts('useState-q1')).toBe(1);
  });

  it('should increment attempts when quiz is retried', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('useState-q1', false);
    });

    expect(result.current.getQuizAttempts('useState-q1')).toBe(1);

    act(() => {
      result.current.markQuizComplete('useState-q1', true);
    });

    expect(result.current.getQuizAttempts('useState-q1')).toBe(2);
  });

  it('should track multiple quizzes separately', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('useState-q1', true);
      result.current.markQuizComplete('useState-q2', false);
      result.current.markQuizComplete('useEffect-q1', true);
    });

    expect(result.current.isQuizComplete('useState-q1')).toBe(true);
    expect(result.current.isQuizComplete('useState-q2')).toBe(true);
    expect(result.current.isQuizComplete('useEffect-q1')).toBe(true);
    expect(result.current.getCompletedQuizzes()).toBe(3);
  });

  it('should return 0 attempts for uncompleted quiz', () => {
    const { result } = renderHook(() => useQuizProgress());

    expect(result.current.getQuizAttempts('non-existent')).toBe(0);
  });

  it('should return undefined for unchecked quiz correctness', () => {
    const { result } = renderHook(() => useQuizProgress());

    expect(result.current.wasQuizCorrect('non-existent')).toBeUndefined();
  });

  // Challenge Methods
  it('should mark a challenge as complete', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markChallengeComplete('useState-challenge-1');
    });

    expect(result.current.isChallengeComplete('useState-challenge-1')).toBe(true);
    expect(result.current.getChallengeAttempts('useState-challenge-1')).toBe(1);
  });

  it('should increment challenge attempts', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markChallengeComplete('useState-challenge-1');
    });

    expect(result.current.getChallengeAttempts('useState-challenge-1')).toBe(1);

    act(() => {
      result.current.markChallengeComplete('useState-challenge-1');
    });

    expect(result.current.getChallengeAttempts('useState-challenge-1')).toBe(2);
  });

  it('should track multiple challenges separately', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markChallengeComplete('useState-challenge-1');
      result.current.markChallengeComplete('useEffect-challenge-1');
      result.current.markChallengeComplete('useContext-challenge-1');
    });

    expect(result.current.getCompletedChallenges()).toBe(3);
  });

  it('should return 0 attempts for uncompleted challenge', () => {
    const { result } = renderHook(() => useQuizProgress());

    expect(result.current.getChallengeAttempts('non-existent')).toBe(0);
  });

  // Stats
  it('should calculate correct quiz count', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('q1', true);
      result.current.markQuizComplete('q2', true);
      result.current.markQuizComplete('q3', false);
    });

    expect(result.current.getCorrectQuizzes()).toBe(2);
  });

  it('should calculate quiz accuracy percentage', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('q1', true);
      result.current.markQuizComplete('q2', true);
      result.current.markQuizComplete('q3', false);
    });

    expect(result.current.getQuizAccuracy()).toBe(67); // 2/3 = 0.666... rounds to 67
  });

  it('should return 0% accuracy when no quizzes completed', () => {
    const { result } = renderHook(() => useQuizProgress());

    expect(result.current.getQuizAccuracy()).toBe(0);
  });

  it('should return 100% accuracy when all quizzes correct', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('q1', true);
      result.current.markQuizComplete('q2', true);
      result.current.markQuizComplete('q3', true);
    });

    expect(result.current.getQuizAccuracy()).toBe(100);
  });

  it('should handle partial correct answers in accuracy calculation', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('q1', true);
      result.current.markQuizComplete('q2', false);
    });

    expect(result.current.getQuizAccuracy()).toBe(50);
  });

  // Reset
  it('should reset all progress', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('q1', true);
      result.current.markQuizComplete('q2', false);
      result.current.markChallengeComplete('c1');
    });

    expect(result.current.getCompletedQuizzes()).toBe(2);
    expect(result.current.getCompletedChallenges()).toBe(1);

    act(() => {
      result.current.resetQuizProgress();
    });

    expect(result.current.getCompletedQuizzes()).toBe(0);
    expect(result.current.getCorrectQuizzes()).toBe(0);
    expect(result.current.getCompletedChallenges()).toBe(0);
    expect(result.current.getQuizAccuracy()).toBe(0);
  });

  // Persistence
  it('should persist quiz progress to localStorage', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('useState-q1', true);
    });

    const stored = JSON.parse(localStorage.getItem('quizProgress'));
    expect(stored.completedQuizzes['useState-q1']).toBe(true);
    expect(stored.correctAnswers['useState-q1']).toBe(true);
  });

  it('should restore quiz progress from localStorage', () => {
    const savedData = {
      completedQuizzes: { 'useState-q1': true, 'useState-q2': true },
      correctAnswers: { 'useState-q1': true, 'useState-q2': false },
      quizAttempts: { 'useState-q1': 1, 'useState-q2': 2 },
      completedChallenges: { 'challenge-1': true },
      challengeAttempts: { 'challenge-1': 1 },
    };

    localStorage.setItem('quizProgress', JSON.stringify(savedData));

    const { result } = renderHook(() => useQuizProgress());

    expect(result.current.isQuizComplete('useState-q1')).toBe(true);
    expect(result.current.isQuizComplete('useState-q2')).toBe(true);
    expect(result.current.wasQuizCorrect('useState-q1')).toBe(true);
    expect(result.current.wasQuizCorrect('useState-q2')).toBe(false);
    expect(result.current.getCompletedQuizzes()).toBe(2);
    expect(result.current.getQuizAttempts('useState-q1')).toBe(1);
    expect(result.current.getQuizAttempts('useState-q2')).toBe(2);
  });

  // Edge Cases
  it('should handle retrying with different answer', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('q1', false);
    });

    expect(result.current.wasQuizCorrect('q1')).toBe(false);
    expect(result.current.getQuizAccuracy()).toBe(0);

    act(() => {
      result.current.markQuizComplete('q1', true);
    });

    expect(result.current.wasQuizCorrect('q1')).toBe(true);
    expect(result.current.getQuizAccuracy()).toBe(100);
    expect(result.current.getQuizAttempts('q1')).toBe(2);
  });

  it('should handle many quizzes and challenges', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      for (let i = 1; i <= 100; i++) {
        result.current.markQuizComplete(`q${i}`, i % 2 === 0);
      }
      for (let i = 1; i <= 50; i++) {
        result.current.markChallengeComplete(`c${i}`);
      }
    });

    expect(result.current.getCompletedQuizzes()).toBe(100);
    expect(result.current.getCompletedChallenges()).toBe(50);
    expect(result.current.getCorrectQuizzes()).toBe(50); // Half correct
  });

  it('should handle quiz IDs with special characters', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('useState-q1-variant-a', true);
      result.current.markQuizComplete('useEffect-q2.advanced', false);
      result.current.markQuizComplete('useContext_q3', true);
    });

    expect(result.current.getCompletedQuizzes()).toBe(3);
    expect(result.current.getCorrectQuizzes()).toBe(2);
  });

  it('should update stats immediately after marking quiz complete', () => {
    const { result } = renderHook(() => useQuizProgress());

    expect(result.current.getCompletedQuizzes()).toBe(0);
    expect(result.current.getCorrectQuizzes()).toBe(0);
    expect(result.current.getQuizAccuracy()).toBe(0);

    act(() => {
      result.current.markQuizComplete('q1', true);
    });

    expect(result.current.getCompletedQuizzes()).toBe(1);
    expect(result.current.getCorrectQuizzes()).toBe(1);
    expect(result.current.getQuizAccuracy()).toBe(100);
  });

  it('should handle mixed quiz and challenge activities', () => {
    const { result } = renderHook(() => useQuizProgress());

    act(() => {
      result.current.markQuizComplete('q1', true);
      result.current.markChallengeComplete('c1');
      result.current.markQuizComplete('q2', false);
      result.current.markChallengeComplete('c2');
      result.current.markQuizComplete('q3', true);
    });

    expect(result.current.getCompletedQuizzes()).toBe(3);
    expect(result.current.getCompletedChallenges()).toBe(2);
    expect(result.current.getCorrectQuizzes()).toBe(2);
    expect(result.current.getQuizAccuracy()).toBe(67);
  });
});
