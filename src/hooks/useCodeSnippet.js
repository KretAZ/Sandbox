import { useState, useCallback, useRef } from "react";

/**
 * Hook to manage code snippet state and execution
 */
export function useCodeSnippet(initialCode = "") {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const workerRef = useRef(null);

  /**
   * Execute code in a Web Worker for safety
   */
  const executeCode = useCallback(async () => {
    setIsExecuting(true);
    setOutput("");
    setError(null);

    try {
      // Create worker on first execution
      if (!workerRef.current) {
        const workerCode = `
          let logs = [];
          const originalLog = console.log;
          const originalError = console.error;

          console.log = function(...args) {
            logs.push(args.map(arg => {
              if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);
              }
              return String(arg);
            }).join(' '));
            originalLog.apply(console, args);
          };

          console.error = function(...args) {
            logs.push('ERROR: ' + args.join(' '));
            originalError.apply(console, args);
          };

          self.onmessage = async function(e) {
            try {
              logs = [];
              // Create function from code string to avoid global scope pollution
              const fn = new Function(e.data);
              const result = await fn();

              if (result !== undefined && !logs.length) {
                logs.push(String(result));
              }

              self.postMessage({
                success: true,
                output: logs.join('\\n'),
                result: result
              });
            } catch (err) {
              self.postMessage({
                success: false,
                error: err.message,
                stack: err.stack
              });
            }
          };
        `;

        const blob = new Blob([workerCode], { type: "application/javascript" });
        const workerUrl = URL.createObjectURL(blob);
        workerRef.current = new Worker(workerUrl);
      }

      // Execute code in worker
      return new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
          setError("Execution timeout (5s)");
          setIsExecuting(false);
          resolve();
        }, 5000);

        workerRef.current.onmessage = (event) => {
          clearTimeout(timeoutId);
          const { success, output: result, error: err, stack } = event.data;

          if (success) {
            setOutput(result || "✓ Code executed successfully");
            setError(null);
          } else {
            setError(err);
            setOutput(null);
          }

          setIsExecuting(false);
          resolve();
        };

        workerRef.current.postMessage(code);
      });
    } catch (err) {
      setError(err.message);
      setIsExecuting(false);
    }
  }, [code]);

  /**
   * Reset code to initial value
   */
  const resetCode = useCallback(() => {
    setCode(initialCode);
    setOutput("");
    setError(null);
  }, [initialCode]);

  /**
   * Copy code to clipboard
   */
  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      return true;
    } catch (err) {
      console.error("Failed to copy:", err);
      return false;
    }
  }, [code]);

  /**
   * Clear all
   */
  const clear = useCallback(() => {
    setCode("");
    setOutput("");
    setError(null);
  }, []);

  return {
    code,
    setCode,
    output,
    error,
    isExecuting,
    executeCode,
    resetCode,
    copyCode,
    clear,
  };
}
