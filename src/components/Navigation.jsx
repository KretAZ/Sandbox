import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function Navigation() {
  const theme = useContext(ThemeContext);

  return (
    <nav className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${
      theme.isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-primary hover:opacity-90 transition-colors"
        >
          🚀 React Learning
        </Link>

        <ul className="hidden md:flex gap-8">
          <li>
            <Link
              to="/"
              className={`font-semibold hover:text-primary transition-colors ${
                theme.isDark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/usestate"
              className={`font-semibold hover:text-primary transition-colors ${
                theme.isDark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              useState
            </Link>
          </li>
          <li>
            <Link
              to="/useeffect"
              className={`font-semibold hover:text-primary transition-colors ${
                theme.isDark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              useEffect
            </Link>
          </li>
          <li>
            <Link
              to="/props"
              className={`font-semibold hover:text-primary transition-colors ${
                theme.isDark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Props
            </Link>
          </li>
          <li>
            <Link
              to="/api"
              className={`font-semibold hover:text-primary transition-colors ${
                theme.isDark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              API
            </Link>
          </li>
          <li>
            <Link
              to="/custom-hooks"
              className={`font-semibold hover:text-primary transition-colors ${
                theme.isDark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Custom Hooks
            </Link>
          </li>
          <li>
            <Link
              to="/context"
              className={`font-semibold hover:text-primary transition-colors ${
                theme.isDark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Context
            </Link>
          </li>
        </ul>

        <button
          onClick={theme.toggleTheme}
          className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all hover:opacity-10 ${
            theme.isDark
              ? "border-gray-200 text-gray-200 hover:bg-gray-200"
              : "border-gray-900 text-gray-900 hover:bg-gray-900"
          }`}
        >
          {theme.isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
