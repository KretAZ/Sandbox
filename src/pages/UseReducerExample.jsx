import { useReducer } from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

export function UseReducerExample() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <PageLayout title="🔄 useReducer Hook">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">What is useReducer?</h2>
          <p className="opacity-75 mb-4">
            useReducer manages complex state logic with a reducer function, similar to Redux.
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-sm space-y-2">
            <p><strong>When to use:</strong> Complex state with multiple sub-values</p>
            <p><strong>vs useState:</strong> Better for interdependent state changes</p>
          </div>
        </GlassCard>

        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">Structure</h2>
          <pre className="text-xs overflow-x-auto bg-gray-900 p-3 rounded font-mono">
{`const [state, dispatch] = useReducer(
  reducer,
  initialState
);

dispatch({ type, payload });`}
          </pre>
        </GlassCard>

        <GlassCard animated delay={0.2} className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gradient">Live Demo</h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-2xl font-bold text-primary mb-4">Count: {state.count}</p>
            <div className="flex gap-2 flex-wrap">
              <GlassButton
                onClick={() => dispatch({ type: "INCREMENT" })}
                variant="primary"
              >
                +1
              </GlassButton>
              <GlassButton
                onClick={() => dispatch({ type: "DECREMENT" })}
                variant="secondary"
              >
                -1
              </GlassButton>
              <GlassButton
                onClick={() => dispatch({ type: "RESET" })}
                variant="glass"
              >
                Reset
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </div>

      <SectionContainer title="📚 Key Concepts" variant="gradient" delay={0.3}>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>useReducer(reducer, initialState) for complex state</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Reducer: (state, action) => newState function</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>dispatch({ type, payload }) to trigger state change</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Better than useState for multiple related state values</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Foundation for Redux patterns in large apps</span>
          </li>
        </ul>
      </SectionContainer>

      <SectionContainer title="💻 Code Pattern" variant="glass" delay={0.4}>
        <CodeSnippetCard
          title="useReducer Pattern"
          description="Complex state management with reducer"
          initialCode={`function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(
    counterReducer,
    { count: 0 }
  );

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>
    </div>
  );
}`}
          animated={false}
        />
      </SectionContainer>
    </PageLayout>
  );
}
