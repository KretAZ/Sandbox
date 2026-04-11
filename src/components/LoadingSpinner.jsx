import { motion } from "framer-motion";

export function LoadingSpinner({
  size = "md",
  variant = "glass",
  text = "Loading...",
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 2, repeat: Infinity, ease: "linear" },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`${sizeClasses[size]} ${
          variant === "glass"
            ? "glass-card border-2 border-transparent border-t-primary border-r-primary"
            : "border-4 border-gray-200 border-t-primary"
        } rounded-full`}
        variants={spinnerVariants}
        animate="animate"
      />
      {text && <p className="text-primary font-semibold">{text}</p>}
    </div>
  );
}
