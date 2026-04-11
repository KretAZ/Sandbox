import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useFormInput } from "../hooks/useFormInput";
import { useFetch } from "../hooks/useFetch";

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
    <div className={`w-full min-h-screen transition-colors duration-300 ${
      theme.isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-2">🪝 Custom Hooks</h1>

        <div className="space-y-6 mb-12">
          {/* Example 1: useFormInput */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example 1: useFormInput Hook</h2>
            <p className="opacity-75 mb-4">Reusable logic for form input state management</p>

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
                <button onClick={handleSubmit} className="btn-primary flex-1">
                  Submit
                </button>
                <button
                  onClick={() => {
                    resetEmail();
                    resetMessage();
                  }}
                  className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all"
                >
                  Clear
                </button>
              </div>
            </div>

            {submitted && (
              <p className="p-3 bg-green-500/20 text-green-600 rounded-lg">
                ✅ Message sent! Email: {email}
              </p>
            )}

            <div className={`mt-4 p-4 rounded-lg ${
              theme.isDark ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <strong>Hook benefits:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• DRY: Reuse form logic across components</li>
                <li>• Clean: Spreads value and onChange as ...bind</li>
                <li>• Reset: Built-in reset functionality</li>
              </ul>
            </div>
          </div>

          {/* Example 2: useFetch */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example 2: useFetch Hook</h2>
            <p className="opacity-75 mb-4">Reusable API data fetching with loading/error states</p>

            {userLoading ? (
              <p className="text-primary font-bold">⏳ Loading user data...</p>
            ) : user ? (
              <div className={`p-4 rounded-lg ${
                theme.isDark ? "bg-gray-700" : "bg-blue-50"
              }`}>
                <h4 className="text-lg font-bold mb-2">{user.name}</h4>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>
              </div>
            ) : (
              <p className="text-red-600">Failed to load user data</p>
            )}

            <div className={`mt-4 p-4 rounded-lg ${
              theme.isDark ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <strong>Hook features:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Automatic loading state</li>
                <li>• Error handling</li>
                <li>• Cleanup to prevent memory leaks</li>
                <li>• Dependency tracking for refetch</li>
              </ul>
            </div>
          </div>

          {/* How to Create Custom Hooks */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-4">How to Create Custom Hooks</h2>
            <p className="opacity-75 mb-4">Rules for creating custom hooks:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border-l-4 border-primary ${
                theme.isDark ? "bg-gray-700" : "bg-blue-50"
              }`}>
                <h4 className="font-bold mb-2">1. Name starts with "use"</h4>
                <p className="text-sm opacity-75">useFormInput, useFetch, useLocalStorage, etc.</p>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-primary ${
                theme.isDark ? "bg-gray-700" : "bg-blue-50"
              }`}>
                <h4 className="font-bold mb-2">2. Can call other hooks</h4>
                <p className="text-sm opacity-75">useState, useEffect, useContext inside custom hooks</p>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-primary ${
                theme.isDark ? "bg-gray-700" : "bg-blue-50"
              }`}>
                <h4 className="font-bold mb-2">3. Return state and functions</h4>
                <p className="text-sm opacity-75">Return values that components need</p>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-primary ${
                theme.isDark ? "bg-gray-700" : "bg-blue-50"
              }`}>
                <h4 className="font-bold mb-2">4. Reusable logic</h4>
                <p className="text-sm opacity-75">Abstract complex logic into reusable packages</p>
              </div>
            </div>
          </div>

          {/* Hook Composition */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Hook Composition Pattern</h2>
            <p className="opacity-75 mb-4">Combine multiple hooks for powerful abstractions</p>
            <pre className={`p-4 rounded-lg overflow-x-auto font-mono text-sm ${
              theme.isDark ? "bg-gray-900" : "bg-gray-900 text-gray-100"
            }`}>
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

        {/* Learning Tips */}
        <div className={`border-l-4 border-primary p-8 rounded-lg ${
          theme.isDark ? "bg-gray-800" : "bg-blue-50"
        }`}>
          <h3 className="text-2xl font-bold mb-4">📚 Key Concepts</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Custom hooks extract reusable stateful logic</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Can use built-in hooks inside custom hooks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Share logic without changing component structure</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Each call to custom hook gets its own state</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Perfect for forms, API calls, animations, etc.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
