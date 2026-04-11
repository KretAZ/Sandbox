/**
 * Complete map of all React learning concepts
 * Used for search, navigation, progress tracking
 */

export const conceptsMap = [
  // Beginner Concepts
  {
    id: 'home',
    title: 'Home',
    path: '/',
    category: 'intro',
    difficulty: 'beginner',
    emoji: '🚀',
    description: 'Welcome to React Learning',
    duration: '5 min',
    tags: ['intro', 'overview'],
    relatedConcepts: [],
  },
  {
    id: 'usestate',
    title: 'useState Hook',
    path: '/usestate',
    category: 'hooks',
    difficulty: 'beginner',
    emoji: '📊',
    description: 'Learn state management in functional components',
    duration: '20 min',
    tags: ['state', 'hooks', 'basics', 'fundamental'],
    relatedConcepts: ['props', 'useeffect'],
  },
  {
    id: 'useeffect',
    title: 'useEffect Hook',
    path: '/useeffect',
    category: 'hooks',
    difficulty: 'beginner',
    emoji: '⚙️',
    description: 'Handle side effects, fetch data, cleanup functions',
    duration: '25 min',
    tags: ['effects', 'hooks', 'side-effects', 'async'],
    relatedConcepts: ['usestate', 'api'],
  },
  {
    id: 'props',
    title: 'Props & State',
    path: '/props',
    category: 'fundamentals',
    difficulty: 'beginner',
    emoji: '📤',
    description: 'Parent-child communication and state lifting',
    duration: '20 min',
    tags: ['props', 'state', 'communication', 'fundamentals'],
    relatedConcepts: ['usestate', 'context'],
  },
  {
    id: 'api',
    title: 'API Integration',
    path: '/api',
    category: 'advanced-basics',
    difficulty: 'beginner-intermediate',
    emoji: '🌐',
    description: 'Fetch data from APIs using useEffect and async/await',
    duration: '25 min',
    tags: ['api', 'fetch', 'async', 'data', 'http'],
    relatedConcepts: ['useeffect', 'custom-hooks'],
  },
  {
    id: 'custom-hooks',
    title: 'Custom Hooks',
    path: '/custom-hooks',
    category: 'hooks',
    difficulty: 'intermediate',
    emoji: '🪝',
    description: 'Create reusable logic with custom hooks',
    duration: '25 min',
    tags: ['hooks', 'reusability', 'patterns', 'custom'],
    relatedConcepts: ['usestate', 'useeffect', 'api'],
  },
  {
    id: 'context',
    title: 'Context API',
    path: '/context',
    category: 'state-management',
    difficulty: 'intermediate',
    emoji: '🌍',
    description: 'Global state management without prop drilling',
    duration: '25 min',
    tags: ['context', 'state', 'global', 'patterns'],
    relatedConcepts: ['props', 'custom-hooks'],
  },
  // Intermediate Concepts (NEW)
  {
    id: 'usecallback',
    title: 'useCallback Hook',
    path: '/usecallback',
    category: 'optimization',
    difficulty: 'intermediate',
    emoji: '🎯',
    description: 'Memoize functions to prevent unnecessary recreations',
    duration: '20 min',
    tags: ['performance', 'optimization', 'hooks', 'callbacks'],
    relatedConcepts: ['usestate', 'usememo', 'custom-hooks'],
  },
  {
    id: 'usememo',
    title: 'useMemo Hook',
    path: '/usememo',
    category: 'optimization',
    difficulty: 'intermediate',
    emoji: '💾',
    description: 'Memoize expensive computations',
    duration: '20 min',
    tags: ['performance', 'optimization', 'hooks', 'memoization'],
    relatedConcepts: ['usestate', 'usecallback'],
  },
  {
    id: 'useref',
    title: 'useRef Hook',
    path: '/useref',
    category: 'hooks',
    difficulty: 'intermediate',
    emoji: '👉',
    description: 'Access DOM directly and persist values across renders',
    duration: '20 min',
    tags: ['dom', 'hooks', 'refs', 'imperative'],
    relatedConcepts: ['usestate', 'custom-hooks'],
  },
  {
    id: 'usereducer',
    title: 'useReducer Hook',
    path: '/usereducer',
    category: 'state-management',
    difficulty: 'intermediate',
    emoji: '⚡',
    description: 'Manage complex state with reducer function',
    duration: '25 min',
    tags: ['state', 'hooks', 'reducers', 'complex-state'],
    relatedConcepts: ['usestate', 'context'],
  },
  {
    id: 'error-boundary',
    title: 'Error Boundaries',
    path: '/error-boundary',
    category: 'error-handling',
    difficulty: 'intermediate',
    emoji: '⚠️',
    description: 'Catch and handle React errors gracefully',
    duration: '20 min',
    tags: ['error-handling', 'components', 'debugging'],
    relatedConcepts: ['useeffect', 'custom-hooks'],
  },
  {
    id: 'suspense',
    title: 'Suspense',
    path: '/suspense',
    category: 'advanced-basics',
    difficulty: 'intermediate-advanced',
    emoji: '⏳',
    description: 'Handle async operations with Suspense',
    duration: '25 min',
    tags: ['async', 'suspense', 'loading', 'code-splitting'],
    relatedConcepts: ['lazy', 'api'],
  },
  // Advanced Patterns (NEW)
  {
    id: 'redux',
    title: 'Redux State Management',
    path: '/redux',
    category: 'state-management',
    difficulty: 'advanced',
    emoji: '🏪',
    description: 'Predictable state management with Redux',
    duration: '45 min',
    tags: ['redux', 'state-management', 'patterns', 'large-scale'],
    relatedConcepts: ['context', 'usereducer'],
    libraries: ['redux', 'react-redux'],
  },
  {
    id: 'zustand',
    title: 'Zustand State Management',
    path: '/zustand',
    category: 'state-management',
    difficulty: 'advanced',
    emoji: '🐻',
    description: 'Simple and lightweight state management alternative',
    duration: '30 min',
    tags: ['zustand', 'state-management', 'lightweight', 'modern'],
    relatedConcepts: ['context', 'redux'],
    libraries: ['zustand'],
  },
  {
    id: 'react-hook-form',
    title: 'React Hook Form',
    path: '/react-hook-form',
    category: 'forms',
    difficulty: 'intermediate-advanced',
    emoji: '📋',
    description: 'Efficient form handling with minimal re-renders',
    duration: '30 min',
    tags: ['forms', 'validation', 'hooks', 'performance'],
    relatedConcepts: ['custom-hooks', 'usestate'],
    libraries: ['react-hook-form', 'zod'],
  },
  {
    id: 'testing',
    title: 'Testing Patterns',
    path: '/testing',
    category: 'testing',
    difficulty: 'advanced',
    emoji: '✅',
    description: 'Unit and integration testing best practices',
    duration: '40 min',
    tags: ['testing', 'jest', 'react-testing-library', 'quality'],
    relatedConcepts: ['custom-hooks', 'context'],
    libraries: ['@testing-library/react', 'jest', 'vitest'],
  },
  {
    id: 'advanced-animations',
    title: 'Advanced Animations',
    path: '/advanced-animations',
    category: 'ui-patterns',
    difficulty: 'advanced',
    emoji: '✨',
    description: 'Complex animations with Framer Motion',
    duration: '35 min',
    tags: ['animations', 'framer-motion', 'ui', 'ux'],
    relatedConcepts: ['useeffect', 'custom-hooks'],
    libraries: ['framer-motion'],
  },
];

/**
 * Get concept by ID
 */
export function getConceptById(id) {
  return conceptsMap.find(concept => concept.id === id);
}

/**
 * Get all concepts by category
 */
export function getConceptsByCategory(category) {
  return conceptsMap.filter(concept => concept.category === category);
}

/**
 * Get all concepts by difficulty
 */
export function getConceptsByDifficulty(difficulty) {
  return conceptsMap.filter(concept => concept.difficulty === difficulty);
}

/**
 * Get all unique categories
 */
export function getAllCategories() {
  return [...new Set(conceptsMap.map(c => c.category))];
}

/**
 * Get all unique difficulties
 */
export function getAllDifficulties() {
  return [...new Set(conceptsMap.map(c => c.difficulty))];
}

/**
 * Get all unique tags
 */
export function getAllTags() {
  const allTags = conceptsMap.flatMap(c => c.tags);
  return [...new Set(allTags)];
}

/**
 * Search concepts by query
 */
export function searchConcepts(query) {
  const q = query.toLowerCase();
  return conceptsMap.filter(concept =>
    concept.title.toLowerCase().includes(q) ||
    concept.description.toLowerCase().includes(q) ||
    concept.tags.some(tag => tag.toLowerCase().includes(q))
  );
}

/**
 * Get related concepts
 */
export function getRelatedConcepts(conceptId) {
  const concept = getConceptById(conceptId);
  if (!concept) return [];
  return concept.relatedConcepts
    .map(id => getConceptById(id))
    .filter(Boolean);
}
