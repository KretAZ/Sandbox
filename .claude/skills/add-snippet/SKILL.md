---
name: add-snippet
description: Add a new executable code snippet to src/data/snippets.js
disable-model-invocation: true
allowed-tools: Read Edit
---

# Add Code Snippet

Add a new executable code snippet to `src/data/snippets.js` for the concept: $ARGUMENTS

## Rules from rules.md

- **id format**: `concept-name-number` (e.g., "useState-counter-2")
- **Required fields**: id, title, description, code
- **Code requirements**:
  - Pure JavaScript only (no JSX)
  - Executable in Web Worker sandbox
  - No DOM access, no window object
  - No external APIs (unless mocked)
  - Use console.log for output
  - Timeout < 5 seconds
  - Focus on ONE concept only
  - Minimal and clear

## Steps

1. **Read structure**: Open `src/data/snippets.js` to understand the current structure and find the concept section
2. **Verify concept exists**: Make sure the concept category exists in the file
3. **Add snippet**: Add the new snippet following the existing format:
   ```javascript
   {
     id: "concept-name-number",
     title: "Clear descriptive title",
     description: "What this example demonstrates",
     code: `function example() {
       // Pure JavaScript, no JSX
       console.log("output");
     }`
   }
   ```
4. **Verify execution**: Ensure the code would work in a Web Worker (no DOM, no window)
5. **Test**: The snippet should be executable immediately with clear console.log output

## Web Worker Constraints

✅ Allowed:
- console.log output
- Variables, functions, classes
- Array/Object methods
- Async/await, Promises
- Math, String, Number operations
- setTimeout/setInterval (within 5s limit)

❌ Not allowed:
- DOM access (document, window)
- window object
- External API calls
- Require/import statements
