import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useFormInput } from "../hooks/useFormInput";
import { useFetch } from "../hooks/useFetch";
import "../styles/pages.css";

export function CustomHooks() {
  const theme = useContext(ThemeContext);

  // Using custom hook useFormInput
  const [email, bindEmail, resetEmail] = useFormInput("");
  const [message, bindMessage, resetMessage] = useFormInput("");

  // Using custom hook useFetch
  const { data: user, loading: userLoading } = useFetch(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      resetEmail();
      resetMessage();
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div
      className="page-container"
      style={{
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
      }}
    >
      <h1>🪝 Custom Hooks</h1>

      <div className="examples-section">
        {/* Example 1: useFormInput */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example 1: useFormInput Hook</h2>
          <p>Reusable logic for form input state management</p>

          <div className="form-demo">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter email"
                {...bindEmail}
                style={{
                  color: theme.colors.text,
                  backgroundColor: theme.isDark ? "#333" : "#f5f5f5",
                  borderColor: theme.colors.border,
                }}
              />
            </div>

            <div className="form-group">
              <label>Message:</label>
              <textarea
                placeholder="Enter message"
                {...bindMessage}
                style={{
                  color: theme.colors.text,
                  backgroundColor: theme.isDark ? "#333" : "#f5f5f5",
                  borderColor: theme.colors.border,
                }}
              />
            </div>

            <button onClick={handleSubmit}>Submit</button>
            <button
              onClick={() => {
                resetEmail();
                resetMessage();
              }}
              className="reset-btn"
            >
              Clear
            </button>
          </div>

          {submitted && (
            <p className="success">
              ✅ Message sent! Email: {email}
            </p>
          )}

          <div className="info-text">
            <strong>Hook benefits:</strong>
            <ul>
              <li>DRY: Reuse form logic across components</li>
              <li>Clean: Spreads value and onChange as ...bind</li>
              <li>Reset: Built-in reset functionality</li>
            </ul>
          </div>
        </div>

        {/* Example 2: useFetch */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example 2: useFetch Hook</h2>
          <p>Reusable API data fetching with loading/error states</p>

          {userLoading ? (
            <p className="loading">⏳ Loading user data...</p>
          ) : user ? (
            <div className="user-info">
              <h4>{user.name}</h4>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Website:</strong> {user.website}
              </p>
            </div>
          ) : (
            <p className="error">Failed to load user data</p>
          )}

          <div className="info-text">
            <strong>Hook features:</strong>
            <ul>
              <li>Automatic loading state</li>
              <li>Error handling</li>
              <li>Cleanup to prevent memory leaks</li>
              <li>Dependency tracking for refetch</li>
            </ul>
          </div>
        </div>

        {/* How to Create Custom Hooks */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>How to Create Custom Hooks</h2>
          <p>Rules for creating custom hooks:</p>
          <div className="rules-list">
            <div className="rule">
              <h4>1. Name starts with "use"</h4>
              <p>useFormInput, useFetch, useLocalStorage, etc.</p>
            </div>
            <div className="rule">
              <h4>2. Can call other hooks</h4>
              <p>useState, useEffect, useContext inside custom hooks</p>
            </div>
            <div className="rule">
              <h4>3. Return state and functions</h4>
              <p>Return values that components need</p>
            </div>
            <div className="rule">
              <h4>4. Reusable logic</h4>
              <p>Abstract complex logic into reusable packages</p>
            </div>
          </div>
        </div>

        {/* Hook Composition */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Hook Composition Pattern</h2>
          <p>Combine multiple hooks for powerful abstractions</p>
          <pre className="code-block">
            {`function useUserForm(userId) {
  // Compose multiple hooks
  const user = useFetch(\`/api/users/\${userId}\`);
  const name = useFormInput(user.data?.name);
  const email = useFormInput(user.data?.email);

  return {
    user,
    form: { name, email }
  };
}`}
          </pre>
        </div>
      </div>

      <div className="learning-tips">
        <h3>📚 Key Concepts</h3>
        <ul>
          <li>Custom hooks extract reusable stateful logic</li>
          <li>Can use built-in hooks inside custom hooks</li>
          <li>Share logic without changing component structure</li>
          <li>Each call to custom hook gets its own state</li>
          <li>Perfect for forms, API calls, animations, etc.</li>
        </ul>
      </div>
    </div>
  );
}
