/**
 * Code snippets and examples for each React concept
 * Used in CodeSnippetCard for interactive learning
 */

export const snippets = {
  // useState Examples
  useState: [
    {
      id: "useState-counter",
      title: "Simple Counter",
      description: "Basic useState example with increment/decrement",
      code: `// Simple counter with useState
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}

// Try it:
const root = document.createElement('div');
root.textContent = 'Check browser console for component structure';
console.log('Counter component would render here');`,
    },
    {
      id: "useState-form",
      title: "Controlled Input",
      description: "Using useState for form input",
      code: `// Controlled component with useState
function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

// Test:
console.log('Form inputs controlled by state');`,
    },
  ],

  // useEffect Examples
  useEffect: [
    {
      id: "useeffect-mount",
      title: "Run on Mount",
      description: "useEffect with empty dependency array",
      code: `// Run effect only on component mount
function DataFetcher() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    console.log('Component mounted! Fetching data...');

    // Simulate API call
    setTimeout(() => {
      setData({ id: 1, name: 'React' });
      console.log('Data loaded!');
    }, 1000);

    // Cleanup function
    return () => {
      console.log('Component cleanup');
    };
  }, []); // Empty dependency = run once on mount

  return <div>{data ? 'Data loaded' : 'Loading...'}</div>;
}

// Try it - check console:
console.log('Mount effect example');`,
    },
    {
      id: "useeffect-dependencies",
      title: "Watch Dependencies",
      description: "useEffect runs when dependencies change",
      code: `// Run effect when dependencies change
function UserProfile() {
  const [userId, setUserId] = React.useState(1);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    console.log(\`Fetching user \${userId}\`);

    // Simulate API call
    setUser({ id: userId, name: \`User \${userId}\` });
  }, [userId]); // Re-run when userId changes

  return (
    <div>
      <p>{user?.name || 'Loading'}</p>
      <button onClick={() => setUserId(userId + 1)}>
        Next User
      </button>
    </div>
  );
}

// Test: effect runs when userId changes
console.log('Dependency tracking example');`,
    },
  ],

  // Props Examples
  props: [
    {
      id: "props-basic",
      title: "Pass Props",
      description: "Basic props passing",
      code: `// Child component receives props
function Greeting({ name, age }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old</p>
    </div>
  );
}

// Parent passes props
function App() {
  return (
    <Greeting name="Alice" age={25} />
  );
}

// Output:
console.log('Props allow parent to child communication');
console.log('Props are read-only in child component');`,
    },
    {
      id: "props-children",
      title: "Props Children",
      description: "Using children prop",
      code: `// Component with children
function Card({ title, children }) {
  return (
    <div style={{border: '1px solid #ccc', padding: '10px'}}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// Usage:
function App() {
  return (
    <Card title="Welcome">
      <p>This is card content</p>
      <p>Multiple children can be passed</p>
    </Card>
  );
}

// Key concept:
console.log('children is a special prop containing nested elements');`,
    },
  ],

  // API Integration Examples
  api: [
    {
      id: "api-fetch",
      title: "Fetch Data",
      description: "Fetch data with useEffect",
      code: `// Fetch data with useEffect
function PostList() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts([
        { id: 1, title: 'Post 1', body: 'Content 1' },
        { id: 2, title: 'Post 2', body: 'Content 2' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// Test:
console.log('API fetching pattern');`,
    },
  ],

  // Custom Hooks Examples
  customHooks: [
    {
      id: "custom-hook-form",
      title: "useFormInput Hook",
      description: "Custom hook for form inputs",
      code: `// Custom hook for form inputs
function useFormInput(initialValue = '') {
  const [value, setValue] = React.useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: (e) => setValue(e.target.value)
    },
    reset: () => setValue(initialValue)
  };
}

// Usage:
function ContactForm() {
  const email = useFormInput('');
  const message = useFormInput('');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      console.log('Submitted:', email.value, message.value);
      email.reset();
      message.reset();
    }}>
      <input {...email.bind} placeholder="Email" />
      <textarea {...message.bind} placeholder="Message" />
      <button type="submit">Send</button>
    </form>
  );
}

console.log('Custom hooks encapsulate reusable logic');`,
    },
  ],

  // Context Examples
  context: [
    {
      id: "context-theme",
      title: "Theme Context",
      description: "Global theme management",
      code: `// Create context
const ThemeContext = React.createContext();

// Provider component
function ThemeProvider({ children }) {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function Button() {
  const { isDark } = React.useContext(ThemeContext);

  return (
    <button style={{
      background: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#000'
    }}>
      Click me
    </button>
  );
}

console.log('Context avoids prop drilling');`,
    },
  ],

  // JavaScript Examples for testing
  javascript: [
    {
      id: "js-array",
      title: "Array Methods",
      description: "Common array operations",
      code: `// Array methods examples
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// filter - keep elements that match condition
const evens = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evens);

// reduce - combine elements into single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('Sum:', sum);

// find - get first matching element
const firstEven = numbers.find(n => n % 2 === 0);
console.log('First even:', firstEven);`,
    },
    {
      id: "js-object",
      title: "Object Operations",
      description: "Working with objects",
      code: `// Object operations
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

// Destructuring
const { name, age } = user;
console.log('Name:', name, 'Age:', age);

// Spread operator
const updatedUser = { ...user, age: 31 };
console.log('Updated:', updatedUser);

// Object methods
console.log('Keys:', Object.keys(user));
console.log('Values:', Object.values(user));
console.log('Entries:', Object.entries(user));`,
    },
  ],
};

/**
 * Get snippets for a specific concept
 */
export function getSnippetsForConcept(conceptId) {
  return snippets[conceptId] || [];
}

/**
 * Get first snippet for a concept
 */
export function getFirstSnippet(conceptId) {
  const conceptSnippets = snippets[conceptId];
  return conceptSnippets?.[0] || null;
}

/**
 * Get snippet by ID
 */
export function getSnippetById(conceptId, snippetId) {
  const conceptSnippets = snippets[conceptId];
  return conceptSnippets?.find(s => s.id === snippetId) || null;
}
