import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { SectionContainer } from "../components/SectionContainer";
import { QuizCard } from "../components/quiz/QuizCard";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { getQuizForConcept } from "../data/quizzes";
import { useQuizContext } from "../context/QuizContext";

/**
 * Quiz page for testing knowledge on a concept
 */
export function Quizzes() {
  const { concept = "useState" } = useParams();
  const quizzes = getQuizForConcept(concept);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const { markQuizComplete, wasQuizCorrect, getQuizAttempts } = useQuizContext();

  if (!quizzes || quizzes.length === 0) {
    return (
      <PageLayout title="📝 Quiz">
        <GlassCard>
          <p className="text-center opacity-75">
            No quizzes available for this concept yet.
          </p>
        </GlassCard>
      </PageLayout>
    );
  }

  const currentQuiz = quizzes[currentQuizIndex];
  const isLastQuiz = currentQuizIndex === quizzes.length - 1;

  const handleComplete = (isCorrect) => {
    markQuizComplete(currentQuiz.id, isCorrect);

    if (!isLastQuiz) {
      setTimeout(() => {
        setCurrentQuizIndex(currentQuizIndex + 1);
      }, 500);
    }
  };

  const handleReset = () => {
    setCurrentQuizIndex(0);
  };

  return (
    <PageLayout title={`📝 Quiz: ${concept}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Main Quiz */}
        <div className="lg:col-span-2">
          <QuizCard quiz={currentQuiz} onComplete={handleComplete} />

          {/* Navigation */}
          {isLastQuiz && (
            <GlassButton
              onClick={handleReset}
              variant="primary"
              className="w-full mt-6"
            >
              Start Over
            </GlassButton>
          )}
        </div>

        {/* Progress Sidebar */}
        <SectionContainer title="📊 Progress" variant="glass" delay={0}>
          <div className="space-y-4">
            {/* Overall Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Overall</span>
                <span className="text-sm opacity-75">
                  {currentQuizIndex + 1}/{quizzes.length}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${((currentQuizIndex + 1) / quizzes.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Quiz List */}
            <div>
              <h4 className="font-semibold mb-2">Questions</h4>
              <div className="space-y-1">
                {quizzes.map((quiz, idx) => {
                  const isCorrect = wasQuizCorrect(quiz.id);
                  const wasAttempted = getQuizAttempts(quiz.id) > 0;

                  return (
                    <button
                      key={quiz.id}
                      onClick={() => setCurrentQuizIndex(idx)}
                      className={`w-full text-left p-2 rounded transition-all text-sm ${
                        idx === currentQuizIndex
                          ? "bg-primary/30 border border-primary"
                          : "bg-white/10 hover:bg-white/20 border border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Q{idx + 1}</span>
                        {wasAttempted && (
                          <span className={isCorrect ? "text-green-400" : "text-blue-400"}>
                            {isCorrect ? "✓" : "•"}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Statistics */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="font-semibold mb-2">Stats</h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="opacity-75">Attempted:</span>{" "}
                  <span className="font-semibold">
                    {quizzes.filter((q) => getQuizAttempts(q.id) > 0).length}
                  </span>
                </p>
                <p>
                  <span className="opacity-75">Correct:</span>{" "}
                  <span className="font-semibold text-green-400">
                    {quizzes.filter((q) => wasQuizCorrect(q.id) === true).length}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>
    </PageLayout>
  );
}
