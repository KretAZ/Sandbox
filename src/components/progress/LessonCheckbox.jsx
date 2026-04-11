import { motion } from "framer-motion";
import { useProgressContext } from "../../context/ProgressContext";
import { GlassButton } from "../GlassButton";

/**
 * Checkbox to mark a lesson as completed
 */
export function LessonCheckbox({ lessonId, lessonTitle }) {
  const { isLessonComplete, markLessonComplete, markLessonIncomplete } =
    useProgressContext();

  const isComplete = isLessonComplete(lessonId);

  const handleToggle = () => {
    if (isComplete) {
      markLessonIncomplete(lessonId);
    } else {
      markLessonComplete(lessonId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8"
    >
      <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            isComplete
              ? "bg-green-500 border-green-500"
              : "border-green-500 hover:bg-green-500/20"
          }`}
        >
          {isComplete && <span className="text-white text-sm">✓</span>}
        </button>
        <div className="flex-1">
          <p className="font-semibold">
            {isComplete ? "✅ Lesson Completed!" : "Mark lesson as completed"}
          </p>
          <p className="text-sm opacity-75">
            {isComplete ? "Great job! You finished this lesson." : "Click to mark this lesson as done"}
          </p>
        </div>
        <GlassButton
          onClick={handleToggle}
          variant={isComplete ? "secondary" : "primary"}
          size="sm"
        >
          {isComplete ? "Undo" : "Complete"}
        </GlassButton>
      </div>
    </motion.div>
  );
}
