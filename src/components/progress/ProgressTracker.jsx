import { motion } from "framer-motion";
import { useProgressContext } from "../../context/ProgressContext";
import { conceptsMap } from "../../data/conceptsMap";
import { GlassButton } from "../GlassButton";

/**
 * Display overall learning progress
 */
export function ProgressTracker() {
  const { getProgressPercentage, getCompletedCount, resetProgress } =
    useProgressContext();

  const totalLessons = conceptsMap.length;
  const completedCount = getCompletedCount();
  const percentage = getProgressPercentage(totalLessons);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all progress?")) {
      resetProgress();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gradient mb-2">Your Progress</h3>
        <p className="text-sm opacity-75">
          {completedCount} of {totalLessons} lessons completed
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-4">
        <motion.div
          className="bg-gradient-to-r from-primary to-secondary h-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Percentage text */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-2xl font-bold text-gradient">{percentage}%</span>
        <span className="text-sm text-green-500">
          {percentage === 100 ? "🎉 All done!" : `${totalLessons - completedCount} lessons left`}
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
          <p className="text-2xl font-bold text-primary">{completedCount}</p>
          <p className="text-xs opacity-75">Completed</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20 text-center">
          <p className="text-2xl font-bold text-secondary">
            {totalLessons - completedCount}
          </p>
          <p className="text-xs opacity-75">Remaining</p>
        </div>
        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-center">
          <p className="text-2xl font-bold text-cyan-500">{percentage}%</p>
          <p className="text-xs opacity-75">Done</p>
        </div>
      </div>

      {/* Reset button */}
      {completedCount > 0 && (
        <GlassButton
          onClick={handleReset}
          variant="glass"
          size="sm"
          className="w-full text-sm text-red-400 hover:text-red-300"
        >
          Reset Progress
        </GlassButton>
      )}
    </motion.div>
  );
}
