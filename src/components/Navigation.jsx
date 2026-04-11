import { Link } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { useProgressContext } from "../context/ProgressContext";
import { GlassButton } from "./GlassButton";
import { conceptsMap } from "../data/conceptsMap";

export function Navigation() {
  const theme = useContext(ThemeContext);
  const { getProgressPercentage, getCompletedCount } = useProgressContext();

  const totalLessons = conceptsMap.length;
  const percentage = getProgressPercentage(totalLessons);
  const completed = getCompletedCount();

  const basicLinks = [
    { label: "Home", path: "/" },
    { label: "useState", path: "/usestate" },
    { label: "useEffect", path: "/useeffect" },
    { label: "Props", path: "/props" },
    { label: "API", path: "/api" },
    { label: "Custom Hooks", path: "/custom-hooks" },
    { label: "Context", path: "/context" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        theme.isDark
          ? "bg-gray-900/80 border-white/10"
          : "bg-white/80 border-gray-200/30"
      } border-b glass-effect`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex-shrink-0">
          <Link
            to="/"
            className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            🚀 React Learning
          </Link>
        </motion.div>

        {/* Search Icon + Progress Badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <Link
            to="/search"
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Search"
          >
            <span className="text-xl">🔍</span>
          </Link>

          {completed > 0 && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/40">
              <span className="text-sm font-semibold text-green-400">
                {percentage}%
              </span>
              <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Nav Links */}
        <motion.ul
          className="hidden lg:flex gap-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {basicLinks.map((link) => (
            <motion.li key={link.path} variants={itemVariants}>
              <Link
                to={link.path}
                className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all hover:text-primary ${
                  theme.isDark ? "text-gray-200 hover:bg-white/10" : "text-gray-900 hover:bg-black/5"
                }`}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Theme Toggle */}
        <motion.div variants={itemVariants} className="flex-shrink-0">
          <GlassButton
            onClick={theme.toggleTheme}
            variant="glass"
            size="sm"
            className="text-sm"
          >
            {theme.isDark ? "☀️" : "🌙"}
          </GlassButton>
        </motion.div>
      </div>
    </motion.nav>
  );
}
