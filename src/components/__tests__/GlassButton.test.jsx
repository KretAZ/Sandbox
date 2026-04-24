import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlassButton } from '../GlassButton';

describe('GlassButton', () => {
  it('should render button with children', () => {
    render(<GlassButton>Click me</GlassButton>);

    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should apply default size (md)', () => {
    const { container } = render(<GlassButton>Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('px-4');
    expect(button.className).toContain('py-2');
    expect(button.className).toContain('text-base');
  });

  it('should apply size small', () => {
    const { container } = render(<GlassButton size="sm">Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('px-3');
    expect(button.className).toContain('py-1');
    expect(button.className).toContain('text-sm');
  });

  it('should apply size large', () => {
    const { container } = render(<GlassButton size="lg">Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('px-6');
    expect(button.className).toContain('py-3');
    expect(button.className).toContain('text-lg');
  });

  it('should apply primary variant by default', () => {
    const { container } = render(<GlassButton>Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('from-primary');
    expect(button.className).toContain('to-secondary');
  });

  it('should apply secondary variant', () => {
    const { container } = render(<GlassButton variant="secondary">Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('bg-secondary');
  });

  it('should apply glass variant', () => {
    const { container } = render(<GlassButton variant="glass">Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('glass-effect');
  });

  it('should apply outline variant', () => {
    const { container } = render(<GlassButton variant="outline">Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('border-2');
    expect(button.className).toContain('border-primary');
    expect(button.className).toContain('text-primary');
  });

  it('should call onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<GlassButton onClick={handleClick}>Click me</GlassButton>);

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <GlassButton onClick={handleClick} disabled>
        Click me
      </GlassButton>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<GlassButton disabled>Disabled Button</GlassButton>);

    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it('should apply disabled opacity', () => {
    const { container } = render(<GlassButton disabled>Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('opacity-50');
    expect(button.className).toContain('cursor-not-allowed');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <GlassButton className="custom-class">Button</GlassButton>
    );
    const button = container.querySelector('button');

    expect(button.className).toContain('custom-class');
  });

  it('should apply rounded-xl', () => {
    const { container } = render(<GlassButton>Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('rounded-xl');
  });

  it('should apply font-semibold', () => {
    const { container } = render(<GlassButton>Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('font-semibold');
  });

  it('should have transition-all', () => {
    const { container } = render(<GlassButton>Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('transition-all');
  });

  it('should render with different text content', () => {
    render(<GlassButton>Save Changes</GlassButton>);

    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  it('should render with JSX children', () => {
    render(
      <GlassButton>
        <span>Icon</span> Button Text
      </GlassButton>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Button Text')).toBeInTheDocument();
  });

  it('should handle multiple click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<GlassButton onClick={handleClick}>Click me</GlassButton>);

    const button = screen.getByRole('button', { name: /click me/i });

    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it('should have cursor-pointer when not disabled', () => {
    const { container } = render(<GlassButton>Button</GlassButton>);
    const button = container.querySelector('button');

    expect(button.className).toContain('cursor-pointer');
  });

  it('should combine size, variant, and custom classes', () => {
    const { container } = render(
      <GlassButton size="lg" variant="outline" className="my-custom-style">
        Custom Button
      </GlassButton>
    );
    const button = container.querySelector('button');

    expect(button.className).toContain('px-6');
    expect(button.className).toContain('border-2');
    expect(button.className).toContain('my-custom-style');
  });
});
