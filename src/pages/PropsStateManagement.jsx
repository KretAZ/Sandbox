import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/pages.css";

// Child component - receives props from parent
function Counter({ count, onIncrement, onDecrement, onReset }) {
  return (
    <div className="child-component">
      <h4>Counter Component (Child)</h4>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onReset} className="reset-btn">
        Reset
      </button>
    </div>
  );
}

// Another child component
function Display({ count, name }) {
  return (
    <div className="child-component">
      <h4>Display Component (Child)</h4>
      <p>
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
      className="parent-component"
      style={{
        borderColor: theme.colors.border,
        backgroundColor: theme.isDark
          ? "rgba(102, 126, 234, 0.1)"
          : "rgba(102, 126, 234, 0.05)",
      }}
    >
      <h3>Parent Component (State Owner)</h3>
      <div className="parent-state">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          style={{
            color: theme.colors.text,
            backgroundColor: theme.isDark ? "#333" : "#f5f5f5",
            borderColor: theme.colors.border,
          }}
        />
        <p>Current Count: {count}</p>
      </div>

      <div className="children-container">
        <Counter
          count={count}
          onIncrement={() => setCount(count + 1)}
          onDecrement={() => setCount(count - 1)}
          onReset={() => setCount(0)}
        />
        <Display count={count} name={name} />
      </div>

      <p className="info-text">
        ⬆️ Data flows DOWN (props), events flow UP (callbacks)
      </p>
    </div>
  );
}

export function PropsStateManagement() {
  const theme = useContext(ThemeContext);
  const [selectedTab, setSelectedTab] = useState("parent-child");

  return (
    <div
      className="page-container"
      style={{
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
      }}
    >
      <h1>📤 Props & State Management</h1>

      <div className="examples-section">
        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Example: Parent-Child Communication</h2>
          <p>
            Data flows down as props, events flow up through callbacks
          </p>

          <ParentComponent />
        </div>

        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Concept: Lifting State Up</h2>
          <p>
            When multiple components need to share state, move state to their
            common parent
          </p>
          <div className="concept-visual">
            <div className="hierarchy">
              <div className="node parent-node">Parent (State)</div>
              <div className="children-nodes">
                <div className="node child-node">Child 1</div>
                <div className="node child-node">Child 2</div>
                <div className="node child-node">Child 3</div>
              </div>
            </div>
            <p className="concept-text">
              All children can access and modify state through props and
              callbacks
            </p>
          </div>
        </div>

        <div className="example-box" style={{ borderColor: theme.colors.border }}>
          <h2>Concept: Props Drilling</h2>
          <p>Passing props through many levels can become cumbersome</p>
          <div className="concept-visual">
            <div className="drilling-example">
              <div>Level 1 (has state) → passes prop</div>
              <div style={{ marginLeft: "20px" }}>
                Level 2 (doesn't use) → passes prop
              </div>
              <div style={{ marginLeft: "40px" }}>
                Level 3 (doesn't use) → passes prop
              </div>
              <div style={{ marginLeft: "60px" }}>
                Level 4 (uses prop) ✓
              </div>
            </div>
            <p className="concept-text">
              💡 Solution: Use Context API for deeply nested components
            </p>
          </div>
        </div>
      </div>

      <div className="learning-tips">
        <h3>📚 Key Concepts</h3>
        <ul>
          <li>Props flow DOWN from parent to child (read-only)</li>
          <li>Events/callbacks flow UP from child to parent</li>
          <li>Lift state to common parent when multiple children need it</li>
          <li>Props drilling: passing props through unrelated components</li>
          <li>Context API solves deep prop drilling problems</li>
          <li>One-way data flow makes debugging easier</li>
        </ul>
      </div>
    </div>
  );
}
