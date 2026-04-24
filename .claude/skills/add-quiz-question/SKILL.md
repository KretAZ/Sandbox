---
name: add-quiz-question
description: Add a new quiz question to src/data/quizzes.js
disable-model-invocation: true
allowed-tools: Read Edit
---

# Add Quiz Question

Add a new quiz question to `src/data/quizzes.js` for the concept: $ARGUMENTS

## Rules from rules.md

- **id format**: `concept-q{N}` (e.g., "useState-q4")
- **Required fields**: id, question, answers, explanation
- **Answers**:
  - Provide 3-4 answer options
  - Exactly ONE must have `correct: true`
  - Each answer object: `{ id: "aX", text: "...", correct: true/false }`
- **Question quality**:
  - Clear, unambiguous question text
  - One correct answer only
  - No trick questions
  - Always provide explanation
  - Mix easy and hard questions within a concept

## Steps

1. **Read structure**: Open `src/data/quizzes.js` to understand format and find the concept section
2. **Find last ID**: Check the highest question number for this concept
3. **Create question**: Add new question following the format:
   ```javascript
   {
     id: "concept-qN",
     question: "What is the clear question?",
     answers: [
       {
         id: "a1",
         text: "Correct answer explaining the concept clearly",
         correct: true
       },
       {
         id: "a2",
         text: "Common misconception or wrong approach",
         correct: false
       },
       {
         id: "a3",
         text: "Another plausible but incorrect answer",
         correct: false
       }
     ],
     explanation: "This explains why the answer is correct and why others are wrong. Teach the concept here."
   }
   ```
4. **Verify clarity**: Read the question aloud - is it clear what's being asked?
5. **Verify answers**: Only one should be correct, explanation should teach

## Best Practices

- Start with easier questions to build confidence
- Cover multiple angles of the concept
- Use real-world examples in explanations
- Avoid "gotcha" questions
- Each answer should be roughly the same length
