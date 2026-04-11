import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useFetch } from "../hooks/useFetch";
import "../styles/pages.css";

export function APIIntegration() {
  const theme = useContext(ThemeContext);
  const [postCount, setPostCount] = useState(3);

  // Using custom hook for API fetching
  const { data: posts, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${postCount}`
  );

  return (
    <div
      className="page-container"
      style={{
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
      }}
    >
      <h1>🌐 API Integration</h1>

      <div className="examples-section">
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Fetching Data from JSONPlaceholder API</h2>
          <p>Using custom useFetch hook with async/await</p>

          <div className="api-controls">
            <label>Number of posts: </label>
            <input
              type="number"
              min="1"
              max="10"
              value={postCount}
              onChange={(e) => setPostCount(parseInt(e.target.value))}
              style={{
                color: theme.colors.text,
                backgroundColor: theme.isDark ? "#333" : "#f5f5f5",
                borderColor: theme.colors.border,
              }}
            />
          </div>

          {loading && <p className="loading">⏳ Loading data...</p>}

          {error && (
            <p
              className="error"
              style={{
                color: "#ff6b6b",
              }}
            >
              ❌ Error: {error}
            </p>
          )}

          {posts && posts.length > 0 && (
            <div className="posts-list">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="post-item"
                  style={{ borderColor: theme.colors.border }}
                >
                  <h4>Post #{post.id}</h4>
                  <h5>{post.title}</h5>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>How useFetch Hook Works</h2>
          <p>Custom hook encapsulates API logic</p>
          <pre className="code-block">
            {`const { data, loading, error } = useFetch(url);

Hook handles:
• Fetching data with fetch()
• Loading state management
• Error handling
• Cleanup function (prevents memory leaks)
• Dependency on URL changes`}
          </pre>
        </div>

        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Data Fetching Patterns</h2>
          <div className="patterns-list">
            <div className="pattern">
              <h4>1. Basic Fetch</h4>
              <p>Simple GET request with loading/error states</p>
            </div>
            <div className="pattern">
              <h4>2. Error Handling</h4>
              <p>Catch network errors and HTTP error codes</p>
            </div>
            <div className="pattern">
              <h4>3. Cleanup</h4>
              <p>
                Prevent state updates on unmounted component (isMounted flag)
              </p>
            </div>
            <div className="pattern">
              <h4>4. Dependencies</h4>
              <p>Re-fetch when URL or other dependencies change</p>
            </div>
          </div>
        </div>
      </div>

      <div className="learning-tips">
        <h3>📚 Key Concepts</h3>
        <ul>
          <li>useEffect + async/await for API calls</li>
          <li>Loading state while fetching</li>
          <li>Error handling with try/catch</li>
          <li>Cleanup function prevents memory leaks</li>
          <li>Custom hooks abstract API logic</li>
          <li>Dependency array triggers re-fetch on URL change</li>
        </ul>
      </div>
    </div>
  );
}
