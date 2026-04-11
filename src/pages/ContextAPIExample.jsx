import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/pages.css";

// Example child component that uses context
function ThemeDisplay() {
  const theme = useContext(ThemeContext);

  return (
    <div
      className="theme-display"
      style={{
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
        border: `2px solid ${theme.colors.border}`,
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h4>Theme Display (Child Component)</h4>
      <p>Current theme: {theme.isDark ? "🌙 Dark" : "☀️ Light"}</p>
      <p>Primary color: {theme.colors.primary}</p>
      <button onClick={theme.toggleTheme}>Toggle Theme</button>
    </div>
  );
}

// Another child component
function ColorBox() {
  const theme = useContext(ThemeContext);

  return (
    <div
      className="color-box"
      style={{
        backgroundColor: theme.colors.primary,
        color: "white",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "10px",
      }}
    >
      <p>This box uses primary color from context</p>
      <p>Theme: {theme.isDark ? "Dark" : "Light"}</p>
    </div>
  );
}

export function ContextAPIExample() {
  const theme = useContext(ThemeContext);

  return (
    <div
      className="page-container"
      style={{
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
      }}
    >
      <h1>🌍 Context API</h1>

      <div className="examples-section">
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>What is Context API?</h2>
          <p>
            Context provides a way to pass data through the component tree
            without having to pass props down manually at every level
          </p>
          <div className="concept-visual">
            <p>
              <strong>Without Context (Props Drilling):</strong>
            </p>
            <div style={{ marginLeft: "20px", fontSize: "0.9em" }}>
              App → Provider → Page → Layout → Component → Button
              <br />
              (theme prop passed through every level)
            </div>
            <br />
            <p>
              <strong>With Context:</strong>
            </p>
            <div style={{ marginLeft: "20px", fontSize: "0.9em" }}>
              App (Provider) → ...any component can useContext(ThemeContext)
              <br />
              (theme directly accessible where needed)
            </div>
          </div>
        </div>

        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Live Example: Theme Context</h2>
          <p>
            Multiple components using the same context. Click buttons to toggle
            theme
          </p>
          <div className="context-examples">
            <ThemeDisplay />
            <ColorBox />
          </div>
          <p className="info-text">
            ✨ Both components react to theme changes automatically, no prop
            drilling needed!
          </p>
        </div>

        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>How Context Works</h2>
          <ol className="steps">
            <li>
              <strong>Create Context:</strong> const ThemeContext =
              createContext()
            </li>
            <li>
              <strong>Create Provider:</strong> Wraps components and provides
              value
            </li>
            <li>
              <strong>Wrap components:</strong>{" "}
              &lt;ThemeProvider&gt;...&lt;/ThemeProvider&gt;
            </li>
            <li>
              <strong>Use in components:</strong> const theme =
              useContext(ThemeContext)
            </li>
          </ol>
          <pre className="code-block">
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

        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>When to Use Context</h2>
          <div className="when-list">
            <div className="good">
              <h4>✅ Good Use Cases</h4>
              <ul>
                <li>Theme (dark/light mode)</li>
                <li>User authentication state</li>
                <li>Language/localization</li>
                <li>UI state (modals, notifications)</li>
                <li>Avoiding prop drilling</li>
              </ul>
            </div>
            <div className="caution">
              <h4>⚠️ When to Consider Alternatives</h4>
              <ul>
                <li>Frequently changing data (use state management library)</li>
                <li>Complex state logic (Redux, Zustand)</li>
                <li>Very large applications (consider Context + useReducer)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Context Best Practices</h2>
          <ul className="practices">
            <li>Create separate contexts for different concerns</li>
            <li>Use custom hooks to access context: useTheme()</li>
            <li>Memoize context value to prevent unnecessary re-renders</li>
            <li>Split Provider and Consumer logic</li>
            <li>Don't put too much in context (component gets slow)</li>
          </ul>
        </div>
      </div>

      <div className="learning-tips">
        <h3>📚 Key Concepts</h3>
        <ul>
          <li>createContext() creates a context object</li>
          <li>Provider component shares value with all descendants</li>
          <li>useContext() hook accesses context value</li>
          <li>Components re-render when context value changes</li>
          <li>Avoids prop drilling through intermediate components</li>
          <li>Perfect for global state like theme, auth, language</li>
        </ul>
      </div>
    </div>
  );
}
