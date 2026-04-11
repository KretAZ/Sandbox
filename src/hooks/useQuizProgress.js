import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Hook for tracking quiz and challenge progress
 * Stores: completed quizzes, correct answers, attempts
 */
export function useQuizProgress() {
  const [quizData, setQuizData] = useLocalStorage("quizProgress", {
    completedQuizzes: {}, // { "useState-q1": true, ... }
    correctAnswers: {}, // { "useState-q1": true/false, ... }
    quizAttempts: {}, // { "useState-q1": 1, ... }
    completedChallenges: {}, // { "useState-challenge-1": true, ... }
    challengeAttempts: {}, // { "useState-challenge-1": 1, ... }
  });

  // Quiz Methods
  const markQuizComplete = useCallback(
    (quizId, isCorrect) => {
      setQuizData((prev) => ({
        ...prev,
        completedQuizzes: { ...prev.completedQuizzes, [quizId]: true },
        correctAnswers: { ...prev.correctAnswers, [quizId]: isCorrect },
        quizAttempts: {
          ...prev.quizAttempts,
          [quizId]: (prev.quizAttempts[quizId] || 0) + 1,
        },
      }));
    },
    [setQuizData]
  );

  const isQuizComplete = useCallback(
    (quizId) => quizData.completedQuizzes[quizId] || false,
    [quizData.completedQuizzes]
  );

  const getQuizAttempts = useCallback(
    (quizId) => quizData.quizAttempts[quizId] || 0,
    [quizData.quizAttempts]
  );

  const wasQuizCorrect = useCallback(
    (quizId) => quizData.correctAnswers[quizId],
    [quizData.correctAnswers]
  );

  // Challenge Methods
  const markChallengeComplete = useCallback(
    (challengeId) => {
      setQuizData((prev) => ({
        ...prev,
        completedChallenges: {
          ...prev.completedChallenges,
          [challengeId]: true,
        },
        challengeAttempts: {
          ...prev.challengeAttempts,
          [challengeId]: (prev.challengeAttempts[challengeId] || 0) + 1,
        },
      }));
    },
    [setQuizData]
  );

  const isChallengeComplete = useCallback(
    (challengeId) => quizData.completedChallenges[challengeId] || false,
    [quizData.completedChallenges]
  );

  const getChallengeAttempts = useCallback(
    (challengeId) => quizData.challengeAttempts[challengeId] || 0,
    [quizData.challengeAttempts]
  );

  // Stats
  const getCompletedQuizzes = useCallback(
    () => Object.keys(quizData.completedQuizzes).length,
    [quizData.completedQuizzes]
  );

  const getCorrectQuizzes = useCallback(
    () =>
      Object.values(quizData.correctAnswers).filter((isCorrect) => isCorrect)
        .length,
    [quizData.correctAnswers]
  );

  const getCompletedChallenges = useCallback(
    () => Object.keys(quizData.completedChallenges).length,
    [quizData.completedChallenges]
  );

  const getQuizAccuracy = useCallback(() => {
    const completed = getCompletedQuizzes();
    if (completed === 0) return 0;
    return Math.round((getCorrectQuizzes() / completed) * 100);
  }, [getCompletedQuizzes, getCorrectQuizzes]);

  // Reset
  const resetQuizProgress = useCallback(() => {
    setQuizData({
      completedQuizzes: {},
      correctAnswers: {},
      quizAttempts: {},
      completedChallenges: {},
      challengeAttempts: {},
    });
  }, [setQuizData]);

  return {
    // Quiz methods
    markQuizComplete,
    isQuizComplete,
    getQuizAttempts,
    wasQuizCorrect,
    // Challenge methods
    markChallengeComplete,
    isChallengeComplete,
    getChallengeAttempts,
    // Stats
    getCompletedQuizzes,
    getCorrectQuizzes,
    getCompletedChallenges,
    getQuizAccuracy,
    // Reset
    resetQuizProgress,
  };
}
