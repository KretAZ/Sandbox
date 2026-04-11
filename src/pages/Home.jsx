import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

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
    <div className={`min-h-screen transition-colors duration-300 ${
      theme.isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">
          Welcome to React Learning! 🚀
        </h1>
        <p className="text-xl text-center opacity-80 mb-12">
          A comprehensive guide to mastering React concepts through practical examples
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {concepts.map((concept) => (
            <Link
              key={concept.path}
              to={concept.path}
              className={`border-2 rounded-xl p-6 text-center transition-all hover:-translate-y-2 hover:shadow-xl ${
                theme.isDark
                  ? "border-primary/30 bg-gray-800 hover:bg-gray-700"
                  : "border-primary/20 bg-blue-50 hover:bg-blue-100"
              }`}
            >
              <div className="text-5xl mb-4">{concept.emoji}</div>
              <h3 className="text-xl font-bold mb-2">{concept.title}</h3>
              <p className="opacity-75 mb-4">{concept.description}</p>
              <span className="text-primary font-bold">Learn more →</span>
            </Link>
          ))}
        </div>

        <div className={`border-l-4 border-primary p-8 rounded-lg ${
          theme.isDark ? "bg-gray-800" : "bg-blue-50"
        }`}>
          <h2 className="text-3xl font-bold mb-4">How to Use This Learning Project</h2>
          <ol className="space-y-2 text-lg">
            <li className="flex items-start gap-3">
              <span className="font-bold text-primary">1.</span>
              <span>Pick a concept from the grid above</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-primary">2.</span>
              <span>Study the code and examples</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-primary">3.</span>
              <span>Try modifying the code to understand how it works</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-primary">4.</span>
              <span>Use the browser console to debug and inspect values</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-primary">5.</span>
              <span>Move to the next concept when ready</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
