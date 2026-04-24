import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyButton } from '../CopyButton';

describe('CopyButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render button with default label', () => {
    render(<CopyButton text="test code" />);

    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('should render button with custom label', () => {
    render(<CopyButton text="test code" label="📋 Copy Code" />);

    expect(screen.getByText('📋 Copy Code')).toBeInTheDocument();
  });

  it('should copy text to clipboard on click', async () => {
    const user = userEvent.setup();
    const textToCopy = 'const x = 42;';
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(<CopyButton text={textToCopy} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(writeTextSpy).toHaveBeenCalledWith(textToCopy);
  });

  it('should show copied feedback', async () => {
    const user = userEvent.setup();

    render(<CopyButton text="test" />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('✓ Copied!')).toBeInTheDocument();
  });

  it('should reset feedback after 2 seconds', async () => {
    const user = userEvent.setup();
    vi.useFakeTimers();

    render(<CopyButton text="test" label="Copy" />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('✓ Copied!')).toBeInTheDocument();

    vi.advanceTimersByTime(2000);

    expect(screen.getByText('Copy')).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('should have correct styling when not copied', () => {
    const { container } = render(<CopyButton text="test" />);

    const button = container.querySelector('button');
    expect(button.className).toContain('bg-white/10');
    expect(button.className).toContain('text-white');
    expect(button.className).toContain('border-white/20');
  });

  it('should have correct styling when copied', async () => {
    const user = userEvent.setup();
    const { container } = render(<CopyButton text="test" />);

    const button = container.querySelector('button');
    await user.click(button);

    await waitFor(() => {
      expect(button.className).toContain('bg-green-500/20');
      expect(button.className).toContain('text-green-400');
      expect(button.className).toContain('border-green-500/40');
    });
  });

  it('should have correct button classes', () => {
    const { container } = render(<CopyButton text="test" />);

    const button = container.querySelector('button');
    expect(button.className).toContain('px-3');
    expect(button.className).toContain('py-2');
    expect(button.className).toContain('rounded-lg');
    expect(button.className).toContain('font-semibold');
    expect(button.className).toContain('text-sm');
    expect(button.className).toContain('transition-all');
  });

  it('should handle empty text', async () => {
    const user = userEvent.setup();
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(<CopyButton text="" />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(writeTextSpy).toHaveBeenCalledWith('');
  });

  it('should handle multiline text', async () => {
    const user = userEvent.setup();
    const multilineText = `function test() {
  return 42;
}`;
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(<CopyButton text={multilineText} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(writeTextSpy).toHaveBeenCalledWith(multilineText);
  });

  it('should handle special characters', async () => {
    const user = userEvent.setup();
    const specialText = 'Hello 世界 🚀 !@#$%^&*()';
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(<CopyButton text={specialText} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(writeTextSpy).toHaveBeenCalledWith(specialText);
  });

  it('should handle long text', async () => {
    const user = userEvent.setup();
    const longText = 'a'.repeat(5000);
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(<CopyButton text={longText} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(writeTextSpy).toHaveBeenCalledWith(longText);
  });

  it('should handle multiple consecutive clicks', async () => {
    const user = userEvent.setup();
    const text = 'click me';
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(<CopyButton text={text} />);

    const button = screen.getByRole('button');

    await user.click(button);
    expect(writeTextSpy).toHaveBeenCalledTimes(1);

    await user.click(button);
    expect(writeTextSpy).toHaveBeenCalledTimes(2);
  });

  it('should handle clipboard copy failure gracefully', async () => {
    const user = userEvent.setup();
    navigator.clipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<CopyButton text="test" />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should have hover state', () => {
    const { container } = render(<CopyButton text="test" />);

    const button = container.querySelector('button');
    expect(button.className).toContain('hover:bg-white/20');
  });

  it('should render as button element', () => {
    render(<CopyButton text="test" />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle null text gracefully', async () => {
    const user = userEvent.setup();

    render(<CopyButton text={null} />);

    const button = screen.getByRole('button');
    await user.click(button);

    // Should handle null - either by converting or error handling
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('should not throw error on unmount during timeout', async () => {
    const user = userEvent.setup();
    vi.useFakeTimers();

    const { unmount } = render(<CopyButton text="test" />);

    const button = screen.getByRole('button');
    await user.click(button);

    unmount();

    expect(() => {
      vi.advanceTimersByTime(2000);
    }).not.toThrow();

    vi.restoreAllMocks();
  });

  it('should update state immediately on click', async () => {
    const user = userEvent.setup();

    render(<CopyButton text="test" />);

    const button = screen.getByRole('button');

    expect(screen.getByText('Copy')).toBeInTheDocument();

    await user.click(button);

    expect(screen.getByText('✓ Copied!')).toBeInTheDocument();
  });

  it('should have correct initial state', () => {
    render(<CopyButton text="test" label="MyLabel" />);

    expect(screen.getByText('MyLabel')).toBeInTheDocument();
    expect(screen.queryByText('✓ Copied!')).not.toBeInTheDocument();
  });

  it('should handle default label correctly', () => {
    render(<CopyButton text="some code" />);

    expect(screen.getByText('Copy')).toBeInTheDocument();
  });
});
