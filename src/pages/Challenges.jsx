import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { SectionContainer } from "../components/SectionContainer";
import { ChallengeCard } from "../components/quiz/ChallengeCard";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { getChallengesForConcept, difficultyLevels } from "../data/challenges";
import { useQuizContext } from "../context/QuizContext";

/**
 * Challenges page for coding exercises
 */
export function Challenges() {
  const { concept = "useState" } = useParams();
  const challenges = getChallengesForConcept(concept);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const { markChallengeComplete, isChallengeComplete } = useQuizContext();

  if (!challenges || challenges.length === 0) {
    return (
      <PageLayout title="💻 Challenges">
        <GlassCard>
          <p className="text-center opacity-75">
            No challenges available for this concept yet.
          </p>
        </GlassCard>
      </PageLayout>
    );
  }

  const currentChallenge = challenges[currentChallengeIndex];

  const handleSolved = (challengeId) => {
    markChallengeComplete(challengeId);
  };

  const getTotalDifficulty = () => {
    return challenges.reduce((total, challenge) => {
      return total + (difficultyLevels[challenge.difficulty] || 0);
    }, 0);
  };

  const getCurrentDifficulty = () => {
    return difficultyLevels[currentChallenge.difficulty] || 0;
  };

  return (
    <PageLayout title={`💻 Challenges: ${concept}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Main Challenge */}
        <div className="lg:col-span-2">
          <ChallengeCard
            challenge={currentChallenge}
            onSolved={handleSolved}
          />

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            <GlassButton
              onClick={() =>
                setCurrentChallengeIndex(Math.max(0, currentChallengeIndex - 1))
              }
              disabled={currentChallengeIndex === 0}
              variant="glass"
              className="flex-1"
            >
              ← Previous
            </GlassButton>
            <GlassButton
              onClick={() =>
                setCurrentChallengeIndex(
                  Math.min(challenges.length - 1, currentChallengeIndex + 1)
                )
              }
              disabled={currentChallengeIndex === challenges.length - 1}
              variant="glass"
              className="flex-1"
            >
              Next →
            </GlassButton>
          </div>
        </div>

        {/* Progress Sidebar */}
        <SectionContainer title="📊 Progress" variant="glass" delay={0}>
          <div className="space-y-4">
            {/* Overall Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Overall</span>
                <span className="text-sm opacity-75">
                  {challenges.filter((c) => isChallengeComplete(c.id)).length}/
                  {challenges.length}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${
                      (challenges.filter((c) => isChallengeComplete(c.id))
                        .length /
                        challenges.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Difficulty Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Difficulty Points</span>
                <span className="text-sm opacity-75">
                  {challenges
                    .filter((c) => isChallengeComplete(c.id))
                    .reduce(
                      (total, c) =>
                        total + (difficultyLevels[c.difficulty] || 0),
                      0
                    )}
                  /{getTotalDifficulty()}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all"
                  style={{
                    width: `${
                      (challenges
                        .filter((c) => isChallengeComplete(c.id))
                        .reduce(
                          (total, c) =>
                            total + (difficultyLevels[c.difficulty] || 0),
                          0
                        ) /
                        getTotalDifficulty()) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Challenge List */}
            <div>
              <h4 className="font-semibold mb-2">Challenges</h4>
              <div className="space-y-1">
                {challenges.map((challenge, idx) => {
                  const isCompleted = isChallengeComplete(challenge.id);
                  const diffColor = {
                    Easy: "text-green-400",
                    Medium: "text-yellow-400",
                    Hard: "text-red-400",
                  };

                  return (
                    <button
                      key={challenge.id}
                      onClick={() => setCurrentChallengeIndex(idx)}
                      className={`w-full text-left p-2 rounded transition-all text-sm ${
                        idx === currentChallengeIndex
                          ? "bg-primary/30 border border-primary"
                          : "bg-white/10 hover:bg-white/20 border border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`${diffColor[challenge.difficulty]}`}>
                            {isCompleted ? "✓" : "→"}
                          </span>
                          <span className="font-semibold truncate">
                            {challenge.title}
                          </span>
                        </div>
                        <span className="text-xs opacity-50">
                          {challenge.difficulty.charAt(0)}
                        </span>
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
                  <span className="opacity-75">Completed:</span>{" "}
                  <span className="font-semibold text-green-400">
                    {challenges.filter((c) => isChallengeComplete(c.id)).length}
                  </span>
                </p>
                <p>
                  <span className="opacity-75">Current Difficulty:</span>{" "}
                  <span className="font-semibold">
                    {currentChallenge.difficulty}
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
