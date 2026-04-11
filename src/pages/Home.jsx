import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/pages.css";

export function Home() {
  const theme = useContext(ThemeContext);

  const concepts = [
    {
      title: "useState Hook",
      description: "Learn state management in functional components",
      path: "/usestate",
      emoji: "📊",
    },
    {
      title: "useEffect Hook",
      description: "Handle side effects, fetch data, cleanup functions",
      path: "/useeffect",
      emoji: "⚙️",
    },
    {
      title: "Props & State",
      description: "Parent-child communication and state lifting",
      path: "/props",
      emoji: "📤",
    },
    {
      title: "API Integration",
      description: "Fetch data from APIs using useEffect and async/await",
      path: "/api",
      emoji: "🌐",
    },
    {
      title: "Custom Hooks",
      description: "Create reusable logic with custom hooks",
      path: "/custom-hooks",
      emoji: "🪝",
    },
    {
      title: "Context API",
      description: "Global state management without prop drilling",
      path: "/context",
      emoji: "🌍",
    },
  ];

  return (
    <div className="page-container" style={{
      backgroundColor: theme.colors.bg,
      color: theme.colors.text,
    }}>
      <h1>Welcome to React Learning! 🚀</h1>
      <p className="subtitle">
        A comprehensive guide to mastering React concepts through practical examples
      </p>

      <div className="concepts-grid">
        {concepts.map((concept) => (
          <Link
            key={concept.path}
            to={concept.path}
            className="concept-card"
            style={{
              borderColor: theme.colors.border,
              backgroundColor: theme.isDark
                ? "rgba(102, 126, 234, 0.1)"
                : "rgba(102, 126, 234, 0.05)",
            }}
          >
            <div className="concept-emoji">{concept.emoji}</div>
            <h3>{concept.title}</h3>
            <p>{concept.description}</p>
            <span className="learn-more">Learn more →</span>
          </Link>
        ))}
      </div>

      <div className="info-section">
        <h2>How to Use This Learning Project</h2>
        <ol>
          <li>Pick a concept from the grid above</li>
          <li>Study the code and examples</li>
          <li>Try modifying the code to understand how it works</li>
          <li>Use the browser console to debug and inspect values</li>
          <li>Move to the next concept when ready</li>
        </ol>
      </div>
    </div>
  );
}
