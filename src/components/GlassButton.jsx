import { motion } from "framer-motion";

export function GlassButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}) {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-glow",
    secondary: "bg-secondary text-white hover:shadow-glow",
    glass: "glass-effect text-white hover:shadow-glow",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
  };

  const finalClassName = `
    rounded-xl font-semibold transition-all cursor-pointer
    ${sizeClasses[size]} ${variantClasses[variant]} ${className}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `.trim();

  return (
    <motion.button
      className={finalClassName}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}
