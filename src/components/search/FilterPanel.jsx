import { motion } from "framer-motion";
import { useSearchContext } from "../../context/SearchContext";
import {
  getAllCategories,
  getAllDifficulties,
  getAllTags,
} from "../../data/conceptsMap";
import { GlassButton } from "../GlassButton";

/**
 * Filter panel for search results
 */
export function FilterPanel() {
  const {
    filters,
    setCategory,
    setDifficulty,
    toggleTag,
    resetFilters,
    hasActiveFilters,
  } = useSearchContext();

  const categories = getAllCategories();
  const difficulties = getAllDifficulties();
  const tags = getAllTags();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl p-6 space-y-6"
    >
      <div>
        <h3 className="font-bold mb-3 text-gradient">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                filters.category === category
                  ? "bg-primary/30 border border-primary text-primary"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/10" />

      <div>
        <h3 className="font-bold mb-3 text-gradient">Difficulty</h3>
        <div className="space-y-2">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setDifficulty(difficulty)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                filters.difficulty === difficulty
                  ? "bg-secondary/30 border border-secondary text-secondary"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/10" />

      <div>
        <h3 className="font-bold mb-3 text-gradient">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 12).map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                filters.tags.includes(tag)
                  ? "bg-gradient-to-r from-primary to-secondary text-white"
                  : "bg-white/10 hover:bg-white/20 border border-white/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <GlassButton
          onClick={resetFilters}
          variant="glass"
          size="sm"
          className="w-full"
        >
          Clear Filters
        </GlassButton>
      )}
    </motion.div>
  );
}
