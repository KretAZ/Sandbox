import { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";
import { getSnippetsForConcept } from "../data/snippets";

// Child component - receives props from parent
function Counter({ count, onIncrement, onDecrement, onReset }) {
  return (
    <GlassCard variant="light">
      <h4 className="font-bold text-primary mb-2">Counter Component (Child)</h4>
      <p className="text-lg font-bold my-2">Count: {count}</p>
      <div className="flex gap-2">
        <GlassButton onClick={onIncrement} variant="primary" className="flex-1">
          +
        </GlassButton>
        <GlassButton onClick={onDecrement} variant="primary" className="flex-1">
          -
        </GlassButton>
        <GlassButton onClick={onReset} variant="secondary" className="flex-1">
          Reset
        </GlassButton>
      </div>
    </GlassCard>
  );
}

// Another child component
function Display({ count, name }) {
  return (
    <GlassCard variant="light">
      <h4 className="font-bold text-primary mb-2">Display Component (Child)</h4>
      <p className="text-lg my-2">
        {name}, your count is: <strong className="text-primary">{count}</strong>
      </p>
    </GlassCard>
  );
}

// Parent component - manages state and passes to children
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("User");

  return (
    <GlassCard variant="card" className="border-2 border-primary/40 p-6">
      <h3 className="text-xl font-bold mb-4 text-gradient">Parent Component (State Owner)</h3>
      <div className="p-4 rounded-lg bg-primary/10 mb-6 border border-primary/20">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="input-field mb-2"
        />
        <p>Current Count: <strong className="text-primary">{count}</strong></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Counter
          count={count}
          onIncrement={() => setCount(count + 1)}
          onDecrement={() => setCount(count - 1)}
          onReset={() => setCount(0)}
        />
        <Display count={count} name={name} />
      </div>

      <p className="text-sm opacity-75 mt-4">
        ⬆️ Data flows DOWN (props), events flow UP (callbacks)
      </p>
    </GlassCard>
  );
}

export function PropsStateManagement() {
  return (
    <PageLayout title="📤 Props & State Management">
      <div className="space-y-6 mb-12">
        <SectionContainer
          title="Example: Parent-Child Communication"
          variant="glass"
          delay={0}
        >
          <p className="opacity-75 mb-4">
            Data flows down as props, events flow up through callbacks
          </p>
          <ParentComponent />
        </SectionContainer>

        <SectionContainer
          title="Concept: Lifting State Up"
          variant="glass"
          delay={0.1}
        >
          <p className="opacity-75 mb-4">
            When multiple components need to share state, move state to their common parent
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="text-center mb-4">
              <div className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-bold mb-3">
                Parent (State)
              </div>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="px-4 py-2 bg-secondary text-white rounded-lg font-bold">
                Child 1
              </div>
              <div className="px-4 py-2 bg-secondary text-white rounded-lg font-bold">
                Child 2
              </div>
              <div className="px-4 py-2 bg-secondary text-white rounded-lg font-bold">
                Child 3
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-75">
            All children can access and modify state through props and callbacks
          </p>
        </SectionContainer>

        <SectionContainer
          title="Concept: Props Drilling"
          variant="glass"
          delay={0.2}
        >
          <p className="opacity-75 mb-4">Passing props through many levels can become cumbersome</p>
          <div className="p-4 rounded-lg space-y-2 font-mono text-sm bg-primary/10 border border-primary/20">
            <div>Level 1 (has state) → passes prop</div>
            <div className="ml-4">Level 2 (doesn't use) → passes prop</div>
            <div className="ml-8">Level 3 (doesn't use) → passes prop</div>
            <div className="ml-12">Level 4 (uses prop) ✓</div>
          </div>
          <p className="mt-4 text-sm opacity-75">
            💡 <strong>Solution:</strong> Use Context API for deeply nested components
          </p>
        </SectionContainer>
      </div>

      {/* Learning Tips */}
      <SectionContainer
        title="📚 Key Concepts"
        variant="gradient"
        delay={0.3}
      >
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Props flow DOWN from parent to child (read-only)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Events/callbacks flow UP from child to parent</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Lift state to common parent when multiple children need it</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Props drilling: passing props through unrelated components</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Context API solves deep prop drilling problems</span>
          </li>
        </ul>
      </SectionContainer>

      {/* Code Snippets */}
      <SectionContainer title="💻 Try It Out" variant="glass" delay={0.4}>
        <div className="space-y-6">
          {getSnippetsForConcept("props").map((snippet, index) => (
            <CodeSnippetCard
              key={snippet.id}
              title={snippet.title}
              description={snippet.description}
              initialCode={snippet.code}
              animated
              delay={0.05 * index}
            />
          ))}
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
