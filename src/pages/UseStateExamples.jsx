import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/pages.css";

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
    <div className="page-container" style={{
      backgroundColor: theme.colors.bg,
      color: theme.colors.text,
    }}>
      <h1>📊 useState Hook Examples</h1>

      <div className="examples-section">
        {/* Example 1: Counter */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example 1: Simple Counter</h2>
          <p>useState basics with a number</p>
          <div className="counter-demo">
            <button onClick={() => setCount(count - 1)}>➖</button>
            <span className="count-display">{count}</span>
            <button onClick={() => setCount(count + 1)}>➕</button>
          </div>
          <button onClick={() => setCount(0)} className="reset-btn">
            Reset
          </button>
        </div>

        {/* Example 2: Form Input */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example 2: Controlled Input</h2>
          <p>useState with form inputs</p>
          <div className="form-demo">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                color: theme.colors.text,
                backgroundColor: theme.isDark ? "#333" : "#f5f5f5",
                borderColor: theme.colors.border,
              }}
            />
            <button
              onClick={() => {
                setSubmitted(true);
              }}
            >
              Submit
            </button>
          </div>
          {submitted && name && (
            <p className="success">Hello, {name}! 👋</p>
          )}
        </div>

        {/* Example 3: Toggle */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example 3: Toggle State</h2>
          <p>useState with boolean values</p>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="toggle-btn"
          >
            {isVisible ? "Hide" : "Show"} Content
          </button>
          {isVisible && (
            <div className="toggled-content">
              ✨ This content can be toggled on and off!
            </div>
          )}
        </div>

        {/* Example 4: Multiple States */}
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example 4: Multiple State Variables</h2>
          <p>Using useState multiple times or one object</p>
          <div className="form-demo">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleFormChange}
              style={{
                color: theme.colors.text,
                backgroundColor: theme.isDark ? "#333" : "#f5f5f5",
                borderColor: theme.colors.border,
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleFormChange}
              style={{
                color: theme.colors.text,
                backgroundColor: theme.isDark ? "#333" : "#f5f5f5",
                borderColor: theme.colors.border,
              }}
            />
          </div>
          <div className="info-text">
            Email: {form.email || "—"} <br />
            Password: {form.password.length > 0 ? "•".repeat(form.password.length) : "—"}
          </div>
        </div>
      </div>

      <div className="learning-tips">
        <h3>📚 Key Concepts</h3>
        <ul>
          <li>useState returns [currentValue, setterFunction]</li>
          <li>Setter can receive new value or function with previous value</li>
          <li>State updates trigger re-renders</li>
          <li>Each component instance has its own state</li>
          <li>Controlled components: value + onChange pattern</li>
        </ul>
      </div>
    </div>
  );
}
