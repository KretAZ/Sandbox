import { motion } from "framer-motion";
import { useCodeSnippet } from "../../hooks/useCodeSnippet";
import { CodeEditor } from "./CodeEditor";
import { CodePreview } from "./CodePreview";

/**
 * Complete code snippet card with editor and preview
 */
export function CodeSnippetCard({
  initialCode,
  title,
  description,
  animated = true,
  delay = 0,
}) {
  const {
    code,
    setCode,
    output,
    error,
    isExecuting,
    executeCode,
    resetCode,
  } = useCodeSnippet(initialCode);

  const content = (
    <div className="space-y-6">
      {/* Header */}
      {title && (
        <div>
          <h3 className="text-xl font-bold text-gradient mb-2">{title}</h3>
          {description && <p className="text-sm opacity-75">{description}</p>}
        </div>
      )}

      {/* Editor and Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-gray-400">Code</h4>
          <CodeEditor
            code={code}
            setCode={setCode}
            onExecute={executeCode}
            onReset={resetCode}
            isExecuting={isExecuting}
          />
        </div>

        {/* Preview */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-gray-400">Output</h4>
          <CodePreview
            output={output}
            error={error}
            isExecuting={isExecuting}
          />
        </div>
      </div>
    </div>
  );

  if (!animated) {
    return <div className="glass-card rounded-xl p-6">{content}</div>;
  }

  return (
    <motion.div
      className="glass-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {content}
    </motion.div>
  );
}
