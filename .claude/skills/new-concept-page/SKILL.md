---
name: new-concept-page
description: Create a new React concept educational page following project patterns
disable-model-invocation: true
allowed-tools: Read Write Bash Edit
---

# Create New Concept Page

Create a new educational page for the React concept: $ARGUMENTS

## Project Structure Reference

From `claude.md`:
- **Pages location**: `src/pages/` with PascalCase filenames (e.g., `UseStateExamples.jsx`)
- **Components to use**: PageLayout, GlassCard, GlassButton, SectionContainer, CodeSnippetCard
- **Routing**: Add route in `src/App.jsx`
- **Metadata**: Add to `src/data/conceptsMap.js`

## Page Structure Pattern

Every educational page should follow this structure (see `src/pages/UseReducerExample.jsx`):

```jsx
import { PageLayout } from "../components/PageLayout";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { SectionContainer } from "../components/SectionContainer";
import { CodeSnippetCard } from "../components/core/CodeSnippetCard";

export function ConceptName() {
  return (
    <PageLayout title="🎯 Concept Name">
      {/* Grid of intro cards with explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard animated delay={0}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">What is X?</h2>
          <p className="opacity-75 mb-4">Description and use case...</p>
        </GlassCard>

        <GlassCard animated delay={0.1}>
          <h2 className="text-2xl font-bold mb-2 text-gradient">Structure</h2>
          <pre className="text-xs overflow-x-auto bg-gray-900 p-3 rounded font-mono">
            {`// Syntax example`}
          </pre>
        </GlassCard>

        <GlassCard animated delay={0.2} className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gradient">Live Demo</h2>
          {/* Interactive demo showing concept in action */}
        </GlassCard>
      </div>

      {/* Key concepts section */}
      <SectionContainer title="📚 Key Concepts" variant="gradient" delay={0.3}>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Main learning point 1</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold min-w-6">✓</span>
            <span>Main learning point 2</span>
          </li>
        </ul>
      </SectionContainer>

      {/* Code example section */}
      <SectionContainer title="💻 Code Pattern" variant="glass" delay={0.4}>
        <CodeSnippetCard
          title="Pattern title"
          description="What this pattern shows"
          initialCode={`// Executable JavaScript code`}
          animated={false}
        />
      </SectionContainer>
    </PageLayout>
  );
}
```

## Steps

1. **Read example page**: Look at `src/pages/UseReducerExample.jsx` for reference structure
2. **Create page file**: New file `src/pages/ConceptName.jsx` in PascalCase
3. **Build structure**:
   - Import required components (PageLayout, GlassCard, etc.)
   - Add title with emoji and concept name
   - Create 3-4 info cards (What is X?, Structure, Live Demo, etc.)
   - Add live demo showing the concept in action
   - Add Key Concepts section with bullet points
   - Add Code Pattern section with CodeSnippetCard
4. **Add route**: Update `src/App.jsx` to import and route the new page
5. **Add metadata**: Update `src/data/conceptsMap.js` with concept details
6. **Create snippets**: Add code examples to `src/data/snippets.js` for this concept
7. **Create quizzes**: Add quiz questions to `src/data/quizzes.js` for this concept

## Component Guidelines

- **PageLayout**: Wrapper with title, sets up layout and animations
- **GlassCard**: For content sections with glassmorphism effect, use `animated` and `delay` props
- **GlassButton**: Interactive buttons, variants: "primary", "secondary", "glass"
- **SectionContainer**: Groups related content, `variant` can be "gradient" or "glass"
- **CodeSnippetCard**: Editable code examples with execute button and output panel

## Naming Conventions from rules.md

- **Component files**: PascalCase (`UseStateExamples.jsx`)
- **Functions**: camelCase (`handleClick`, `calculateScore`)
- **CSS classes**: kebab-case (`.glass-card`, `.text-gradient`)
- **Constants**: UPPER_SNAKE_CASE
- **State names**: Descriptive (`const [count, setCount]`)

## Testing

After creating the page:
1. Run `npm run build` to verify no errors
2. Navigate to the page in the browser
3. Test all interactive elements (buttons, code editor)
4. Verify code examples are executable
5. Check responsiveness on mobile
