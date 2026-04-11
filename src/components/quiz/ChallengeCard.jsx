import { useState } from "react";
import { motion } from "framer-motion";
import { GlassButton } from "../GlassButton";
import { CodeSnippetCard } from "../core/CodeSnippetCard";

/**
 * Interactive coding challenge component
 */
export function ChallengeCard({ challenge, onSolved }) {
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);

  const difficultyColor = {
    Easy: "bg-green-500/20 text-green-600 border-green-500/40",
    Medium: "bg-yellow-500/20 text-yellow-600 border-yellow-500/40",
    Hard: "bg-red-500/20 text-red-600 border-red-500/40",
  };

  return (
    <motion.div
      className="glass-card rounded-xl p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-2xl font-bold text-gradient">{challenge.title}</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold border ${
              difficultyColor[challenge.difficulty]
            }`}
          >
            {challenge.difficulty}
          </span>
        </div>
        <p className="opacity-75">{challenge.description}</p>
      </div>

      {/* Starter Code */}
      <div>
        <h4 className="text-sm font-semibold mb-3 text-gray-400">Your Task:</h4>
        <CodeSnippetCard
          title="Starter Code"
          initialCode={challenge.starterCode}
          animated={false}
        />
      </div>

      {/* Hints */}
      <div>
        <GlassButton
          onClick={() => setShowHints(!showHints)}
          variant="glass"
          className="w-full mb-3"
        >
          {showHints ? "Hide Hints" : "Show Hints"} ({hintsShown}/{challenge.hints.length})
        </GlassButton>

        {showHints && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            {challenge.hints.map((hint, idx) => (
              <motion.div
                key={idx}
                className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="font-semibold text-primary">💡 Hint {idx + 1}:</span>{" "}
                {hint}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Solution */}
      <div>
        <GlassButton
          onClick={() => setShowSolution(!showSolution)}
          variant="glass"
          className="w-full mb-3"
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </GlassButton>

        {showSolution && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <CodeSnippetCard
              title="Solution"
              initialCode={challenge.solution}
              animated={false}
            />
          </motion.div>
        )}
      </div>

      {/* Test Cases */}
      {challenge.testCases && challenge.testCases.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 text-gray-400">Test Cases:</h4>
          <div className="space-y-2">
            {challenge.testCases.map((test, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-sm"
              >
                <p>
                  <span className="font-semibold">Input:</span> {test.input}
                </p>
                <p>
                  <span className="font-semibold">Expected:</span> {test.expected}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <GlassButton
        onClick={() => onSolved?.(challenge.id)}
        variant="primary"
        className="w-full"
      >
        Mark as Completed ✓
      </GlassButton>
    </motion.div>
  );
}
