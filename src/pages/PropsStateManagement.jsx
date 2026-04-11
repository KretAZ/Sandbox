import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// Child component - receives props from parent
function Counter({ count, onIncrement, onDecrement, onReset }) {
  return (
    <div className="border-2 border-dashed border-primary rounded-lg p-4">
      <h4 className="font-bold">Counter Component (Child)</h4>
      <p className="text-lg font-bold my-2">Count: {count}</p>
      <div className="flex gap-2">
        <button onClick={onIncrement} className="btn-primary flex-1">+</button>
        <button onClick={onDecrement} className="btn-primary flex-1">-</button>
        <button
          onClick={onReset}
          className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Another child component
function Display({ count, name }) {
  return (
    <div className="border-2 border-dashed border-primary rounded-lg p-4">
      <h4 className="font-bold">Display Component (Child)</h4>
      <p className="text-lg my-2">
        {name}, your count is: <strong>{count}</strong>
      </p>
    </div>
  );
}

// Parent component - manages state and passes to children
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("User");
  const theme = useContext(ThemeContext);

  return (
    <div
      className={`border-4 rounded-lg p-6 ${
        theme.isDark ? "border-primary bg-gray-800" : "border-primary bg-blue-50"
      }`}
    >
      <h3 className="text-xl font-bold mb-4">Parent Component (State Owner)</h3>
      <div className={`p-4 rounded-lg mb-6 ${
        theme.isDark ? "bg-gray-700" : "bg-blue-100"
      }`}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="input-field mb-2"
        />
        <p>Current Count: {count}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Counter
          count={count}
          onIncrement={() => setCount(count + 1)}
          onDecrement={() => setCount(count - 1)}
          onReset={() => setCount(0)}
        />
        <Display count={count} name={name} />
      </div>

      <p className="text-sm opacity-75 mt-4">
        ⬆️ Data flows DOWN (props), events flow UP (callbacks)
      </p>
    </div>
  );
}

export function PropsStateManagement() {
  const theme = useContext(ThemeContext);

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${
      theme.isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-2">📤 Props & State Management</h1>

        <div className="space-y-6 mb-12">
          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Example: Parent-Child Communication</h2>
            <p className="opacity-75 mb-4">
              Data flows down as props, events flow up through callbacks
            </p>

            <ParentComponent />
          </div>

          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Concept: Lifting State Up</h2>
            <p className="opacity-75 mb-4">
              When multiple components need to share state, move state to their common parent
            </p>
            <div className={`p-4 rounded-lg ${
              theme.isDark ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <div className="text-center mb-4">
                <div className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-bold mb-3">
                  Parent (State)
                </div>
              </div>
              <div className="flex justify-center gap-4 flex-wrap">
                <div className="px-4 py-2 bg-secondary text-white rounded-lg font-bold">Child 1</div>
                <div className="px-4 py-2 bg-secondary text-white rounded-lg font-bold">Child 2</div>
                <div className="px-4 py-2 bg-secondary text-white rounded-lg font-bold">Child 3</div>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-75">
              All children can access and modify state through props and callbacks
            </p>
          </div>

          <div className={`border-2 rounded-lg p-6 ${
            theme.isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Concept: Props Drilling</h2>
            <p className="opacity-75 mb-4">Passing props through many levels can become cumbersome</p>
            <div className={`p-4 rounded-lg space-y-2 font-mono text-sm ${
              theme.isDark ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <div>Level 1 (has state) → passes prop</div>
              <div className="ml-4">Level 2 (doesn't use) → passes prop</div>
              <div className="ml-8">Level 3 (doesn't use) → passes prop</div>
              <div className="ml-12">Level 4 (uses prop) ✓</div>
            </div>
            <p className="mt-4 text-sm opacity-75">
              💡 <strong>Solution:</strong> Use Context API for deeply nested components
            </p>
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
              <span>Props flow DOWN from parent to child (read-only)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Events/callbacks flow UP from child to parent</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Lift state to common parent when multiple children need it</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Props drilling: passing props through unrelated components</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Context API solves deep prop drilling problems</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
