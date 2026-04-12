# Project Rules & Guidelines

## 🎯 Core Principles

1. **Educational Focus** - Code should teach React concepts clearly
2. **Simplicity** - No over-engineering; complexity only when necessary
3. **Performance** - Keep bundle size minimal, optimize for fast loading
4. **Security** - Safe code execution through Web Workers
5. **Accessibility** - Components should be accessible to all users

## 📝 Code Style

### JavaScript/React

```javascript
// ✅ GOOD: Functional component with clear structure
export function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState(null);

  const handleClick = () => {
    setState(prev => prev + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

// ❌ BAD: Class components (except ErrorBoundary)
class MyComponent extends React.Component {
  // ...
}

// ✅ GOOD: Custom hooks for logic reuse
function useMyHook() {
  const [state, setState] = useState(null);
  return { state, setState };
}

// ❌ BAD: Logic duplicated across components
function Component1() {
  const [x, setX] = useState(null); // Same logic
}
function Component2() {
  const [y, setY] = useState(null); // Same logic
}
```

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase | `CodeEditor.jsx`, `QuizCard.jsx` |
| Functions | camelCase | `handleSubmit()`, `calculateScore()` |
| Hooks | camelCase with "use" | `useProgress()`, `useCodeSnippet()` |
| Constants | UPPER_SNAKE_CASE | `MAX_TIMEOUT = 5000` |
| CSS Classes | kebab-case | `.glass-card`, `.text-gradient` |
| Files | PascalCase (components) | `HomePage.jsx`, `UserProfile.jsx` |
| Files | camelCase (utils/hooks) | `useProgress.js`, `helpers.js` |

### Styling Rules

```jsx
// ✅ GOOD: Use Tailwind classes
<div className="p-4 rounded-lg bg-black text-white">

// ✅ GOOD: Inline styles only for dynamic values
<textarea style={{ backgroundColor: "#000", paddingLeft: "48px" }} />

// ❌ BAD: Avoid inline CSS for static styles
<div style={{ padding: "1rem", borderRadius: "0.5rem" }}>

// ❌ BAD: Don't mix CSS modules with Tailwind
<div className={styles.card}>

// ✅ GOOD: Use Framer Motion for animations
<motion.div animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

// ❌ BAD: Don't use CSS animations for complex interactions
<div style={{ animation: "fadeIn 0.4s" }}>
```

## 🏗️ Component Structure

Every component should follow this structure:

```jsx
// 1. Imports
import { motion } from "framer-motion";
import { GlassButton } from "../GlassButton";

// 2. JSDoc comment
/**
 * Interactive quiz component for testing knowledge
 */

// 3. Component definition
export function QuizCard({ quiz, onComplete }) {
  // 4. Hooks (useState, useContext, etc.)
  const [answer, setAnswer] = useState(null);
  
  // 5. Helper functions
  const handleSubmit = () => {
    onComplete(answer);
  };

  // 6. JSX return
  return (
    <motion.div animate={{ opacity: 1 }}>
      {/* Content */}
    </motion.div>
  );
}
```

## 🎨 Component Guidelines

### When to Create a Component

- ✅ It's reused 2+ times
- ✅ It has its own state
- ✅ It's complex enough (>50 lines)
- ✅ It's a distinct UI concept

### When NOT to Create a Component

- ❌ Single use only
- ❌ Simple wrapper (use fragment or div)
- ❌ Just a styled div (use Tailwind class)
- ❌ Over-abstraction for future use

### Props Guidelines

```jsx
// ✅ GOOD: Destructure props
export function Card({ title, children, animated = true }) {
  // ...
}

// ✅ GOOD: Use meaningful prop names
<CodeEditor code={code} setCode={setCode} onExecute={executeCode} />

// ❌ BAD: Large prop objects without structure
<Card props={allProps} />

// ❌ BAD: Boolean props without clear meaning
<Component enable={true} flag={false} />

// ✅ GOOD: Clear boolean props
<Card animated={true} hasError={false} isLoading={false} />
```

## 🪝 Hook Rules

### Custom Hooks

```jsx
// ✅ GOOD: Hook that encapsulates state logic
function useProgress() {
  const [completed, setCompleted] = useState([]);
  
  const markComplete = useCallback((id) => {
    setCompleted(prev => [...prev, id]);
  }, []);

  return { completed, markComplete };
}

// ✅ GOOD: Hook with localStorage persistence
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// ❌ BAD: Hook doing too much
function useEverything() {
  // Don't do 10 different things
}
```

### Hook Dependency Arrays

```jsx
// ✅ GOOD: Dependencies are explicit
useEffect(() => {
  fetchData(userId);
}, [userId]); // Re-run when userId changes

// ❌ BAD: Missing dependencies
useEffect(() => {
  fetchData(userId); // userId not in deps!
}, []);

// ✅ GOOD: Empty array for mount only
useEffect(() => {
  initializeApp();
}, []); // Only run once

// ❌ BAD: Forgetting to include deps
useEffect(() => {
  // Accessing variable but not in deps array
  console.log(variable);
});
```

## 📚 Code Snippets Guidelines

### Structure

Each snippet must have:
- `id`: Unique identifier (format: `concept-name-number`)
- `title`: Clear, short title
- `description`: What this example demonstrates
- `code`: Executable JavaScript code

### Example Quality

```javascript
// ✅ GOOD: Teaching example
export const snippets = {
  useState: [{
    id: "useState-counter",
    title: "Simple Counter",
    description: "Basic useState with increment/decrement",
    code: `function Counter() {
      const [count, setCount] = React.useState(0);
      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
      );
    }`
  }]
};

// ❌ BAD: Too complex
code: `// 500 lines of complex code that confuses learners`

// ❌ BAD: Doesn't demonstrate concept
code: `// Random code not related to useState`
```

### Code Execution Requirements

- **No DOM access** (Web Worker limitation)
- **No window object** (Web Worker limitation)
- **No external APIs** (unless mocked)
- **Console.log for output** (Web Worker sends to output panel)
- **Timeout < 5 seconds** (Web Worker safety limit)
- **Pure JavaScript** (no JSX in snippets)

## 🧪 Quiz Guidelines

### Question Structure

```javascript
{
  id: "useState-q1",                                    // Unique ID
  question: "What does useState return?",              // Clear question
  answers: [
    { 
      id: "a1", 
      text: "Array with [state, setter]",              // Clear answer
      correct: true 
    },
    // 3-4 answers total
  ],
  explanation: "useState returns an array..."          // Always explain!
}
```

### Best Practices

- ✅ One correct answer only
- ✅ Clear explanations after each answer
- ✅ Mix easy and hard questions
- ✅ Cover multiple angles of concept
- ❌ Don't trick users (quiz != gotchas)
- ❌ Avoid ambiguous questions

## 🚀 Git Workflow

### Branch Naming

```
claude/explore-repository-* (feature branch)
main (production)
```

### Commit Messages

```
# ✅ GOOD: Clear, descriptive
Add CodeEditor component with syntax highlighting
- Implemented textarea with line numbers
- Added Web Worker integration for code execution
- Supports JavaScript highlighting

# ✅ GOOD: Bug fix
Fix CodeEditor text overlap issue
- Root cause: 5px padding misalignment
- Solution: Align textarea padding with line number width

# ❌ BAD: Vague
fix stuff
update code
changes

# ❌ BAD: Too long
Added the new feature that does the thing and also updated some styles and fixed a bug
```

### Commit Frequency

- One logical feature per commit
- Don't mix refactoring with new features
- Don't bundle unrelated changes
- Meaningful commit history for later review

## 📊 File Size Guidelines

| Type | Max Size | Notes |
|------|----------|-------|
| Component | 300 lines | Break into smaller components |
| Hook | 200 lines | Consider splitting logic |
| Page | 500 lines | OK if mostly layout |
| Data file | Unlimited | OK for data |
| CSS utility | - | Use Tailwind classes |

## 🔐 Security Rules

### Code Execution Sandbox

- ✅ Web Worker isolation
- ✅ 5-second timeout
- ✅ No DOM access
- ✅ No window object
- ✅ No external scripts

### Data Storage

- ✅ localStorage only
- ✅ No sensitive data
- ✅ Local to browser
- ✅ User can clear anytime

### No Secrets in Code

```javascript
// ❌ NEVER do this
const API_KEY = "sk-123456789";
const TOKEN = "secret_token_here";

// ✅ Use environment variables
const API_KEY = process.env.VITE_API_KEY;
```

## 🎓 Teaching Guidelines

### Code Examples Should

- ✅ Focus on ONE concept
- ✅ Be minimal and clear
- ✅ Have console.log output
- ✅ Be executable immediately
- ✅ Show real-world patterns

### Code Examples Should NOT

- ❌ Be overly complex
- ❌ Show anti-patterns (unless explaining why not)
- ❌ Have dependencies on external APIs
- ❌ Require external libraries
- ❌ Take more than 5 seconds to run

## ✅ Code Review Checklist

Before committing, check:

- [ ] Component structure follows pattern
- [ ] Props are well-named and documented
- [ ] No console.logs left (except educational)
- [ ] Tailwind classes used for styling
- [ ] Animations use Framer Motion
- [ ] No duplicate code
- [ ] TypeScript/JSDoc comments for complex logic
- [ ] Mobile responsive
- [ ] Accessibility considered
- [ ] Build succeeds (`npm run build`)
- [ ] No warnings in console
- [ ] Code snippet examples are executable
- [ ] Quiz questions have clear explanations

## 🚨 Common Mistakes to Avoid

| Mistake | Why Bad | Fix |
|---------|---------|-----|
| Inline CSS | Not maintainable | Use Tailwind |
| Class components | Modern React uses hooks | Use functions |
| Missing deps in useEffect | Bugs and stale closures | Include all dependencies |
| Over-abstraction | Makes code complex | Keep it simple |
| Hardcoded values | Not reusable | Extract to props/constants |
| No error handling | Bad UX | Always handle errors |
| Long components | Hard to test/maintain | Break into smaller pieces |
| Magic numbers | Confusing | Use named constants |

## 📞 Questions?

Refer to these resources:
- Code examples in `/src/data/snippets.js`
- Component patterns in `/src/components/`
- Hook patterns in `/src/hooks/`
- Page structure in `/src/pages/`
