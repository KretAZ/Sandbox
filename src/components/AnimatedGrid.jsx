import { motion } from "framer-motion";

export function AnimatedGrid({
  children,
  columns = 3,
  animated = true,
  gap = "gap-6",
}) {
  const colsClass = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  if (!animated) {
    return (
      <div className={`grid grid-cols-1 ${colsClass[columns]} ${gap} mb-12`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`grid grid-cols-1 ${colsClass[columns]} ${gap} mb-12`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.isArray(children) ? (
        children.map((child, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}
