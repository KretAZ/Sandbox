import { Link } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { HeroSection } from "../components/HeroSection";
import { AnimatedGrid } from "../components/AnimatedGrid";
import { GlassCard } from "../components/GlassCard";
import { SectionContainer } from "../components/SectionContainer";
import { GlassButton } from "../components/GlassButton";

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

  const steps = [
    { number: "1", text: "Pick a concept from the grid below" },
    { number: "2", text: "Study the code and interactive examples" },
    { number: "3", text: "Try modifying code to deepen understanding" },
    { number: "4", text: "Use browser console to debug and inspect values" },
    { number: "5", text: "Move to the next concept when ready" },
  ];

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        theme.isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 -z-10 opacity-30 pointer-events-none ${
          theme.isDark ? "gradient-primary" : "bg-gradient-to-br from-blue-100 to-purple-100"
        }`}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      <div style={{ maxWidth: "72rem", width: "100%", padding: "3rem 1rem", position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <HeroSection
          title="Welcome to React Learning 🚀"
          subtitle="Master React concepts through interactive, hands-on examples with modern design"
        />

        {/* Concept Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <motion.h2
            className="text-3xl font-bold text-gradient mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            React Concepts
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {concepts.map((concept, idx) => (
              <Link key={concept.path} to={concept.path} className="group">
                <GlassCard animated delay={idx * 0.1}>
                  <div className="text-center">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {concept.emoji}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gradient">
                      {concept.title}
                    </h3>
                    <p className="opacity-75 mb-4">{concept.description}</p>
                    <span className="text-primary font-bold group-hover:translate-x-2 transition-transform inline-block">
                      Learn more →
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* How to Use Section */}
        <SectionContainer
          title="How to Use This Learning Project"
          variant="glass"
          delay={0.6}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                className={`p-4 rounded-xl border-2 ${
                  theme.isDark
                    ? "border-primary/30 bg-primary/10"
                    : "border-primary/20 bg-primary/5"
                } text-center`}
              >
                <div className="text-2xl font-bold text-primary mb-2">
                  {step.number}
                </div>
                <p className="text-sm font-medium">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </SectionContainer>

        {/* CTA Section */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className="text-lg opacity-80 mb-6">
            Ready to master React? Start with any concept below!
          </p>
          <Link to="/usestate">
            <GlassButton variant="primary" size="lg">
              Start Learning →
            </GlassButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
