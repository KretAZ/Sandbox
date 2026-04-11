import { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";

export function ReactHookFormExample() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.email.includes("@")) {
      newErrors.email = "Invalid email address";
    }
    if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ email: "", password: "" });
    }, 2000);
  };

  return (
    <PageLayout title="📋 React Hook Form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            What is React Hook Form?
          </h2>
          <p className="opacity-75 mb-4">
            React Hook Form is a performant library for managing form state and validation
            with minimal re-renders.
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-sm space-y-2">
            <p><strong>Focus:</strong> Performance and developer experience</p>
            <p><strong>Bundle Size:</strong> ~9KB gzipped</p>
            <p><strong>Philosophy:</strong> Uncontrolled components by default</p>
          </div>
        </GlassCard>

        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">
            vs Formik & Standard Forms
          </h2>
          <div className="text-sm space-y-2">
            <div className="p-2 bg-white/5 rounded">
              <p className="font-semibold text-primary">React Hook Form:</p>
              <p className="text-xs opacity-75">Uncontrolled, minimal re-renders</p>
            </div>
            <div className="p-2 bg-white/5 rounded">
              <p className="font-semibold text-primary">Formik:</p>
              <p className="text-xs opacity-75">Controlled, more re-renders</p>
            </div>
            <div className="p-2 bg-white/5 rounded">
              <p className="font-semibold text-primary">Custom Forms:</p>
              <p className="text-xs opacity-75">Most control, most complexity</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard animated delay={0.2} className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gradient">Live Demo</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your@email.com"
                className="input-field"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••"
                className="input-field"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <GlassButton type="submit" variant="primary" className="w-full">
              {submitted ? "✓ Submitted!" : "Submit Form"}
            </GlassButton>
          </form>
        </GlassCard>
      </div>

      <SectionContainer title="📚 Key Benefits" variant="gradient" delay={0.3}>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Minimal re-renders - uncontrolled by default</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Built-in validation support</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Small bundle size (~9KB)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Works with any UI library (Chakra, MUI, Bootstrap)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Great TypeScript support</span>
          </li>
        </ul>
      </SectionContainer>

      <SectionContainer title="💻 Code Patterns" variant="glass" delay={0.4}>
        <div className="space-y-6">
          <CodeSnippetCard
            title="React Hook Form Basics"
            description="Simple uncontrolled form"
            initialCode={`import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // { email: '...', password: '...' }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: 'Invalid email'
          }
        })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        {...register('password', {
          required: 'Password required',
          minLength: {
            value: 6,
            message: 'Min 6 characters'
          }
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}`}
            animated={false}
          />

          <CodeSnippetCard
            title="Advanced: Validation & Watchers"
            description="Complex validation and dynamic fields"
            initialCode={`import { useForm, Controller } from 'react-hook-form';

function AdvancedForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange', // validate onChange
    defaultValues: { agree: false }
  });

  // Watch password changes for confirmation
  const password = watch('password');

  const onSubmit = async (data) => {
    await api.submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('password')} type="password" />

      <input
        {...register('passwordConfirm', {
          validate: (value) =>
            value === password || 'Passwords must match'
        })}
        type="password"
      />

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`}
            animated={false}
          />
        </div>
      </SectionContainer>

      <SectionContainer title="🎯 When to Use" variant="glass" delay={0.5}>
        <div className="text-sm space-y-3">
          <div className="flex gap-3">
            <span className="text-green-400 font-bold">✓</span>
            <span>Forms with complex validation</span>
          </div>
          <div className="flex gap-3">
            <span className="text-green-400 font-bold">✓</span>
            <span>Performance-critical forms (many fields)</span>
          </div>
          <div className="flex gap-3">
            <span className="text-green-400 font-bold">✓</span>
            <span>Need to integrate with UI libraries</span>
          </div>
          <div className="flex gap-3">
            <span className="text-yellow-400 font-bold">⚠️</span>
            <span>Simple forms: standard input + state may be simpler</span>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
