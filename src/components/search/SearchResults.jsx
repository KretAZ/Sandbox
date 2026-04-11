import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSearchContext } from "../../context/SearchContext";
import { GlassCard } from "../GlassCard";
import { useProgressContext } from "../../context/ProgressContext";

/**
 * Display search results
 */
export function SearchResults() {
  const { query, results } = useSearchContext();
  const { isLessonComplete } = useProgressContext();

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <p className="text-lg opacity-75">Start typing to search concepts...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg opacity-75">
          No concepts found for "{query}"
        </p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-sm opacity-75 mb-4">
        Found {results.length} result{results.length !== 1 ? "s" : ""}
      </p>

      {results.map((concept, idx) => {
        const isComplete = isLessonComplete(concept.id);

        return (
          <motion.div key={concept.id} variants={itemVariants}>
            <Link to={concept.path} className="block group">
              <GlassCard animated={false} className="group-hover:shadow-glow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{concept.emoji}</span>
                      <h3 className="text-lg font-bold text-gradient group-hover:opacity-80 transition-opacity">
                        {concept.title}
                      </h3>
                      {isComplete && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                          ✓ Done
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-75 mb-3">{concept.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                        {concept.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary">
                        {concept.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {concept.duration}
                      </span>
                    </div>
                  </div>
                  <span className="text-primary group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
