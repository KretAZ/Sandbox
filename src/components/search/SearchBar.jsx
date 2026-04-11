import { motion } from "framer-motion";
import { useSearchContext } from "../../context/SearchContext";

/**
 * Global search input bar
 */
export function SearchBar() {
  const { query, updateQuery } = useSearchContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Search concepts (useState, hooks, context...)"
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
          className="input-field w-full pl-10 pr-4"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-lg">
          🔍
        </span>
        {query && (
          <button
            onClick={() => updateQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
}
