import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";

export function ZustandExample() {
  return (
    <PageLayout title="🐻 Zustand State Management">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            What is Zustand?
          </h2>
          <p className="opacity-75 mb-4">
            Zustand is a lightweight state management library. Simple, unopinionated,
            with less boilerplate than Redux.
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-sm space-y-2">
            <p><strong>Smallest Bundle Size:</strong> ~2KB gzipped</p>
            <p><strong>Philosophy:</strong> Keep it simple, minimal API</p>
            <p><strong>Perfect For:</strong> Mid-size apps, drop-in replacement for Redux</p>
          </div>
        </GlassCard>

        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            Zustand Advantages
          </h2>
          <ul className="text-sm space-y-2">
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>No Provider needed (optional)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Less boilerplate than Redux</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Use outside React components</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Excellent TypeScript support</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>DevTools available (optional)</span>
            </li>
          </ul>
        </GlassCard>

        <GlassCard animated delay={0.2} className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gradient">
            Quick Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-2">Aspect</th>
                  <th className="text-left p-2">Redux</th>
                  <th className="text-left p-2">Zustand</th>
                </tr>
              </thead>
              <tbody className="text-xs opacity-75">
                <tr className="border-b border-white/10">
                  <td className="p-2">Setup</td>
                  <td className="p-2">Complex, lots of files</td>
                  <td className="p-2">One function call</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2">Bundle Size</td>
                  <td className="p-2">~8KB</td>
                  <td className="p-2">~2KB</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2">Boilerplate</td>
                  <td className="p-2">High (actions, types, reducers)</td>
                  <td className="p-2">Minimal</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2">Learning Curve</td>
                  <td className="p-2">Steep</td>
                  <td className="p-2">Shallow</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2">DevTools</td>
                  <td className="p-2">Built-in (amazing)</td>
                  <td className="p-2">Optional middleware</td>
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
            <span>create() function to define store with state and actions</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Use hook to access state: const state = useStore()</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>State and actions in same object</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Works without Provider (useStore can be called anywhere)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Automatic re-renders on subscribed state changes</span>
          </li>
        </ul>
      </SectionContainer>

      <SectionContainer title="💻 Code Patterns" variant="glass" delay={0.4}>
        <div className="space-y-6">
          <CodeSnippetCard
            title="Zustand Basics"
            description="Simple store creation and usage"
            initialCode={`import create from 'zustand';

// Create store with state and actions
const useStore = create(set => ({
  // State
  count: 0,

  // Actions
  increment: () => set(state => ({
    count: state.count + 1
  })),

  decrement: () => set(state => ({
    count: state.count - 1
  })),

  reset: () => set({ count: 0 })
}));

// Use in component
function Counter() {
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}`}
            animated={false}
          />

          <CodeSnippetCard
            title="Advanced: Selectors & Middleware"
            description="Optimization and persistence patterns"
            initialCode={`import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useStore = create(
  persist(
    devtools(set => ({
      user: null,
      isLoading: false,

      setUser: (user) => set({ user }),

      fetchUser: async (id) => {
        set({ isLoading: true });
        const user = await api.getUser(id);
        set({ user, isLoading: false });
      }
    }))
  ),
  { name: 'user-storage' } // localStorage persist
);

// Selector memoization for performance
const selectUser = (state) => state.user;
const user = useStore(selectUser);`}
            animated={false}
          />
        </div>
      </SectionContainer>

      <SectionContainer title="🎯 When to Use Zustand" variant="glass" delay={0.5}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-400 mb-2">✓ Perfect For:</h4>
            <ul className="text-sm space-y-1 opacity-75">
              <li>• Mid-size to large applications</li>
              <li>• Teams wanting less boilerplate</li>
              <li>• Need shared state without Provider</li>
              <li>• Want fast learning curve</li>
              <li>• Bundle size is critical</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400 mb-2">Consider Alternatives:</h4>
            <ul className="text-sm space-y-1 opacity-75">
              <li>• Simple state → use useState</li>
              <li>• Simple global → use Context API</li>
              <li>• Need time-travel debugging → Redux</li>
              <li>• Building library → Jotai/Recoil</li>
              <li>• Mobile app → simpler is better</li>
            </ul>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
