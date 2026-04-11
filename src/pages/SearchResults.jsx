import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "../components/PageLayout";
import { SearchBar } from "../components/search/SearchBar";
import { FilterPanel } from "../components/search/FilterPanel";
import { SearchResults as SearchResultsComponent } from "../components/search/SearchResults";

/**
 * Search results page
 */
export function SearchResultsPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <PageLayout title="🔍 Search Concepts">
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop filters */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FilterPanel />
        </motion.div>

        {/* Mobile filters toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="glass-card rounded-lg p-3 w-full text-center font-semibold"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          {showFilters && <FilterPanel />}
        </div>

        {/* Results */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <SearchResultsComponent />
        </motion.div>
      </div>
    </PageLayout>
  );
}
