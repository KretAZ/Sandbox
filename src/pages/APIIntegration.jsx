import { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { SectionContainer } from "../components/SectionContainer";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useFetch } from "../hooks/useFetch";

export function APIIntegration() {
  const [postCount, setPostCount] = useState(3);

  // Using custom hook for API fetching
  const { data: posts, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${postCount}`
  );

  return (
    <PageLayout title="🌐 API Integration">
      <div className="grid grid-cols-1 gap-6 mb-12">
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            Fetching Data from JSONPlaceholder API
          </h2>
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

          {loading && <LoadingSpinner size="md" text="Loading posts..." />}

          {error && (
            <p className="p-3 bg-red-500/20 text-red-600 rounded-lg mb-4">
              ❌ Error: {error}
            </p>
          )}

          {posts && posts.length > 0 && (
            <div className="space-y-4">
              {posts.map((post, idx) => (
                <GlassCard key={post.id} animated delay={0.1 + idx * 0.05} variant="light">
                  <h4 className="text-sm opacity-70 mb-1">Post #{post.id}</h4>
                  <h5 className="text-lg font-bold mb-2 text-gradient">{post.title}</h5>
                  <p className="text-sm opacity-75">{post.body}</p>
                </GlassCard>
              ))}
            </div>
          )}
        </GlassCard>

        <SectionContainer
          title="How useFetch Hook Works"
          variant="glass"
          delay={0.1}
        >
          <p className="opacity-75 mb-4">Custom hook encapsulates API logic</p>
          <pre className="p-4 rounded-lg overflow-x-auto font-mono text-sm bg-gray-900 text-gray-100">
            {`const { data, loading, error } = useFetch(url);

Hook handles:
• Fetching data with fetch()
• Loading state management
• Error handling
• Cleanup function (prevents memory leaks)
• Dependency on URL changes`}
          </pre>
        </SectionContainer>

        <SectionContainer
          title="Data Fetching Patterns"
          variant="glass"
          delay={0.2}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard variant="light">
              <h4 className="font-bold mb-2 text-primary">1. Basic Fetch</h4>
              <p className="text-sm opacity-75">Simple GET request with loading/error states</p>
            </GlassCard>
            <GlassCard variant="light">
              <h4 className="font-bold mb-2 text-primary">2. Error Handling</h4>
              <p className="text-sm opacity-75">Catch network errors and HTTP error codes</p>
            </GlassCard>
            <GlassCard variant="light">
              <h4 className="font-bold mb-2 text-primary">3. Cleanup</h4>
              <p className="text-sm opacity-75">Prevent state updates on unmounted component</p>
            </GlassCard>
            <GlassCard variant="light">
              <h4 className="font-bold mb-2 text-primary">4. Dependencies</h4>
              <p className="text-sm opacity-75">Re-fetch when URL or other dependencies change</p>
            </GlassCard>
          </div>
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
            <span>useEffect + async/await for API calls</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Loading state while fetching</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Error handling with try/catch</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Cleanup function prevents memory leaks</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Custom hooks abstract API logic</span>
          </li>
        </ul>
      </SectionContainer>
    </PageLayout>
  );
}
