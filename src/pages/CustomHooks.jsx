import { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useFormInput } from "../hooks/useFormInput";
import { useFetch } from "../hooks/useFetch";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";
import { getSnippetsForConcept } from "../data/snippets";

export function CustomHooks() {
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
    <PageLayout title="🪝 Custom Hooks">
      <div className="space-y-6 mb-12">
        {/* Example 1: useFormInput */}
        <SectionContainer
          title="Example 1: useFormInput Hook"
          variant="glass"
          delay={0}
        >
          <p className="opacity-75 mb-4">
            Reusable logic for form input state management
          </p>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block font-semibold mb-2">Email:</label>
              <input
                type="email"
                placeholder="Enter email"
                {...bindEmail}
                className="input-field"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Message:</label>
              <textarea
                placeholder="Enter message"
                {...bindMessage}
                className="input-field h-24"
              />
            </div>

            <div className="flex gap-2">
              <GlassButton
                onClick={handleSubmit}
                variant="primary"
                className="flex-1"
              >
                Submit
              </GlassButton>
              <GlassButton
                onClick={() => {
                  resetEmail();
                  resetMessage();
                }}
                variant="glass"
                className="flex-1"
              >
                Clear
              </GlassButton>
            </div>
          </div>

          {submitted && (
            <p className="p-3 bg-green-500/20 text-green-600 rounded-lg">
              ✅ Message sent! Email: {email}
            </p>
          )}

          <GlassCard variant="light" className="mt-4">
            <strong>Hook benefits:</strong>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• DRY: Reuse form logic across components</li>
              <li>• Clean: Spreads value and onChange as ...bind</li>
              <li>• Reset: Built-in reset functionality</li>
            </ul>
          </GlassCard>
        </SectionContainer>

        {/* Example 2: useFetch */}
        <SectionContainer
          title="Example 2: useFetch Hook"
          variant="glass"
          delay={0.1}
        >
          <p className="opacity-75 mb-4">
            Reusable API data fetching with loading/error states
          </p>

          {userLoading ? (
            <LoadingSpinner size="md" text="Loading user data..." />
          ) : user ? (
            <GlassCard variant="light">
              <h4 className="text-lg font-bold mb-2 text-gradient">{user.name}</h4>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Website:</strong> {user.website}
              </p>
            </GlassCard>
          ) : (
            <p className="text-red-600">Failed to load user data</p>
          )}

          <GlassCard variant="light" className="mt-4">
            <strong>Hook features:</strong>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Automatic loading state</li>
              <li>• Error handling</li>
              <li>• Cleanup to prevent memory leaks</li>
              <li>• Dependency tracking for refetch</li>
            </ul>
          </GlassCard>
        </SectionContainer>

        {/* How to Create Custom Hooks */}
        <SectionContainer
          title="How to Create Custom Hooks"
          variant="glass"
          delay={0.2}
        >
          <p className="opacity-75 mb-4">Rules for creating custom hooks:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard variant="light">
              <h4 className="font-bold mb-2 text-primary">1. Name starts with "use"</h4>
              <p className="text-sm opacity-75">
                useFormInput, useFetch, useLocalStorage, etc.
              </p>
            </GlassCard>
            <GlassCard variant="light">
              <h4 className="font-bold mb-2 text-primary">2. Can call other hooks</h4>
              <p className="text-sm opacity-75">
                useState, useEffect, useContext inside custom hooks
              </p>
            </GlassCard>
            <GlassCard variant="light">
              <h4 className="font-bold mb-2 text-primary">3. Return state and functions</h4>
              <p className="text-sm opacity-75">Return values that components need</p>
            </GlassCard>
            <GlassCard variant="light">
              <h4 className="font-bold mb-2 text-primary">4. Reusable logic</h4>
              <p className="text-sm opacity-75">
                Abstract complex logic into reusable packages
              </p>
            </GlassCard>
          </div>
        </SectionContainer>

        {/* Hook Composition */}
        <SectionContainer
          title="Hook Composition Pattern"
          variant="glass"
          delay={0.3}
        >
          <p className="opacity-75 mb-4">Combine multiple hooks for powerful abstractions</p>
          <pre className="p-4 rounded-lg overflow-x-auto font-mono text-sm bg-gray-900 text-gray-100">
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
        </SectionContainer>
      </div>

      {/* Learning Tips */}
      <SectionContainer
        title="📚 Key Concepts"
        variant="gradient"
        delay={0.4}
      >
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Custom hooks extract reusable stateful logic</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Can use built-in hooks inside custom hooks</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Share logic without changing component structure</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Each call to custom hook gets its own state</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Perfect for forms, API calls, animations, etc.</span>
          </li>
        </ul>
      </SectionContainer>

      {/* Code Snippets */}
      <SectionContainer title="💻 Try It Out" variant="glass" delay={0.5}>
        <div className="space-y-6">
          {getSnippetsForConcept("customHooks").map((snippet, index) => (
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
