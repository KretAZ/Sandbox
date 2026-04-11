import { createContext, useContext } from "react";
import { useQuizProgress } from "../hooks/useQuizProgress";

/**
 * Global context for quiz and challenge progress
 */
const QuizContext = createContext();

export function QuizProvider({ children }) {
  const quizProgress = useQuizProgress();

  return (
    <QuizContext.Provider value={quizProgress}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within QuizProvider");
  }
  return context;
}
