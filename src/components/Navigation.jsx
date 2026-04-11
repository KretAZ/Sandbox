import { Link } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { GlassButton } from "./GlassButton";

export function Navigation() {
  const theme = useContext(ThemeContext);

  const navLinks = [
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
      transition: { staggerChildren: 0.1 },
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
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
          >
            🚀 React Learning
          </Link>
        </motion.div>

        {/* Nav Links */}
        <motion.ul
          className="hidden md:flex gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => (
            <motion.li key={link.path} variants={itemVariants}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded-lg font-semibold transition-all hover:text-primary ${
                  theme.isDark ? "text-gray-200 hover:bg-white/10" : "text-gray-900 hover:bg-black/5"
                }`}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Theme Toggle */}
        <motion.div variants={itemVariants}>
          <GlassButton
            onClick={theme.toggleTheme}
            variant="glass"
            size="md"
          >
            {theme.isDark ? "☀️ Light" : "🌙 Dark"}
          </GlassButton>
        </motion.div>
      </div>
    </motion.nav>
  );
}
