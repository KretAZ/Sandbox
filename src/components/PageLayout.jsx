import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function PageLayout({
  children,
  title,
  subtitle,
  showHero = false,
}) {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        theme.isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 opacity-10 pointer-events-none ${
          theme.isDark
            ? "gradient-primary"
            : "bg-gradient-to-br from-blue-100 to-purple-100"
        }`}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <div style={{ maxWidth: "72rem", width: "100%", padding: "3rem 1rem", position: "relative", zIndex: 1 }}>
        {/* Header animation */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl font-bold mb-2 text-gradient">{title}</h1>
            {subtitle && <p className="text-xl opacity-75">{subtitle}</p>}
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
