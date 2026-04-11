import { motion } from "framer-motion";

export function SectionContainer({
  children,
  title,
  variant = "glass",
  className = "",
  delay = 0,
}) {
  const variantClasses = {
    glass: "glass-card",
    gradient: "bg-gradient-to-br from-white/20 to-white/10 border border-white/30 rounded-2xl p-6 backdrop-blur-lg",
    solid: "bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6",
  };

  return (
    <motion.div
      className={`${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-gradient">{title}</h2>
      )}
      {children}
    </motion.div>
  );
}
