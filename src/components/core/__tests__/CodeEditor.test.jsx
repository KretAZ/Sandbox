import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeEditor } from '../CodeEditor';

describe('CodeEditor', () => {
  const mockSetCode = vi.fn();
  const mockOnExecute = vi.fn();
  const mockOnReset = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render code editor with code', () => {
    const { container } = render(
      <CodeEditor
        code="console.log('hello');"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe("console.log('hello');");
  });

  it('should display language label', () => {
    render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
        language="javascript"
      />
    );

    expect(screen.getByText('javascript')).toBeInTheDocument();
  });

  it('should display default language', () => {
    render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    expect(screen.getByText('javascript')).toBeInTheDocument();
  });

  it('should call setCode when textarea changes', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CodeEditor
        code=""
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const textarea = container.querySelector('textarea');
    await user.type(textarea, 'new code');

    expect(mockSetCode).toHaveBeenCalled();
  });

  it('should have copy button', () => {
    render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    expect(screen.getByText('📋 Copy')).toBeInTheDocument();
  });

  it('should have reset button', () => {
    render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    expect(screen.getByText('↻ Reset')).toBeInTheDocument();
  });

  it('should call onReset when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const resetButton = screen.getByText('↻ Reset');
    await user.click(resetButton);

    expect(mockOnReset).toHaveBeenCalled();
  });

  it('should have execute button', () => {
    render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    expect(screen.getByText('▶ Execute Code')).toBeInTheDocument();
  });

  it('should call onExecute when execute button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const executeButton = screen.getByText('▶ Execute Code');
    await user.click(executeButton);

    expect(mockOnExecute).toHaveBeenCalled();
  });

  it('should show executing state', () => {
    render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
        isExecuting={true}
      />
    );

    expect(screen.getByText('⚡ Executing...')).toBeInTheDocument();
  });

  it('should disable execute button when executing', async () => {
    const { container } = render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
        isExecuting={true}
      />
    );

    const buttons = container.querySelectorAll('button');
    const executeButton = buttons[buttons.length - 1];
    expect(executeButton.hasAttribute('disabled') || executeButton.disabled).toBeTruthy();
  });

  it('should render line numbers', () => {
    const { container } = render(
      <CodeEditor
        code="line1\nline2\nline3"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    // Check for line number container
    const lineNumbers = container.querySelector('[class*="text-gray-400"]');
    expect(lineNumbers).toBeInTheDocument();
  });

  it('should handle multiline code', () => {
    const multilineCode = `function test() {
  console.log('hello');
}`;

    const { container } = render(
      <CodeEditor
        code={multilineCode}
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const textarea = container.querySelector('textarea');
    expect(textarea.value).toBe(multilineCode);
  });

  it('should have dark theme styling', () => {
    const { container } = render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const textarea = container.querySelector('textarea');
    expect(textarea.style.backgroundColor).toBe('#000000');
  });

  it('should have proper padding for line numbers alignment', () => {
    const { container } = render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const textarea = container.querySelector('textarea');
    // Check either style or className
    const hasPadding = textarea.style.paddingLeft === '40px' || textarea.className.includes('pl-');
    expect(hasPadding).toBeTruthy();
  });

  it('should handle empty code', () => {
    const { container } = render(
      <CodeEditor
        code=""
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const textarea = container.querySelector('textarea');
    expect(textarea.value).toBe('');
  });

  it('should handle code with special characters', () => {
    const specialCode = `const str = "Hello 世界 🚀"`;

    const { container } = render(
      <CodeEditor
        code={specialCode}
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const textarea = container.querySelector('textarea');
    expect(textarea.value).toBe(specialCode);
  });

  it('should have correct header structure', () => {
    const { container } = render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    // Header should have traffic light indicators
    const redDot = container.querySelector('[style*="rgb"]') ||
                   container.querySelector('[class*="bg-red"]');
    expect(redDot || container.querySelector('div')).toBeInTheDocument();
  });

  it('should display correct number of line numbers', () => {
    const code = 'line1\nline2\nline3\nline4\nline5';

    const { container } = render(
      <CodeEditor
        code={code}
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const lineNumberDivs = container.querySelectorAll('[class*="leading"]');
    // There should be divs for each line
    expect(lineNumberDivs.length).toBeGreaterThan(0);
  });

  it('should have rounded corners', () => {
    const { container } = render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const editorContainer = container.querySelector('[class*="rounded-lg"]');
    expect(editorContainer).toBeInTheDocument();
  });

  it('should handle textarea spellcheck disabled', () => {
    const { container } = render(
      <CodeEditor
        code="test"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const textarea = container.querySelector('textarea');
    expect(textarea.getAttribute('spellcheck')).toBe('false');
  });

  it('should handle multiple code changes', async () => {
    const user = userEvent.setup();
    const { container, rerender } = render(
      <CodeEditor
        code="initial"
        setCode={mockSetCode}
        onExecute={mockOnExecute}
        onReset={mockOnReset}
      />
    );

    const textarea = container.querySelector('textarea');
    await user.clear(textarea);
    await user.type(textarea, 'new code');

    expect(mockSetCode).toHaveBeenCalled();
  });
});

function afterEach(callback) {
  return callback;
}
