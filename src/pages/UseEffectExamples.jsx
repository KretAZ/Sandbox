import { useState, useEffect } from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";

export function UseEffectExamples() {
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
    <PageLayout title="⚙️ useEffect Hook Examples">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Example 1: Run on every render */}
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">Example 1: Every Render</h2>
          <p className="opacity-75 mb-4">No dependency array = runs after every render</p>
          <p className="text-xl font-bold mb-4">Render count: {renderCount}</p>
          <GlassButton
            onClick={() => setRenderCount(renderCount + 1)}
            variant="primary"
            className="w-full"
          >
            Trigger Re-render
          </GlassButton>
          <p className="text-sm opacity-75 mt-4">
            Check console - effect runs every time you click
          </p>
        </GlassCard>

        {/* Example 2: Run once */}
        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">Example 2: Mount Only</h2>
          <p className="opacity-75 mb-4">Empty dependency array [] = runs only on mount</p>
          <p className="text-xl font-bold">
            {mounted ? "✅ Component mounted!" : "⏳ Loading..."}
          </p>
          <p className="text-sm opacity-75 mt-4">
            Check console - effect runs once when component loads
          </p>
        </GlassCard>

        {/* Example 3: Dependency array */}
        <GlassCard animated delay={0.2}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            Example 3: Dependency Array
          </h2>
          <p className="opacity-75 mb-4">Runs when dependencies change</p>
          <div className="flex items-center justify-center gap-4 my-6">
            <GlassButton
              onClick={() => setCount(count - 1)}
              variant="secondary"
              size="sm"
            >
              ➖
            </GlassButton>
            <span className="text-4xl font-bold min-w-24 text-center text-primary">
              {count}
            </span>
            <GlassButton
              onClick={() => setCount(count + 1)}
              variant="secondary"
              size="sm"
            >
              ➕
            </GlassButton>
          </div>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
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
        </GlassCard>

        {/* Example 4: Cleanup function */}
        <GlassCard animated delay={0.3}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            Example 4: Cleanup Function
          </h2>
          <p className="opacity-75 mb-4">Return function to clean up subscriptions</p>
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-4">{timerSeconds}s</div>
            <GlassButton
              onClick={() => setTimerActive(!timerActive)}
              variant={timerActive ? "secondary" : "primary"}
              className="w-full mb-2"
            >
              {timerActive ? "Stop" : "Start"} Timer
            </GlassButton>
            <GlassButton
              onClick={resetTimer}
              variant="glass"
              className="w-full"
            >
              Reset
            </GlassButton>
          </div>
        </GlassCard>

        {/* Example 5: Document title */}
        <GlassCard animated delay={0.4} className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            Example 5: Update Document Title
          </h2>
          <p className="opacity-75 mb-4">
            Effects can update document title and other side effects
          </p>
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
        </GlassCard>
      </div>

      {/* Learning Tips */}
      <SectionContainer
        title="📚 Key Concepts"
        variant="gradient"
        delay={0.5}
      >
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>useEffect(fn) - runs after every render</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>useEffect(fn, []) - runs once on mount</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>useEffect(fn, [deps]) - runs when dependencies change</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Return function for cleanup (subscriptions, timers)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Effects run AFTER render completes</span>
          </li>
        </ul>
      </SectionContainer>
    </PageLayout>
  );
}
