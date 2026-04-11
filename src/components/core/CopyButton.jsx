import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Copy to clipboard button with feedback
 */
export function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
        copied
          ? "bg-green-500/20 text-green-400 border border-green-500/40"
          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {copied ? "✓ Copied!" : label}
    </motion.button>
  );
}
