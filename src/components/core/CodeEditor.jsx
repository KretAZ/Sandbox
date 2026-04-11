import { motion } from "framer-motion";
import { GlassButton } from "../GlassButton";
import { CopyButton } from "./CopyButton";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("javascript", javascript);

/**
 * Code editor component with syntax highlighting
 */
export function CodeEditor({
  code,
  setCode,
  onExecute,
  onReset,
  isExecuting = false,
  language = "javascript",
}) {
  const highlightedCode = hljs.highlight(code, { language }).value;

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
        {/* Syntax highlighted background */}
        <pre
          className="absolute inset-0 p-4 text-sm font-mono overflow-hidden pointer-events-none"
          style={{
            color: "transparent",
            background: "transparent",
          }}
        >
          <code
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            style={{ color: "transparent" }}
          />
        </pre>

        {/* Textarea overlay */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="relative w-full h-64 p-4 bg-transparent text-sm font-mono text-white resize-none focus:outline-none border-0 rounded-0 caret-white"
          spellCheck="false"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.02) 40px, transparent 40px)",
            backgroundAttachment: "local",
            paddingLeft: "45px",
          }}
        />

        {/* Line numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-white/5 border-r border-white/10 p-4 text-right text-xs font-mono text-gray-500 pointer-events-none overflow-hidden">
          {code.split("\n").map((_, i) => (
            <div key={i}>{i + 1}</div>
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
