import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function UseStateExamples() {
  const theme = useContext(ThemeContext);

  // Example 1: Simple counter
  const [count, setCount] = useState(0);

  // Example 2: Form input (controlled component)
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Example 3: Toggle
  const [isVisible, setIsVisible] = useState(true);

  // Example 4: Multiple state variables
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme.isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-2">📊 useState Hook Examples</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Example 1: Counter */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example 1: Simple Counter</h2>
            <p className="opacity-75 mb-4">useState basics with a number</p>
            <div className="flex items-center justify-center gap-4 my-6">
              <button
                onClick={() => setCount(count - 1)}
                className="btn-primary"
              >
                ➖
              </button>
              <span className="text-4xl font-bold min-w-24 text-center">{count}</span>
              <button
                onClick={() => setCount(count + 1)}
                className="btn-primary"
              >
                ➕
              </button>
            </div>
            <button
              onClick={() => setCount(0)}
              className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all"
            >
              Reset
            </button>
          </div>

          {/* Example 2: Form Input */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example 2: Controlled Input</h2>
            <p className="opacity-75 mb-4">useState with form inputs</p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
              <button
                onClick={() => {
                  setSubmitted(true);
                }}
                className="w-full btn-primary"
              >
                Submit
              </button>
            </div>
            {submitted && name && (
              <p className="mt-4 p-3 bg-green-500/20 text-green-600 rounded-lg">
                Hello, {name}! 👋
              </p>
            )}
          </div>

          {/* Example 3: Toggle */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example 3: Toggle State</h2>
            <p className="opacity-75 mb-4">useState with boolean values</p>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="w-full btn-primary mb-4"
            >
              {isVisible ? "Hide" : "Show"} Content
            </button>
            {isVisible && (
              <div className="p-4 bg-primary/20 text-primary rounded-lg text-center">
                ✨ This content can be toggled on and off!
              </div>
            )}
          </div>

          {/* Example 4: Multiple States */}
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example 4: Multiple State Variables</h2>
            <p className="opacity-75 mb-4">Using useState multiple times or one object</p>
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleFormChange}
                className="input-field"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleFormChange}
                className="input-field"
              />
            </div>
            <div className={`mt-4 p-3 rounded-lg ${
              theme.isDark ? "bg-gray-700" : "bg-gray-100"
            }`}>
              Email: {form.email || "—"} <br />
              Password: {form.password.length > 0 ? "•".repeat(form.password.length) : "—"}
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
              <span>useState returns [currentValue, setterFunction]</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Setter can receive new value or function with previous value</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>State updates trigger re-renders</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Each component instance has its own state</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Controlled components: value + onChange pattern</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
