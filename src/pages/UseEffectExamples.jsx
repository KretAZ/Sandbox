import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function UseEffectExamples() {
  const theme = useContext(ThemeContext);

  // Example 1: Run on every render
  const [renderCount, setRenderCount] = useState(0);

  // Example 2: Run once on mount
  const [mounted, setMounted] = useState(false);

  // Example 3: Dependency array
  const [count, setCount] = useState(0);
  const [effectLog, setEffectLog] = useState([]);

  // Example 4: Cleanup function
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Example 5: Document title
  const [pageTitle, setPageTitle] = useState("useEffect Examples");

  // Example 1: Runs on every render
  useEffect(() => {
    console.log("Effect ran - this happens on every render");
  });

  // Example 2: Runs once on mount
  useEffect(() => {
    console.log("Component mounted!");
    setMounted(true);
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  // Example 3: Runs when count changes
  useEffect(() => {
    setEffectLog((prev) => [
      ...prev,
      { count, timestamp: new Date().toLocaleTimeString() },
    ]);
  }, [count]);

  // Example 4: Timer with cleanup
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  // Example 5: Update document title
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const resetTimer = () => {
    setTimerActive(false);
    setTimerSeconds(0);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme.isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-2">⚙️ useEffect Hook Examples</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Example 1: Run on every render */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example 1: Every Render</h2>
            <p className="opacity-75 mb-4">No dependency array = runs after every render</p>
            <p className="text-xl font-bold mb-4">Render count: {renderCount}</p>
            <button
              onClick={() => setRenderCount(renderCount + 1)}
              className="w-full btn-primary"
            >
              Trigger Re-render
            </button>
            <p className="text-sm opacity-75 mt-4">
              Check console - effect runs every time you click
            </p>
          </div>

          {/* Example 2: Run once */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example 2: Mount Only</h2>
            <p className="opacity-75 mb-4">Empty dependency array [] = runs only on mount</p>
            <p className="text-xl font-bold">
              {mounted ? "✅ Component mounted!" : "⏳ Loading..."}
            </p>
            <p className="text-sm opacity-75 mt-4">
              Check console - effect runs once when component loads
            </p>
          </div>

          {/* Example 3: Dependency array */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example 3: Dependency Array</h2>
            <p className="opacity-75 mb-4">Runs when dependencies change</p>
            <div className="flex items-center justify-center gap-4 my-6">
              <button onClick={() => setCount(count - 1)} className="btn-primary">
                ➖
              </button>
              <span className="text-4xl font-bold min-w-24 text-center">{count}</span>
              <button onClick={() => setCount(count + 1)} className="btn-primary">
                ➕
              </button>
            </div>
            <div className={`p-4 rounded-lg ${
              theme.isDark ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <h4 className="font-bold mb-2">Effect Log:</h4>
              {effectLog.length > 0 ? (
                <ul className="text-sm space-y-1">
                  {effectLog.slice(-5).map((entry, idx) => (
                    <li key={idx} className="font-mono">
                      Count: {entry.count} at {entry.timestamp}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">Change count to see effect log</p>
              )}
            </div>
          </div>

          {/* Example 4: Cleanup function */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example 4: Cleanup Function</h2>
            <p className="opacity-75 mb-4">Return function to clean up subscriptions</p>
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">{timerSeconds}s</div>
              <button
                onClick={() => setTimerActive(!timerActive)}
                className={`w-full py-2 rounded-lg font-semibold text-white mb-2 transition-all ${
                  timerActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {timerActive ? "Stop" : "Start"} Timer
              </button>
              <button
                onClick={resetTimer}
                className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Example 5: Document title */}
          <div className={`border-2 rounded-lg p-6 md:col-span-2 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example 5: Update Document Title</h2>
            <p className="opacity-75 mb-4">Effects can update document title and other side effects</p>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="Enter page title"
              className="input-field mb-4"
            />
            <p className="text-sm opacity-75">
              Current title: <strong>{pageTitle}</strong> (check browser tab)
            </p>
          </div>
        </div>

        {/* Learning Tips */}
        <div className={`border-l-4 border-primary p-8 rounded-lg ${
          theme.isDark ? "bg-gray-800" : "bg-blue-50"
        }`}>
          <h3 className="text-2xl font-bold mb-4">📚 Key Concepts</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>useEffect(fn) - runs after every render</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>useEffect(fn, []) - runs once on mount</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>useEffect(fn, [deps]) - runs when dependencies change</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Return function for cleanup (subscriptions, timers)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Effects run AFTER render completes</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
