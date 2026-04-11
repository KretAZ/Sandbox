import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/navigation.css";

export function Navigation() {
  const theme = useContext(ThemeContext);

  return (
    <nav className="navbar" style={{
      backgroundColor: theme.colors.bg,
      borderBottom: `1px solid ${theme.colors.border}`,
    }}>
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          🚀 React Learning
        </Link>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/usestate">useState</Link></li>
          <li><Link to="/useeffect">useEffect</Link></li>
          <li><Link to="/props">Props</Link></li>
          <li><Link to="/api">API</Link></li>
          <li><Link to="/custom-hooks">Custom Hooks</Link></li>
          <li><Link to="/context">Context</Link></li>
        </ul>

        <button
          className="theme-toggle"
          onClick={theme.toggleTheme}
          style={{
            color: theme.colors.text,
            borderColor: theme.colors.text,
          }}
        >
          {theme.isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
