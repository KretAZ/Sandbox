/**
 * Quiz questions and answers for React concepts
 * Organized by concept for assessment and learning
 */

export const quizzes = {
  useState: [
    {
      id: "useState-q1",
      question: "What does useState return?",
      answers: [
        { id: "a1", text: "An array with [state value, setter function]", correct: true },
        { id: "a2", text: "An object with state and setState", correct: false },
        { id: "a3", text: "Just the state value", correct: false },
        { id: "a4", text: "A function to update state", correct: false },
      ],
      explanation: "useState returns an array: [currentValue, setterFunction]. This pattern allows for destructuring.",
    },
    {
      id: "useState-q2",
      question: "When does a component re-render after useState state change?",
      answers: [
        { id: "a1", text: "Immediately, synchronously", correct: false },
        { id: "a2", text: "After the current function finishes", correct: true },
        { id: "a3", text: "Never, you must force update", correct: false },
        { id: "a4", text: "Only if you call forceUpdate()", correct: false },
      ],
      explanation: "State updates are batched. The component re-renders after the current event handler completes.",
    },
    {
      id: "useState-q3",
      question: "What should you avoid when using useState setters?",
      answers: [
        { id: "a1", text: "Calling them in loops", correct: false },
        { id: "a2", text: "Mutating state directly", correct: true },
        { id: "a3", text: "Using callback functions", correct: false },
        { id: "a4", text: "Setting state in useEffect", correct: false },
      ],
      explanation: "Never mutate state directly. Always use the setter: setState(newValue) or setState(prev => ...prev).",
    },
  ],

  useEffect: [
    {
      id: "useeffect-q1",
      question: "What does an empty dependency array [] mean?",
      answers: [
        { id: "a1", text: "Run the effect on every render", correct: false },
        { id: "a2", text: "Run the effect once on component mount", correct: true },
        { id: "a3", text: "Don't run the effect at all", correct: false },
        { id: "a4", text: "Run whenever props change", correct: false },
      ],
      explanation: "An empty [] dependency array means the effect runs only once after initial render (mount).",
    },
    {
      id: "useeffect-q2",
      question: "What is the return value of useEffect used for?",
      answers: [
        { id: "a1", text: "It's not used for anything", correct: false },
        { id: "a2", text: "Cleanup function to prevent memory leaks", correct: true },
        { id: "a3", text: "To get the effect result", correct: false },
        { id: "a4", text: "To trigger the effect again", correct: false },
      ],
      explanation: "useEffect can return a cleanup function that runs when the component unmounts or before the effect runs again.",
    },
    {
      id: "useeffect-q3",
      question: "When should you use useEffect instead of putting code in the component body?",
      answers: [
        { id: "a1", text: "For side effects like API calls, subscriptions", correct: true },
        { id: "a2", text: "For computing the render output", correct: false },
        { id: "a3", text: "To avoid prop drilling", correct: false },
        { id: "a4", text: "They're always interchangeable", correct: false },
      ],
      explanation: "useEffect is for side effects (API calls, subscriptions, DOM updates). Direct code is for computing render values.",
    },
  ],

  props: [
    {
      id: "props-q1",
      question: "Are props mutable in a child component?",
      answers: [
        { id: "a1", text: "Yes, props can be changed freely", correct: false },
        { id: "a2", text: "No, props are read-only", correct: true },
        { id: "a3", text: "Only if parent gives permission", correct: false },
        { id: "a4", text: "Depends on the data type", correct: false },
      ],
      explanation: "Props are read-only. To change data, you must update state in the parent and pass new props.",
    },
    {
      id: "props-q2",
      question: "What is the special 'children' prop used for?",
      answers: [
        { id: "a1", text: "To store child component state", correct: false },
        { id: "a2", text: "To pass JSX content inside component tags", correct: true },
        { id: "a3", text: "To create child routes", correct: false },
        { id: "a4", text: "To pass event handlers", correct: false },
      ],
      explanation: "children is a special prop that receives JSX passed between opening and closing tags: <Component>children go here</Component>.",
    },
    {
      id: "props-q3",
      question: "What design pattern solves deeply nested prop drilling?",
      answers: [
        { id: "a1", text: "Redux", correct: false },
        { id: "a2", text: "Context API", correct: true },
        { id: "a3", text: "Event emitters", correct: false },
        { id: "a4", text: "Higher-order components", correct: false },
      ],
      explanation: "Context API allows data to skip intermediate components without prop drilling.",
    },
  ],

  context: [
    {
      id: "context-q1",
      question: "What does React.createContext() return?",
      answers: [
        { id: "a1", text: "A context Provider component", correct: false },
        { id: "a2", text: "A context object with Provider and Consumer", correct: true },
        { id: "a3", text: "Global state object", correct: false },
        { id: "a4", text: "A hook function", correct: false },
      ],
      explanation: "createContext() returns a context object. You then create a Provider wrapper component.",
    },
    {
      id: "context-q2",
      question: "How do you access context value in a component?",
      answers: [
        { id: "a1", text: "const value = Context.value", correct: false },
        { id: "a2", text: "const value = useContext(Context)", correct: true },
        { id: "a3", text: "const value = Context.Consumer", correct: false },
        { id: "a4", text: "const value = getContext(Context)", correct: false },
      ],
      explanation: "Use the useContext hook: const theme = useContext(ThemeContext)",
    },
    {
      id: "context-q3",
      question: "What's a problem with putting everything in one Context?",
      answers: [
        { id: "a1", text: "It won't work", correct: false },
        { id: "a2", text: "Components re-render too often unnecessarily", correct: true },
        { id: "a3", text: "You can't access multiple contexts", correct: false },
        { id: "a4", text: "It conflicts with props", correct: false },
      ],
      explanation: "When context value changes, all consuming components re-render. Split contexts by concern.",
    },
  ],

  customHooks: [
    {
      id: "hook-q1",
      question: "What naming convention must custom hooks follow?",
      answers: [
        { id: "a1", text: "Start with 'use' prefix", correct: true },
        { id: "a2", text: "Start with 'custom' prefix", correct: false },
        { id: "a3", text: "End with 'Hook'", correct: false },
        { id: "a4", text: "No specific naming required", correct: false },
      ],
      explanation: "Custom hooks MUST start with 'use' to signal they can call other hooks (Rules of Hooks).",
    },
    {
      id: "hook-q2",
      question: "Can you call useState inside a custom hook?",
      answers: [
        { id: "a1", text: "No, only in components", correct: false },
        { id: "a2", text: "Yes, custom hooks can use built-in hooks", correct: true },
        { id: "a3", text: "Only if wrapped in useCallback", correct: false },
        { id: "a4", text: "Depends on React version", correct: false },
      ],
      explanation: "Custom hooks are functions that can call other hooks. Each hook call gets its own state.",
    },
    {
      id: "hook-q3",
      question: "What's the benefit of extracting logic into a custom hook?",
      answers: [
        { id: "a1", text: "Smaller components and reusable logic", correct: true },
        { id: "a2", text: "Faster performance", correct: false },
        { id: "a3", text: "Required for TypeScript", correct: false },
        { id: "a4", text: "No real benefit", correct: false },
      ],
      explanation: "Custom hooks let you reuse stateful logic across components without HOCs or render props.",
    },
  ],
};

/**
 * Get quiz questions for a concept
 */
export function getQuizForConcept(conceptId) {
  return quizzes[conceptId] || [];
}

/**
 * Get a specific quiz question
 */
export function getQuizQuestion(conceptId, questionId) {
  const conceptQuizzes = quizzes[conceptId];
  return conceptQuizzes?.find(q => q.id === questionId) || null;
}

/**
 * Get random quiz from concept
 */
export function getRandomQuiz(conceptId) {
  const conceptQuizzes = quizzes[conceptId];
  if (!conceptQuizzes || conceptQuizzes.length === 0) return null;
  return conceptQuizzes[Math.floor(Math.random() * conceptQuizzes.length)];
}
