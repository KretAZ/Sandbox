import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function HeroSection({
  title,
  subtitle,
  children,
  animated = true,
}) {
  const theme = useContext(ThemeContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  if (!animated) {
    return (
      <div className={`py-20 px-4 text-center mb-12`}>
        <h1 className="text-6xl font-bold mb-6 text-gradient">{title}</h1>
        <p className="text-2xl opacity-80 mb-8">{subtitle}</p>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className="relative py-20 px-4 text-center mb-12 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 -z-10 opacity-40 blur-3xl ${
          theme.isDark
            ? "gradient-primary"
            : "bg-gradient-to-br from-blue-200 to-purple-200"
        }`}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Content */}
      <motion.h1
        className="text-6xl md:text-7xl font-bold mb-6 text-gradient"
        variants={itemVariants}
      >
        {title}
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl opacity-80 mb-8 max-w-2xl mx-auto"
        variants={itemVariants}
      >
        {subtitle}
      </motion.p>

      <motion.div variants={itemVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
}
