import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useFetch } from "../hooks/useFetch";

export function APIIntegration() {
  const theme = useContext(ThemeContext);
  const [postCount, setPostCount] = useState(3);

  // Using custom hook for API fetching
  const { data: posts, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${postCount}`
  );

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${
      theme.isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-2">🌐 API Integration</h1>

        <div className="grid grid-cols-1 gap-6 mb-12">
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Fetching Data from JSONPlaceholder API</h2>
            <p className="opacity-75 mb-4">Using custom useFetch hook with async/await</p>

            <div className="flex items-center gap-4 mb-6">
              <label className="font-semibold">Number of posts:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={postCount}
                onChange={(e) => setPostCount(parseInt(e.target.value))}
                className="input-field max-w-20"
              />
            </div>

            {loading && <p className="text-primary font-bold">⏳ Loading data...</p>}

            {error && (
              <p className="p-3 bg-red-500/20 text-red-600 rounded-lg mb-4">
                ❌ Error: {error}
              </p>
            )}

            {posts && posts.length > 0 && (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className={`border-l-4 border-primary p-4 rounded ${
                      theme.isDark ? "bg-gray-700" : "bg-blue-50"
                    }`}
                  >
                    <h4 className="text-sm opacity-70">Post #{post.id}</h4>
                    <h5 className="text-lg font-bold mb-2">{post.title}</h5>
                    <p className="text-sm opacity-75">{post.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">How useFetch Hook Works</h2>
            <p className="opacity-75 mb-4">Custom hook encapsulates API logic</p>
            <pre className={`p-4 rounded-lg overflow-x-auto font-mono text-sm ${
              theme.isDark ? "bg-gray-900" : "bg-gray-900 text-gray-100"
            }`}>
              {`const { data, loading, error } = useFetch(url);

Hook handles:
• Fetching data with fetch()
• Loading state management
• Error handling
• Cleanup function (prevents memory leaks)
• Dependency on URL changes`}
            </pre>
          </div>

          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-4">Data Fetching Patterns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border-l-4 border-primary ${
                theme.isDark ? "bg-gray-700" : "bg-blue-50"
              }`}>
                <h4 className="font-bold mb-2">1. Basic Fetch</h4>
                <p className="text-sm opacity-75">Simple GET request with loading/error states</p>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-primary ${
                theme.isDark ? "bg-gray-700" : "bg-blue-50"
              }`}>
                <h4 className="font-bold mb-2">2. Error Handling</h4>
                <p className="text-sm opacity-75">Catch network errors and HTTP error codes</p>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-primary ${
                theme.isDark ? "bg-gray-700" : "bg-blue-50"
              }`}>
                <h4 className="font-bold mb-2">3. Cleanup</h4>
                <p className="text-sm opacity-75">Prevent state updates on unmounted component</p>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-primary ${
                theme.isDark ? "bg-gray-700" : "bg-blue-50"
              }`}>
                <h4 className="font-bold mb-2">4. Dependencies</h4>
                <p className="text-sm opacity-75">Re-fetch when URL or other dependencies change</p>
              </div>
            </div>
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
              <span>useEffect + async/await for API calls</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Loading state while fetching</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Error handling with try/catch</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Cleanup function prevents memory leaks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Custom hooks abstract API logic</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
