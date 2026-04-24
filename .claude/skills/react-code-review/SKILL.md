---
name: react-code-review
description: Review React code for quality, conventions, and best practices
allowed-tools: Read Grep
---

# React Code Review

Review $ARGUMENTS for React code quality and adherence to project standards from `rules.md`.

## Review Checklist

### Component Structure
- [ ] Uses functional components (not class components except ErrorBoundary)
- [ ] Props are destructured: `function MyComponent({ prop1, prop2 })`
- [ ] Clear prop naming (not `enable={true}` but `isLoading={true}`)
- [ ] JSDoc comment above component: `/** Description */`
- [ ] Component structure: imports → comment → component → hooks → helpers → JSX

### Hooks
- [ ] useState: Single updates or grouped logically
- [ ] useEffect: Has dependency array, all dependencies included
- [ ] useEffect cleanup: Return cleanup function if needed
- [ ] Custom hooks used for reused logic
- [ ] No hook calls outside component/hook functions
- [ ] useCallback/useMemo used judiciously (not for every function)

### Styling
- [ ] Tailwind classes for styling (not inline CSS for static styles)
- [ ] Inline styles only for dynamic values: `style={{ backgroundColor: color }}`
- [ ] No CSS modules mixed with Tailwind
- [ ] Responsive design: mobile-first with md: breakpoints
- [ ] Framer Motion for animations (not CSS animations)

### Code Quality
- [ ] No console.logs (except educational/debugging)
- [ ] No duplicate code (extract to functions/hooks)
- [ ] Variable names are descriptive
- [ ] No magic numbers (use named constants)
- [ ] File size under limits:
  - Components: < 300 lines
  - Hooks: < 200 lines
  - Pages: < 500 lines
- [ ] No unused variables or imports

### Naming Conventions
- [ ] Components: PascalCase (`MyComponent.jsx`)
- [ ] Functions/hooks: camelCase (`handleClick`, `useProgress`)
- [ ] Constants: UPPER_SNAKE_CASE (`MAX_TIMEOUT`)
- [ ] CSS classes: kebab-case (`.glass-card`)

### Accessibility
- [ ] Semantic HTML (not divs for everything)
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Color contrast adequate
- [ ] Form inputs have labels
- [ ] Images have alt text

### Performance
- [ ] No unnecessary re-renders from props
- [ ] Dependencies arrays are correct (not empty when shouldn't be)
- [ ] Large lists don't re-render all items
- [ ] Images optimized/lazy-loaded if needed

### Security (if applicable)
- [ ] No hardcoded secrets/API keys
- [ ] Input validation
- [ ] XSS prevention (no dangerouslySetInnerHTML without reason)
- [ ] No eval() or dynamic code execution

## Format of Report

For each issue found:
1. **Location**: `file.jsx:line` or `function-name`
2. **Category**: Structure | Hooks | Styling | Quality | Naming | Accessibility | Performance | Security
3. **Severity**: Critical | Warning | Suggestion
4. **Issue**: What's wrong
5. **Fix**: How to fix it
6. **Example**: Show before/after if helpful

## Example Output Format

```
## react-code-review src/components/MyComponent.jsx

### 1. Missing dependency in useEffect
- **Location**: MyComponent.jsx:25
- **Severity**: Critical
- **Issue**: userId is used in useEffect but not in dependency array
- **Fix**: Add userId to the dependency array
- **Code**:
  ```jsx
  // Before
  useEffect(() => {
    fetchUser(userId);
  }, []); // ❌ userId not in deps

  // After
  useEffect(() => {
    fetchUser(userId);
  }, [userId]); // ✅ Correct
  ```

### 2. Inline CSS for static style
- **Location**: MyComponent.jsx:45
- **Severity**: Warning
- **Issue**: Inline style for static padding, should use Tailwind
- **Fix**: Replace with Tailwind class `p-4`
- **Code**:
  ```jsx
  // Before
  <div style={{ padding: "1rem" }}>

  // After
  <div className="p-4">
  ```
```

## Quick Tips

- Read `rules.md` for detailed conventions
- Check `claude.md` for architecture understanding
- Look at similar files for patterns to follow
- Remember: simple code > complex code
- No over-engineering for hypothetical future use
