import React, { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught:", error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-lg bg-red-500/20 border-2 border-red-500 text-red-600">
          <p className="font-bold mb-2">❌ Something went wrong!</p>
          <p className="text-sm mb-4">{this.state.error?.toString()}</p>
          <button
            onClick={this.reset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function ProblematicComponent() {
  throw new Error("This component has an error!");
}

export function ErrorBoundaryExample() {
  const [showError, setShowError] = useState(false);

  return (
    <PageLayout title="🛡️ Error Boundaries">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">What is Error Boundary?</h2>
          <p className="opacity-75 mb-4">
            Error Boundaries catch JavaScript errors in child components and display fallback UI.
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-sm space-y-2">
            <p><strong>Class Component Only:</strong> Must extend React.Component</p>
            <p><strong>Purpose:</strong> Prevent entire app crash from component errors</p>
          </div>
        </GlassCard>

        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">What They Catch</h2>
          <ul className="text-sm space-y-1">
            <li className="flex gap-2">
              <span className="text-green-400">✓</span>
              <span>Render errors in child components</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">✓</span>
              <span>Lifecycle method errors</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">✗</span>
              <span>Event handlers (use try/catch)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">✗</span>
              <span>Async code (Promises)</span>
            </li>
          </ul>
        </GlassCard>

        <GlassCard animated delay={0.2} className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gradient">Live Demo</h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-4">
            <ErrorBoundary>
              {showError ? (
                <ProblematicComponent />
              ) : (
                <div className="p-4 bg-green-500/20 text-green-600 rounded">
                  ✓ Component rendering normally
                </div>
              )}
            </ErrorBoundary>

            <GlassButton
              onClick={() => setShowError(!showError)}
              variant={showError ? "secondary" : "primary"}
              className="w-full"
            >
              {showError ? "Recover from Error" : "Trigger Error"}
            </GlassButton>
          </div>
        </GlassCard>
      </div>

      <SectionContainer title="📚 Key Concepts" variant="gradient" delay={0.3}>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Must be class component with getDerivedStateFromError</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>componentDidCatch for error logging</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Wrap multiple components to catch errors in subtree</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Doesn't catch errors in Error Boundary itself</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Use multiple Error Boundaries for granular error handling</span>
          </li>
        </ul>
      </SectionContainer>

      <SectionContainer title="💻 Implementation Pattern" variant="glass" delay={0.4}>
        <CodeSnippetCard
          title="Error Boundary Class Component"
          description="Catching errors in component tree"
          initialCode={`class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error);
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>`}
          animated={false}
        />
      </SectionContainer>
    </PageLayout>
  );
}
