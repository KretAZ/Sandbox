import React from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";

export function SuspenseExample() {
  return (
    <PageLayout title="⏳ React.lazy & Suspense">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            What is Suspense?
          </h2>
          <p className="opacity-75 mb-4">
            Suspense lets you wait for code to load (lazy components) before rendering.
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-sm space-y-2">
            <p><strong>Use Case 1:</strong> Code splitting with React.lazy</p>
            <p><strong>Use Case 2:</strong> Data fetching (experimental)</p>
            <p className="text-xs opacity-75 mt-2">Currently stable for code splitting only</p>
          </div>
        </GlassCard>

        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">Benefits</h2>
          <ul className="text-sm space-y-2">
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Code splitting: Load components on demand</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Smaller initial bundle size</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Better performance for large apps</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Show loading state with fallback</span>
            </li>
          </ul>
        </GlassCard>

        <GlassCard animated delay={0.2} className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gradient">Real-World Example</h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm opacity-75 mb-4">
              When user clicks "Settings", the Settings component loads lazily.
              While loading, Suspense shows the fallback UI.
            </p>
            <pre className="text-xs bg-gray-900 p-3 rounded overflow-x-auto font-mono">
{`// Home page loads fast - no Settings code
// Settings only loads when user navigates`}
            </pre>
          </div>
        </GlassCard>
      </div>

      <SectionContainer title="📚 Key Concepts" variant="gradient" delay={0.3}>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>React.lazy() for code splitting components</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Suspense boundary wraps lazy components</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>fallback prop shows loading UI</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Components must be default exports for lazy()</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Combine with React Router for route-based code splitting</span>
          </li>
        </ul>
      </SectionContainer>

      <SectionContainer title="💻 Code Patterns" variant="glass" delay={0.4}>
        <div className="space-y-6">
          <CodeSnippetCard
            title="React.lazy Pattern"
            description="Code splitting with lazy components"
            initialCode={`import React from 'react';

// Lazy load component - only loads when needed
const HeavyComponent = React.lazy(() =>
  import('./HeavyComponent')
);

function App() {
  return (
    <div>
      {/* Suspense wraps lazy components */}
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}`}
            animated={false}
          />

          <CodeSnippetCard
            title="Route-Based Code Splitting"
            description="Lazy load entire pages with React Router"
            initialCode={`import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load page components
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Settings = React.lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`}
            animated={false}
          />
        </div>
      </SectionContainer>

      <SectionContainer title="💡 Best Practices" variant="glass" delay={0.5}>
        <div className="space-y-3 text-sm">
          <p className="flex gap-3">
            <span className="text-primary font-bold">1.</span>
            <span>Use for route-level components in large apps</span>
          </p>
          <p className="flex gap-3">
            <span className="text-primary font-bold">2.</span>
            <span>Show meaningful loading UI (spinners, skeleton screens)</span>
          </p>
          <p className="flex gap-3">
            <span className="text-primary font-bold">3.</span>
            <span>Place Suspense boundary strategically for granular loading states</span>
          </p>
          <p className="flex gap-3">
            <span className="text-primary font-bold">4.</span>
            <span>Combine with error boundaries for error handling</span>
          </p>
          <p className="flex gap-3">
            <span className="text-primary font-bold">5.</span>
            <span>Data fetching with Suspense is still experimental (React 18)</span>
          </p>
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
