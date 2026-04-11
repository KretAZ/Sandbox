import { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";

export function UseStateExamples() {
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
    <PageLayout title="📊 useState Hook Examples">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Example 1: Counter */}
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">Example 1: Simple Counter</h2>
          <p className="opacity-75 mb-4">useState basics with a number</p>
          <div className="flex items-center justify-center gap-4 my-6">
            <GlassButton
              onClick={() => setCount(count - 1)}
              variant="secondary"
              size="sm"
            >
              ➖
            </GlassButton>
            <span className="text-4xl font-bold min-w-24 text-center text-primary">
              {count}
            </span>
            <GlassButton
              onClick={() => setCount(count + 1)}
              variant="secondary"
              size="sm"
            >
              ➕
            </GlassButton>
          </div>
          <GlassButton
            onClick={() => setCount(0)}
            variant="glass"
            className="w-full"
          >
            Reset
          </GlassButton>
        </GlassCard>

        {/* Example 2: Form Input */}
        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            Example 2: Controlled Input
          </h2>
          <p className="opacity-75 mb-4">useState with form inputs</p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
            <GlassButton
              onClick={() => {
                setSubmitted(true);
              }}
              variant="primary"
              className="w-full"
            >
              Submit
            </GlassButton>
          </div>
          {submitted && name && (
            <p className="mt-4 p-3 bg-green-500/20 text-green-600 rounded-lg">
              Hello, {name}! 👋
            </p>
          )}
        </GlassCard>

        {/* Example 3: Toggle */}
        <GlassCard animated delay={0.2}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            Example 3: Toggle State
          </h2>
          <p className="opacity-75 mb-4">useState with boolean values</p>
          <GlassButton
            onClick={() => setIsVisible(!isVisible)}
            variant="primary"
            className="w-full mb-4"
          >
            {isVisible ? "Hide" : "Show"} Content
          </GlassButton>
          {isVisible && (
            <div className="p-4 bg-primary/20 text-primary rounded-lg text-center animate-fade-in-up">
              ✨ This content can be toggled on and off!
            </div>
          )}
        </GlassCard>

        {/* Example 4: Multiple States */}
        <GlassCard animated delay={0.3}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            Example 4: Multiple State Variables
          </h2>
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
          <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
            Email: {form.email || "—"} <br />
            Password: {form.password.length > 0 ? "•".repeat(form.password.length) : "—"}
          </div>
        </GlassCard>
      </div>

      {/* Learning Tips */}
      <SectionContainer
        title="📚 Key Concepts"
        variant="gradient"
        delay={0.4}
      >
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>useState returns [currentValue, setterFunction]</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Setter can receive new value or function with previous value</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>State updates trigger re-renders</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Each component instance has its own state</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Controlled components: value + onChange pattern</span>
          </li>
        </ul>
      </SectionContainer>
    </PageLayout>
  );
}
