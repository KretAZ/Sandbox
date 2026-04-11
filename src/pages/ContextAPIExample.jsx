import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";
import { getSnippetsForConcept } from "../data/snippets";

// Example child component that uses context
function ThemeDisplay() {
  const theme = useContext(ThemeContext);

  return (
    <GlassCard variant="light">
      <h4 className="font-bold mb-4 text-primary">Theme Display (Child Component)</h4>
      <p className="mb-2">Current theme: {theme.isDark ? "🌙 Dark" : "☀️ Light"}</p>
      <p className="mb-4">Primary color: {theme.colors.primary}</p>
      <GlassButton
        onClick={theme.toggleTheme}
        variant="primary"
        className="w-full"
      >
        Toggle Theme
      </GlassButton>
    </GlassCard>
  );
}

// Another child component
function ColorBox() {
  const theme = useContext(ThemeContext);

  return (
    <div
      className="rounded-lg p-6 text-white glass-card"
      style={{ backgroundColor: theme.colors.primary }}
    >
      <p className="mb-2">This box uses primary color from context</p>
      <p>Theme: {theme.isDark ? "Dark" : "Light"}</p>
    </div>
  );
}

export function ContextAPIExample() {
  const theme = useContext(ThemeContext);

  return (
    <PageLayout title="🌍 Context API">
      <div className="space-y-6 mb-12">
        <SectionContainer
          title="What is Context API?"
          variant="glass"
          delay={0}
        >
          <p className="opacity-75 mb-4">
            Context provides a way to pass data through the component tree without having
            to pass props down manually at every level
          </p>
          <div className="space-y-4">
            <GlassCard variant="light">
              <p className="font-bold mb-2">❌ Without Context (Props Drilling):</p>
              <div className="font-mono text-sm opacity-75 ml-4">
                App → Provider → Page → Layout → Component → Button
                <br />
                (theme prop passed through every level)
              </div>
            </GlassCard>
            <GlassCard variant="light">
              <p className="font-bold mb-2">✅ With Context:</p>
              <div className="font-mono text-sm opacity-75 ml-4">
                App (Provider) → ...any component can useContext(ThemeContext)
                <br />
                (theme directly accessible where needed)
              </div>
            </GlassCard>
          </div>
        </SectionContainer>

        <SectionContainer
          title="Live Example: Theme Context"
          variant="glass"
          delay={0.1}
        >
          <p className="opacity-75 mb-6">
            Multiple components using the same context. Click buttons to toggle theme
          </p>
          <div className="space-y-4">
            <ThemeDisplay />
            <ColorBox />
          </div>
          <p className="text-sm opacity-75 mt-6">
            ✨ Both components react to theme changes automatically, no prop drilling needed!
          </p>
        </SectionContainer>

        <SectionContainer
          title="How Context Works"
          variant="glass"
          delay={0.2}
        >
          <ol className="space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="font-bold text-primary min-w-6">1.</span>
              <span>
                <strong>Create Context:</strong> const ThemeContext = createContext()
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary min-w-6">2.</span>
              <span>
                <strong>Create Provider:</strong> Wraps components and provides value
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary min-w-6">3.</span>
              <span>
                <strong>Wrap components:</strong> &lt;ThemeProvider&gt;...&lt;/ThemeProvider&gt;
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary min-w-6">4.</span>
              <span>
                <strong>Use in components:</strong> const theme = useContext(ThemeContext)
              </span>
            </li>
          </ol>
          <pre className="p-4 rounded-lg overflow-x-auto font-mono text-sm bg-gray-900 text-gray-100">
            {`// 1. Create context
const ThemeContext = createContext();

// 2. Create provider
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ isDark, ... }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Use in App.jsx
<ThemeProvider>
  <App />
</ThemeProvider>

// 4. Use in any child component
const theme = useContext(ThemeContext);`}
          </pre>
        </SectionContainer>

        <SectionContainer
          title="When to Use Context"
          variant="glass"
          delay={0.3}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard variant="light" className="border-2 border-green-500/40">
              <h4 className="font-bold mb-2 text-green-600">✅ Good Use Cases</h4>
              <ul className="space-y-1 text-sm">
                <li>• Theme (dark/light mode)</li>
                <li>• User authentication state</li>
                <li>• Language/localization</li>
                <li>• UI state (modals, notifications)</li>
                <li>• Avoiding prop drilling</li>
              </ul>
            </GlassCard>
            <GlassCard variant="light" className="border-2 border-yellow-500/40">
              <h4 className="font-bold mb-2 text-yellow-600">⚠️ When to Consider Alternatives</h4>
              <ul className="space-y-1 text-sm">
                <li>• Frequently changing data (use state management library)</li>
                <li>• Complex state logic (Redux, Zustand)</li>
                <li>• Very large applications (consider Context + useReducer)</li>
              </ul>
            </GlassCard>
          </div>
        </SectionContainer>

        <SectionContainer
          title="Context Best Practices"
          variant="glass"
          delay={0.4}
        >
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-primary font-bold min-w-6">→</span>
              <span>Create separate contexts for different concerns</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold min-w-6">→</span>
              <span>Use custom hooks to access context: useTheme()</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold min-w-6">→</span>
              <span>Memoize context value to prevent unnecessary re-renders</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold min-w-6">→</span>
              <span>Split Provider and Consumer logic</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold min-w-6">→</span>
              <span>Don't put too much in context (component gets slow)</span>
            </li>
          </ul>
        </SectionContainer>
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
            <span>createContext() creates a context object</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Provider component shares value with all descendants</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>useContext() hook accesses context value</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Components re-render when context value changes</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Avoids prop drilling through intermediate components</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Perfect for global state like theme, auth, language</span>
          </li>
        </ul>
      </SectionContainer>

      {/* Code Snippets */}
      <SectionContainer title="💻 Try It Out" variant="glass" delay={0.6}>
        <div className="space-y-6">
          {getSnippetsForConcept("context").map((snippet, index) => (
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
