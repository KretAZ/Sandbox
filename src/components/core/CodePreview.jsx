import { motion } from "framer-motion";

/**
 * Preview panel showing code execution output
 */
export function CodePreview({ output, error, isExecuting }) {
  return (
    <motion.div
      className="rounded-lg overflow-hidden border border-white/10 glass-effect"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
        <span className="text-sm font-mono text-gray-400">
          {error ? "❌ Error" : "✓ Output"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 min-h-64 max-h-96 overflow-y-auto font-mono text-sm">
        {isExecuting && (
          <motion.div
            className="text-gray-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ⚡ Executing...
          </motion.div>
        )}

        {error && !isExecuting && (
          <div className="text-red-400 whitespace-pre-wrap">
            {error}
          </div>
        )}

        {output && !isExecuting && (
          <div className="text-green-400 whitespace-pre-wrap">
            {output}
          </div>
        )}

        {!output && !error && !isExecuting && (
          <div className="text-gray-500">
            Run code to see output here...
          </div>
        )}
      </div>
    </motion.div>
  );
}
