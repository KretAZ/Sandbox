import { useState, useCallback } from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";

export function UseCallbackExample() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // Without useCallback - new function on every render
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  // With useCallback - same function reference
  const memoizedHandleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <PageLayout title="📌 useCallback Hook">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Example 1: Basic useCallback */}
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            What is useCallback?
          </h2>
          <p className="opacity-75 mb-4">
            useCallback memoizes a function, returning the same function reference
            on re-renders (unless dependencies change).
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-sm space-y-2">
            <p>
              <strong>Without useCallback:</strong> New function object created every render
            </p>
            <p>
              <strong>With useCallback:</strong> Same function reference (if deps unchanged)
            </p>
            <p className="mt-3 text-xs opacity-75">
              Useful when passing callbacks to memoized child components
            </p>
          </div>
        </GlassCard>

        {/* Example 2: Performance Impact */}
        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            When to Use useCallback
          </h2>
          <p className="opacity-75 mb-4">useCallback helps when:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>
                Passing callback to memoized child (React.memo)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>
                Callback is dependency in useEffect
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>
                Function is used in useMemo dependency
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>
                Performance optimization for complex operations
              </span>
            </li>
          </ul>
        </GlassCard>

        {/* Example 3: Demo */}
        <GlassCard animated delay={0.2} className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gradient">Live Example</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="mb-4">Count: <strong className="text-primary text-lg">{count}</strong></p>
              <p className="text-sm opacity-75 mb-4">
                Component re-renders: <strong>{renderCount}</strong>
              </p>
              <div className="flex gap-2">
                <GlassButton
                  onClick={() => {
                    handleIncrement();
                    setRenderCount((p) => p + 1);
                  }}
                  variant="primary"
                >
                  Increment (Regular)
                </GlassButton>
                <GlassButton
                  onClick={() => {
                    memoizedHandleIncrement();
                    setRenderCount((p) => p + 1);
                  }}
                  variant="secondary"
                >
                  Increment (useCallback)
                </GlassButton>
              </div>
              <p className="text-xs opacity-50 mt-4">
                Both work the same. useCallback prevents unnecessary re-renders of child components
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
            <span>useCallback returns memoized function</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Function reference stays same if dependencies don't change</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Prevents unnecessary child re-renders (with React.memo)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Don't overuse - adds complexity for minimal gains</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Dependency array: change function if dependencies change</span>
          </li>
        </ul>
      </SectionContainer>

      {/* Code Examples */}
      <SectionContainer title="💻 Code Patterns" variant="glass" delay={0.4}>
        <div className="space-y-6">
          <CodeSnippetCard
            title="useCallback Pattern"
            description="Creating memoized callbacks efficiently"
            initialCode={`// Without useCallback - creates new function on every render
function Parent() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => console.log('Clicked');

  // Child gets new function reference every time!
  return <Child onClick={handleClick} />;
}

// With useCallback - same function reference
function ParentOptimized() {
  const [count, setCount] = React.useState(0);

  const handleClick = React.useCallback(() => {
    console.log('Clicked');
  }, []); // Empty array = never changes

  // Child gets same function reference
  return <Child onClick={handleClick} />;
}`}
            animated={false}
          />

          <CodeSnippetCard
            title="With Dependencies"
            description="useCallback dependencies for dynamic callbacks"
            initialCode={`function Parent({ userId }) {
  const [count, setCount] = React.useState(0);

  // Function changes when userId changes
  const fetchUser = React.useCallback(() => {
    console.log('Fetching user:', userId);
  }, [userId]); // userId is dependency

  // When userId changes:
  // 1. fetchUser gets new reference
  // 2. Child components re-render (if using function)
  // 3. useEffect runs again

  return (
    <div>
      <UserFetcher onFetch={fetchUser} />
    </div>
  );
}`}
            animated={false}
          />
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
