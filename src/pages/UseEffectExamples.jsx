import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/pages.css";

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
    <div
      className="page-container"
      style={{
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
      }}
    >
      <h1>⚙️ useEffect Hook Examples</h1>

      <div className="examples-section">
        {/* Example 1: Run on every render */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example 1: Effect on Every Render</h2>
          <p>No dependency array = runs after every render</p>
          <p>Render count: {renderCount}</p>
          <button onClick={() => setRenderCount(renderCount + 1)}>
            Trigger Re-render
          </button>
          <p className="info-text">Check console - effect runs every time you click</p>
        </div>

        {/* Example 2: Run once */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example 2: Run Once on Mount</h2>
          <p>Empty dependency array [] = runs only on mount</p>
          <p>{mounted ? "✅ Component mounted!" : "⏳ Loading..."}</p>
          <p className="info-text">Check console - effect runs once when component loads</p>
        </div>

        {/* Example 3: Dependency array */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example 3: Dependency Array</h2>
          <p>Dependency array [count] = runs when count changes</p>
          <div className="counter-demo">
            <button onClick={() => setCount(count - 1)}>➖</button>
            <span className="count-display">{count}</span>
            <button onClick={() => setCount(count + 1)}>➕</button>
          </div>
          <div className="effect-log">
            <h4>Effect Log:</h4>
            {effectLog.length > 0 ? (
              <ul>
                {effectLog.slice(-5).map((entry, idx) => (
                  <li key={idx}>
                    Count: {entry.count} at {entry.timestamp}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Change count to see effect log</p>
            )}
          </div>
        </div>

        {/* Example 4: Cleanup function */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example 4: Cleanup Function</h2>
          <p>Return function to clean up subscriptions and timers</p>
          <div className="timer-demo">
            <div className="timer-display">{timerSeconds}s</div>
            <button
              onClick={() => setTimerActive(!timerActive)}
              className={timerActive ? "stop-btn" : "start-btn"}
            >
              {timerActive ? "Stop" : "Start"} Timer
            </button>
            <button onClick={resetTimer} className="reset-btn">
              Reset
            </button>
          </div>
          <p className="info-text">
            Cleanup function clears interval when timerActive becomes false
          </p>
        </div>

        {/* Example 5: Document title */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example 5: Update Document Title</h2>
          <p>Effects can update document title and other side effects</p>
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            placeholder="Enter page title"
            style={{
              color: theme.colors.text,
              backgroundColor: theme.isDark ? "#333" : "#f5f5f5",
              borderColor: theme.colors.border,
            }}
          />
          <p className="info-text">
            Current title: <strong>{pageTitle}</strong> (check browser tab)
          </p>
        </div>
      </div>

      <div className="learning-tips">
        <h3>📚 Key Concepts</h3>
        <ul>
          <li>useEffect(fn) - runs after every render</li>
          <li>useEffect(fn, []) - runs once on mount</li>
          <li>useEffect(fn, [deps]) - runs when dependencies change</li>
          <li>Return function for cleanup (subscriptions, timers)</li>
          <li>Effects run AFTER render completes (side effects)</li>
        </ul>
      </div>
    </div>
  );
}
