import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";

export function ReduxExample() {
  return (
    <PageLayout title="🔴 Redux Pattern">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            What is Redux?
          </h2>
          <p className="opacity-75 mb-4">
            Redux is a predictable state management library following Flux pattern.
            Centralizes app state and updates through actions and reducers.
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-sm space-y-2">
            <p><strong>Core Concepts:</strong> Store, Actions, Reducers, Dispatch</p>
            <p><strong>Use When:</strong> Complex state, multiple components need same data</p>
          </div>
        </GlassCard>

        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            Redux Flow
          </h2>
          <div className="text-sm space-y-2 font-mono">
            <div className="p-2 bg-white/5 rounded">
              <strong>1. Action:</strong> {`{ type, payload }`}
            </div>
            <div className="p-2 bg-white/5 rounded">
              <strong>2. Dispatch:</strong> store.dispatch(action)
            </div>
            <div className="p-2 bg-white/5 rounded">
              <strong>3. Reducer:</strong> (state, action) =&gt; newState
            </div>
            <div className="p-2 bg-white/5 rounded">
              <strong>4. Store:</strong> Holds new state
            </div>
          </div>
        </GlassCard>

        <GlassCard animated delay={0.2} className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gradient">
            Comparison with Context API
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">Context API</th>
                  <th className="text-left p-2">Redux</th>
                </tr>
              </thead>
              <tbody className="text-xs opacity-75">
                <tr className="border-b border-white/10">
                  <td className="p-2">Setup</td>
                  <td className="p-2">Simple</td>
                  <td className="p-2">Complex (more boilerplate)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2">Performance</td>
                  <td className="p-2">Good for simple state</td>
                  <td className="p-2">Excellent (selectors)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2">DevTools</td>
                  <td className="p-2">None</td>
                  <td className="p-2">Time-travel debugging</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2">Best For</td>
                  <td className="p-2">Small to medium apps</td>
                  <td className="p-2">Large, complex apps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      <SectionContainer title="📚 Key Concepts" variant="gradient" delay={0.3}>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Store holds all app state in single object</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Actions describe what happened: {`{ type: "COUNTER_INCREMENT" }`}</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Reducers specify how state changes: (state, action) =&gt; newState</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Dispatch actions to trigger state updates</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Redux DevTools for debugging state changes</span>
          </li>
        </ul>
      </SectionContainer>

      <SectionContainer title="💻 Code Pattern" variant="glass" delay={0.4}>
        <div className="space-y-6">
          <CodeSnippetCard
            title="Redux Architecture"
            description="Store, Actions, Reducers pattern"
            initialCode={`// 1. Action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// 2. Actions
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// 3. Reducer
function counterReducer(state = 0, action) {
  switch(action.type) {
    case INCREMENT: return state + 1;
    case DECREMENT: return state - 1;
    default: return state;
  }
}

// 4. Store (simplified)
class Store {
  constructor(reducer, initialState) {
    this.state = initialState;
    this.reducer = reducer;
    this.listeners = [];
  }

  getState() { return this.state; }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(l => l());
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }
}

// 5. Usage
const store = new Store(counterReducer, 0);
store.subscribe(() => console.log(store.getState()));
store.dispatch(increment()); // 1
store.dispatch(increment()); // 2`}
            animated={false}
          />

          <CodeSnippetCard
            title="React-Redux Integration"
            description="Connect React components to Redux store"
            initialCode={`import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';

// Component
function Counter() {
  const count = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>
        +
      </button>
    </div>
  );
}

// App
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}`}
            animated={false}
          />
        </div>
      </SectionContainer>

      <SectionContainer title="📖 When to Use Redux" variant="glass" delay={0.5}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-400 mb-2">✓ Use Redux For:</h4>
            <ul className="text-sm space-y-1 opacity-75">
              <li>• Large applications with complex state</li>
              <li>• State shared across many components</li>
              <li>• Need for time-travel debugging</li>
              <li>• Team wants strict state management</li>
              <li>• Complex undo/redo functionality</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-400 mb-2">⚠️ Consider Alternatives:</h4>
            <ul className="text-sm space-y-1 opacity-75">
              <li>• Small projects (use useState)</li>
              <li>• Simple global state (use Context)</li>
              <li>• Simpler alternative (Zustand/Recoil)</li>
              <li>• Want less boilerplate</li>
              <li>• Building smaller component libraries</li>
            </ul>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
