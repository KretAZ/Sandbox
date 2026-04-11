import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// Example child component that uses context
function ThemeDisplay() {
  const theme = useContext(ThemeContext);

  return (
    <div className={`border-2 border-primary rounded-lg p-6 ${
      theme.isDark ? "bg-gray-700" : "bg-blue-50"
    }`}>
      <h4 className="font-bold mb-4">Theme Display (Child Component)</h4>
      <p className="mb-2">Current theme: {theme.isDark ? "🌙 Dark" : "☀️ Light"}</p>
      <p className="mb-4">Primary color: {theme.colors.primary}</p>
      <button onClick={theme.toggleTheme} className="w-full btn-primary">
        Toggle Theme
      </button>
    </div>
  );
}

// Another child component
function ColorBox() {
  const theme = useContext(ThemeContext);

  return (
    <div
      className="rounded-lg p-6 text-white"
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
    <div className={`w-full min-h-screen transition-colors duration-300 ${
      theme.isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '72rem', width: '100%', padding: '3rem 1rem' }}>
        <h1 className="text-5xl font-bold mb-2">🌍 Context API</h1>

        <div className="space-y-6 mb-12">
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">What is Context API?</h2>
            <p className="opacity-75 mb-4">
              Context provides a way to pass data through the component tree without having
              to pass props down manually at every level
            </p>
            <div className={`p-4 rounded-lg space-y-4 ${
              theme.isDark ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <div>
                <p className="font-bold mb-2">❌ Without Context (Props Drilling):</p>
                <div className="font-mono text-sm opacity-75 ml-4">
                  App → Provider → Page → Layout → Component → Button
                  <br />
                  (theme prop passed through every level)
                </div>
              </div>
              <div>
                <p className="font-bold mb-2">✅ With Context:</p>
                <div className="font-mono text-sm opacity-75 ml-4">
                  App (Provider) → ...any component can useContext(ThemeContext)
                  <br />
                  (theme directly accessible where needed)
                </div>
              </div>
            </div>
          </div>

          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-4">Live Example: Theme Context</h2>
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
          </div>

          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-4">How Context Works</h2>
            <ol className="space-y-3 mb-6">
              <li className="flex gap-3">
                <span className="font-bold text-primary">1.</span>
                <span><strong>Create Context:</strong> const ThemeContext = createContext()</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">2.</span>
                <span><strong>Create Provider:</strong> Wraps components and provides value</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">3.</span>
                <span><strong>Wrap components:</strong> &lt;ThemeProvider&gt;...&lt;/ThemeProvider&gt;</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">4.</span>
                <span><strong>Use in components:</strong> const theme = useContext(ThemeContext)</span>
              </li>
            </ol>
            <pre className={`p-4 rounded-lg overflow-x-auto font-mono text-sm ${
              theme.isDark ? "bg-gray-900" : "bg-gray-900 text-gray-100"
            }`}>
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
          </div>

          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-4">When to Use Context</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
                theme.isDark ? "bg-gray-700" : "bg-green-50"
              }`}>
                <h4 className="font-bold mb-2 text-green-600">✅ Good Use Cases</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Theme (dark/light mode)</li>
                  <li>• User authentication state</li>
                  <li>• Language/localization</li>
                  <li>• UI state (modals, notifications)</li>
                  <li>• Avoiding prop drilling</li>
                </ul>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${
                theme.isDark ? "bg-gray-700" : "bg-yellow-50"
              }`}>
                <h4 className="font-bold mb-2 text-yellow-600">⚠️ When to Consider Alternatives</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Frequently changing data (use state management library)</li>
                  <li>• Complex state logic (Redux, Zustand)</li>
                  <li>• Very large applications (consider Context + useReducer)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-4">Context Best Practices</h2>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Create separate contexts for different concerns</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Use custom hooks to access context: useTheme()</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Memoize context value to prevent unnecessary re-renders</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Split Provider and Consumer logic</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Don't put too much in context (component gets slow)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Tips */}
        <div className={`border-l-4 border-primary p-8 rounded-lg ${
          theme.isDark ? "bg-gray-800" : "bg-blue-50"
        }`}>
          <h3 className="text-2xl font-bold mb-4">📚 Key Concepts</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>createContext() creates a context object</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Provider component shares value with all descendants</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>useContext() hook accesses context value</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Components re-render when context value changes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Avoids prop drilling through intermediate components</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Perfect for global state like theme, auth, language</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
