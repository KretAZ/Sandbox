import { motion } from "framer-motion";
import { GlassButton } from "../GlassButton";
import { CopyButton } from "./CopyButton";

/**
 * Clean code editor with line numbers
 */
export function CodeEditor({
  code,
  setCode,
  onExecute,
  onReset,
  isExecuting = false,
  language = "javascript",
}) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Editor Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm ml-4 font-mono text-gray-400">
            {language}
          </span>
        </div>
        <div className="flex gap-2">
          <CopyButton text={code} label="📋 Copy" />
          <GlassButton
            onClick={onReset}
            variant="glass"
            size="sm"
            className="text-sm"
          >
            ↻ Reset
          </GlassButton>
        </div>
      </div>

      {/* Editor Container */}
      <div className="relative rounded-lg overflow-hidden border border-white/10 glass-effect">
        {/* Textarea */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="relative w-full h-64 p-4 pl-12 bg-gray-950 text-sm font-mono text-gray-100 resize-none focus:outline-none border-0 rounded-0 caret-cyan-400"
          spellCheck="false"
          style={{
            paddingLeft: "48px",
          }}
        />

        {/* Line numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-900/50 border-r border-white/10 py-4 px-2 text-right text-xs font-mono text-gray-600 pointer-events-none overflow-hidden">
          {code.split("\n").map((_, i) => (
            <div key={i} className="h-6 leading-6">{i + 1}</div>
          ))}
        </div>
      </div>

      {/* Execute Button */}
      <GlassButton
        onClick={onExecute}
        disabled={isExecuting}
        variant="primary"
        className="w-full"
      >
        {isExecuting ? "⚡ Executing..." : "▶ Execute Code"}
      </GlassButton>
    </motion.div>
  );
}
