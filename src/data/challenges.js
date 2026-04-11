/**
 * Coding challenges for React concepts
 * Interactive exercises to apply learning
 */

export const challenges = {
  useState: [
    {
      id: "useState-challenge-1",
      title: "Build a Counter",
      difficulty: "Easy",
      description: "Create a counter component with increment, decrement, and reset buttons",
      starterCode: `function Counter() {
  // TODO: Add useState for count

  return (
    <div>
      <p>Count: {count}</p>
      {/* TODO: Add buttons for +1, -1, and reset */}
    </div>
  );
}`,
      solution: `function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`,
      testCases: [
        { input: "Initial render", expected: "Count: 0" },
        { input: "Click +1 button", expected: "Count: 1" },
        { input: "Click reset button", expected: "Count: 0" },
      ],
      hints: [
        "Use useState(0) to initialize counter",
        "Use setCount() in onClick handlers",
        "Setter can receive new value directly: setCount(0)",
      ],
    },
    {
      id: "useState-challenge-2",
      title: "Form Validation",
      difficulty: "Medium",
      description: "Create a form that shows validation errors",
      starterCode: `function LoginForm() {
  // TODO: Add useState for email and password
  // TODO: Add validation errors state

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validate and show errors
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: Render error messages */}
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}`,
      solution: `function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email.includes('@')) newErrors.email = 'Invalid email';
    if (password.length < 6) newErrors.password = 'Password too short';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form valid!', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
      {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}`,
      hints: [
        "Validate in handleSubmit before setting state",
        "Use empty object {} for no errors",
        "Show error message only if errors[fieldName] exists",
      ],
    },
  ],

  useEffect: [
    {
      id: "useEffect-challenge-1",
      title: "Window Resize Listener",
      difficulty: "Medium",
      description: "Display window width and update on resize with proper cleanup",
      starterCode: `function WindowSize() {
  const [width, setWidth] = React.useState(window.innerWidth);

  // TODO: Add useEffect to listen for window resize
  // TODO: Don't forget cleanup function

  return <p>Window width: {width}px</p>;
}`,
      solution: `function WindowSize() {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <p>Window width: {width}px</p>;
}`,
      hints: [
        "Use addEventListener in useEffect",
        "Return cleanup function with removeEventListener",
        "Empty dependency [] = runs once on mount",
      ],
    },
  ],

  props: [
    {
      id: "props-challenge-1",
      title: "Card Component",
      difficulty: "Easy",
      description: "Create a reusable Card component that accepts title and children",
      starterCode: `function Card({ title, children }) {
  // TODO: Return a card JSX with title and children
  return (
    // <div with border/styling>
    //   <h3>{title}</h3>
    //   {children}
    // </div>
  );
}`,
      solution: `function Card({ title, children }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px'
    }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}`,
      hints: [
        "Props are destructured in function parameters",
        "children is a special prop containing JSX between tags",
        "Render title in h3 or h4",
      ],
    },
  ],
};

/**
 * Get challenges for a concept
 */
export function getChallengesForConcept(conceptId) {
  return challenges[conceptId] || [];
}

/**
 * Get specific challenge
 */
export function getChallenge(conceptId, challengeId) {
  const conceptChallenges = challenges[conceptId];
  return conceptChallenges?.find(c => c.id === challengeId) || null;
}

/**
 * Difficulty levels
 */
export const difficultyLevels = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};
