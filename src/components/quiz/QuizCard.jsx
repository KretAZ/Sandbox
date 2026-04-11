import { useState } from "react";
import { motion } from "framer-motion";
import { GlassButton } from "../GlassButton";

/**
 * Interactive quiz card for testing knowledge
 */
export function QuizCard({ quiz, onComplete }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const isCorrect = selectedAnswer?.correct;

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setSubmitted(true);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setSubmitted(false);
    setShowExplanation(false);
    onComplete?.(isCorrect);
  };

  return (
    <motion.div
      className="glass-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gradient mb-2">{quiz.question}</h3>
      </div>

      {/* Answers */}
      <div className="space-y-3 mb-6">
        {quiz.answers.map((answer, idx) => {
          const isSelected = selectedAnswer?.id === answer.id;
          const isAnswerCorrect = submitted && answer.correct;
          const isAnswerWrong = submitted && isSelected && !answer.correct;

          return (
            <motion.button
              key={answer.id}
              onClick={() => !submitted && setSelectedAnswer(answer)}
              className={`w-full p-4 rounded-lg font-semibold text-left transition-all ${
                isSelected
                  ? isAnswerCorrect
                    ? "bg-green-500/20 border-2 border-green-500 text-green-600"
                    : "bg-red-500/20 border-2 border-red-500 text-red-600"
                  : isAnswerCorrect
                    ? "bg-green-500/20 border-2 border-green-500 text-green-600"
                    : "bg-white/10 border-2 border-white/20 hover:bg-white/20"
              }`}
              whileHover={!submitted ? { scale: 1.02 } : {}}
              whileTap={!submitted ? { scale: 0.98 } : {}}
              disabled={submitted}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border-2 border-current flex items-center justify-center text-sm">
                  {isAnswerCorrect ? "✓" : isAnswerWrong ? "✗" : ""}
                </div>
                <span>{answer.text}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <motion.div
          className={`p-4 rounded-lg mb-6 ${
            isCorrect ? "bg-green-500/20 text-green-600" : "bg-blue-500/20 text-blue-600"
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-semibold mb-2">
            {isCorrect ? "✓ Correct!" : "💡 Explanation:"}
          </p>
          <p className="text-sm">{quiz.explanation}</p>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!submitted ? (
          <GlassButton
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            variant="primary"
            className="flex-1"
          >
            Check Answer
          </GlassButton>
        ) : (
          <GlassButton
            onClick={handleNext}
            variant="primary"
            className="flex-1"
          >
            Next Question
          </GlassButton>
        )}
      </div>

      {/* Score indicator */}
      {submitted && (
        <motion.div
          className="text-sm mt-4 text-center font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {isCorrect ? (
            <span className="text-green-600">Great job! 🎉</span>
          ) : (
            <span className="text-blue-600">Keep learning! 📚</span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
