import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Hook to manage learning progress
 * Tracks which lessons have been completed
 */
export function useProgress() {
  const [progress, setProgress] = useLocalStorage("react-learning-progress", {});

  /**
   * Mark a lesson as completed
   */
  const markLessonComplete = useCallback(
    (lessonId) => {
      setProgress((prev) => ({
        ...prev,
        [lessonId]: {
          completed: true,
          completedAt: new Date().toISOString(),
        },
      }));
    },
    [setProgress]
  );

  /**
   * Mark a lesson as incomplete
   */
  const markLessonIncomplete = useCallback(
    (lessonId) => {
      setProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[lessonId];
        return newProgress;
      });
    },
    [setProgress]
  );

  /**
   * Check if a lesson is completed
   */
  const isLessonComplete = useCallback(
    (lessonId) => {
      return progress[lessonId]?.completed || false;
    },
    [progress]
  );

  /**
   * Get overall progress percentage
   */
  const getProgressPercentage = useCallback(
    (totalLessons) => {
      if (totalLessons === 0) return 0;
      const completed = Object.values(progress).filter(p => p.completed).length;
      return Math.round((completed / totalLessons) * 100);
    },
    [progress]
  );

  /**
   * Get number of completed lessons
   */
  const getCompletedCount = useCallback(() => {
    return Object.values(progress).filter(p => p.completed).length;
  }, [progress]);

  /**
   * Reset all progress
   */
  const resetProgress = useCallback(() => {
    setProgress({});
  }, [setProgress]);

  /**
   * Get completion date of a lesson
   */
  const getCompletionDate = useCallback(
    (lessonId) => {
      return progress[lessonId]?.completedAt || null;
    },
    [progress]
  );

  return {
    progress,
    markLessonComplete,
    markLessonIncomplete,
    isLessonComplete,
    getProgressPercentage,
    getCompletedCount,
    resetProgress,
    getCompletionDate,
  };
}
