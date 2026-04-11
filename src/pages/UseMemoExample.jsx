import { useState, useMemo } from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";

export function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // Expensive calculation
  const expensiveSum = useMemo(() => {
    console.log("Computing expensive sum...");
    let sum = 0;
    for (let i = 0; i < count * 1000000; i++) {
      sum += i;
    }
    return sum;
  }, [count]);

  return (
    <PageLayout title="⚡ useMemo Hook">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Example 1: What is useMemo */}
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            What is useMemo?
          </h2>
          <p className="opacity-75 mb-4">
            useMemo memoizes a computed value, recalculating only when dependencies change.
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-sm space-y-2">
            <p>
              <strong>Without useMemo:</strong> Expensive calculation runs on every render
            </p>
            <p>
              <strong>With useMemo:</strong> Calculation runs only when dependencies change
            </p>
            <p className="mt-3 text-xs opacity-75">
              Returns the memoized value, not a function like useCallback
            </p>
          </div>
        </GlassCard>

        {/* Example 2: When to Use */}
        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            When to Use useMemo
          </h2>
          <p className="opacity-75 mb-4">useMemo helps when:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Expensive calculations on every render</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Complex object creation repeated</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Value passed to memoized child component</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Dependency in useEffect or useCallback</span>
            </li>
          </ul>
        </GlassCard>

        {/* Example 3: Demo */}
        <GlassCard animated delay={0.2} className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gradient">
            Performance Demo
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="mb-2">
                Count: <strong className="text-primary text-lg">{count}</strong>
              </p>
              <p className="text-sm opacity-75 mb-4">
                Memoized result: <strong>{expensiveSum.toLocaleString()}</strong>
              </p>
              <div className="flex gap-2 mb-4">
                <GlassButton
                  onClick={() => setCount(count + 1)}
                  variant="primary"
                  className="flex-1"
                >
                  Increment (Recalculate)
                </GlassButton>
                <GlassButton
                  onClick={() => setRenderCount(renderCount + 1)}
                  variant="secondary"
                  className="flex-1"
                >
                  Re-render (No Recalculation)
                </GlassButton>
              </div>
              <p className="text-xs opacity-50">
                Watch console - calculation only happens when count changes
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Key Concepts */}
      <SectionContainer
        title="📚 Key Concepts"
        variant="gradient"
        delay={0.3}
      >
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>useMemo returns memoized computed value</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Recalculation skipped if dependencies unchanged</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Memoization has overhead - only use for expensive calcs</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Syntax: useMemo with dependencies array</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>vs useCallback: useMemo returns value, useCallback returns function</span>
          </li>
        </ul>
      </SectionContainer>

      {/* Code Examples */}
      <SectionContainer title="💻 Code Patterns" variant="glass" delay={0.4}>
        <div className="space-y-6">
          <CodeSnippetCard
            title="useMemo Basic Pattern"
            description="Memoizing expensive calculations"
            initialCode={`// Expensive calculation
function Stats({ data }) {
  // Without useMemo - recalculates on every render
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const average = total / data.length;

  return <div>Average: {average}</div>;
}

// With useMemo - recalculates only when data changes
function StatsOptimized({ data }) {
  const average = React.useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return total / data.length;
  }, [data]); // Recalculate only when data changes

  return <div>Average: {average}</div>;
}`}
            animated={false}
          />

          <CodeSnippetCard
            title="Memoizing Objects/Arrays"
            description="Prevent unnecessary object recreation"
            initialCode={`// Without useMemo - new object every render
function Parent({ id }) {
  const userFilter = { isActive: true, departmentId: id };

  // New object reference every render!
  return <UserList filter={userFilter} />;
}

// With useMemo - same object if dependencies unchanged
function ParentOptimized({ id }) {
  const userFilter = React.useMemo(() => ({
    isActive: true,
    departmentId: id
  }), [id]);

  // Same object reference unless id changes
  return <UserList filter={userFilter} />;
}`}
            animated={false}
          />
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
