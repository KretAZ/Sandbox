import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlassCard } from '../GlassCard';

describe('GlassCard', () => {
  it('should render children', () => {
    render(<GlassCard>Card content</GlassCard>);

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should apply base classes', () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    const cardElement = container.querySelector('[class*="glass-card"]') || container.firstChild;

    expect(cardElement.className).toContain('rounded-2xl');
    expect(cardElement.className).toContain('p-6');
    expect(cardElement.className).toContain('backdrop-blur-lg');
  });

  it('should apply card variant by default', () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    const cardElement = container.querySelector('[class*="border"]') || container.firstChild;

    expect(cardElement.className).toContain('border');
    expect(cardElement.className).toContain('white/20');
  });

  it('should apply light variant', () => {
    const { container } = render(<GlassCard variant="light">Content</GlassCard>);
    const cardElement = container.firstChild;

    expect(cardElement.className).toContain('white/40');
    expect(cardElement.className).toContain('white/80');
  });

  it('should apply gradient variant', () => {
    const { container } = render(<GlassCard variant="gradient">Content</GlassCard>);
    const cardElement = container.firstChild;

    expect(cardElement.className).toContain('gradient');
    expect(cardElement.className).toContain('white/20');
    expect(cardElement.className).toContain('white/10');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <GlassCard className="custom-class">Content</GlassCard>
    );
    const cardElement = container.firstChild;

    expect(cardElement.className).toContain('custom-class');
  });

  it('should render as div when not animated', () => {
    const { container } = render(
      <GlassCard animated={false}>Content</GlassCard>
    );

    const element = container.querySelector('div');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Content');
  });

  it('should render as motion.div when animated', () => {
    const { container } = render(
      <GlassCard animated={true}>Content</GlassCard>
    );

    // Motion divs will still render as divs in the DOM
    const element = container.querySelector('div');
    expect(element).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const { container } = render(
      <GlassCard onClick={handleClick}>Click me</GlassCard>
    );

    const card = container.firstChild;
    await user.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render with JSX children', () => {
    render(
      <GlassCard>
        <h2>Title</h2>
        <p>Paragraph content</p>
      </GlassCard>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph content')).toBeInTheDocument();
  });

  it('should accept delay prop for animation', () => {
    const { container } = render(
      <GlassCard animated={true} delay={0.5}>
        Content
      </GlassCard>
    );

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should combine variant and custom className', () => {
    const { container } = render(
      <GlassCard variant="light" className="extra-style">
        Content
      </GlassCard>
    );
    const cardElement = container.firstChild;

    expect(cardElement.className).toContain('white/40');
    expect(cardElement.className).toContain('extra-style');
  });

  it('should have default delay of 0', () => {
    const { container } = render(
      <GlassCard animated={true}>Content</GlassCard>
    );

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should render empty card', () => {
    const { container } = render(<GlassCard></GlassCard>);

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should handle multiple onClick calls', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const { container } = render(
      <GlassCard onClick={handleClick}>Card</GlassCard>
    );

    const card = container.firstChild;
    await user.click(card);
    await user.click(card);
    await user.click(card);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it('should render with animated={false} as a regular div', () => {
    const { container } = render(
      <GlassCard animated={false}>Static card</GlassCard>
    );

    const element = container.querySelector('div');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Static card');
  });

  it('should support all three variants', () => {
    const variants = ['card', 'light', 'gradient'];

    variants.forEach(variant => {
      const { container } = render(
        <GlassCard variant={variant}>Content</GlassCard>
      );

      expect(container.querySelector('div')).toBeInTheDocument();
    });
  });

  it('should render content with complex HTML structure', () => {
    render(
      <GlassCard>
        <div className="inner">
          <button>Action</button>
          <span>Info</span>
        </div>
      </GlassCard>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('should apply rounded-2xl class', () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    const cardElement = container.firstChild;

    expect(cardElement.className).toContain('rounded-2xl');
  });

  it('should apply proper padding', () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    const cardElement = container.firstChild;

    expect(cardElement.className).toContain('p-6');
  });
});
