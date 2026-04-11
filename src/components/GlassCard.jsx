import { motion } from "framer-motion";

export function GlassCard({
  children,
  variant = "card",
  animated = true,
  onClick,
  className = "",
  delay = 0,
}) {
  const baseClasses = "glass-card rounded-2xl p-6 backdrop-blur-lg";

  const variantClasses = {
    card: "border border-white/20 bg-white/10",
    light: "border border-white/40 bg-white/80",
    gradient: "bg-gradient-to-br from-white/20 to-white/10 border border-white/30",
  };

  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (!animated) {
    return <div className={finalClassName}>{children}</div>;
  }

  return (
    <motion.div
      className={finalClassName}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(102, 126, 234, 0.4)" }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
