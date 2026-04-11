import { useState, useRef } from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";

export function UseRefExample() {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const countRef = useRef(0);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const incrementRef = () => {
    countRef.current += 1;
    console.log("Ref count (no re-render):", countRef.current);
  };

  return (
    <PageLayout title="📍 useRef Hook">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">What is useRef?</h2>
          <p className="opacity-75 mb-4">
            useRef creates a mutable reference that persists across renders without causing re-renders.
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-sm space-y-2">
            <p><strong>Key Point:</strong> Changing ref.current does NOT trigger re-render</p>
            <p><strong>Use Case:</strong> Accessing DOM directly, storing mutable values</p>
          </div>
        </GlassCard>

        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">useRef vs useState</h2>
          <div className="text-sm space-y-2">
            <div>
              <p className="font-semibold text-primary mb-1">useState:</p>
              <p className="opacity-75">Changes cause re-render</p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">useRef:</p>
              <p className="opacity-75">Changes don't cause re-render</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard animated delay={0.2} className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gradient">Live Examples</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Focus Input (DOM Access)</h4>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Click button to focus"
                  className="input-field flex-1"
                  defaultValue="Click button to focus me"
                />
                <GlassButton onClick={focusInput} variant="primary">
                  Focus
                </GlassButton>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Mutable Value (No Re-render)</h4>
              <div className="space-y-2">
                <p className="text-sm opacity-75">
                  Click button - ref increments but NO re-render occurs. Check console!
                </p>
                <GlassButton onClick={incrementRef} variant="secondary">
                  Increment Ref (No Re-render)
                </GlassButton>
                <GlassButton onClick={() => setCount(count + 1)} variant="primary">
                  Increment State (Re-renders)
                </GlassButton>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <SectionContainer title="📚 Key Concepts" variant="gradient" delay={0.3}>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>useRef stores value that persists across renders</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Changing ref.current does NOT trigger re-render</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Access DOM elements directly with ref attribute</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Use for: DOM access, timers, prev values, mutable counters</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Don't overuse - prefer state for most cases</span>
          </li>
        </ul>
      </SectionContainer>

      <SectionContainer title="💻 Common Patterns" variant="glass" delay={0.4}>
        <div className="space-y-6">
          <CodeSnippetCard
            title="DOM Focus Management"
            description="Accessing DOM elements with useRef"
            initialCode={`function SearchInput() {
  const inputRef = React.useRef(null);

  const handleSearch = () => {
    const value = inputRef.current.value;
    console.log('Searching:', value);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}`}
            animated={false}
          />

          <CodeSnippetCard
            title="Storing Previous Value"
            description="Track previous prop/state value"
            initialCode={`function Counter({ count }) {
  const prevCountRef = React.useRef();

  React.useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
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
