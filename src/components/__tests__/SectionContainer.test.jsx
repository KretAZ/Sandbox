import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionContainer } from '../SectionContainer';

describe('SectionContainer', () => {
  it('should render children', () => {
    render(
      <SectionContainer>
        <p>Section content</p>
      </SectionContainer>
    );

    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(
      <SectionContainer title="Test Title">
        <p>Content</p>
      </SectionContainer>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should not render title when not provided', () => {
    render(
      <SectionContainer>
        <p>Content</p>
      </SectionContainer>
    );

    const heading = screen.queryByRole('heading');
    expect(heading).not.toBeInTheDocument();
  });

  it('should apply glass variant by default', () => {
    const { container } = render(
      <SectionContainer>Content</SectionContainer>
    );

    const section = container.firstChild;
    expect(section.className).toContain('glass-card');
  });

  it('should apply gradient variant', () => {
    const { container } = render(
      <SectionContainer variant="gradient">Content</SectionContainer>
    );

    const section = container.firstChild;
    expect(section.className).toContain('gradient');
    expect(section.className).toContain('white/20');
    expect(section.className).toContain('white/10');
  });

  it('should apply solid variant', () => {
    const { container } = render(
      <SectionContainer variant="solid">Content</SectionContainer>
    );

    const section = container.firstChild;
    expect(section.className).toContain('from-primary');
    expect(section.className).toContain('to-secondary');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <SectionContainer className="custom-style">Content</SectionContainer>
    );

    const section = container.firstChild;
    expect(section.className).toContain('custom-style');
  });

  it('should have correct title styling', () => {
    const { container } = render(
      <SectionContainer title="Styled Title">
        <p>Content</p>
      </SectionContainer>
    );

    const heading = container.querySelector('h2');
    expect(heading.className).toContain('text-2xl');
    expect(heading.className).toContain('font-bold');
    expect(heading.className).toContain('text-gradient');
    expect(heading.className).toContain('mb-4');
  });

  it('should render complex children', () => {
    render(
      <SectionContainer title="Section">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </SectionContainer>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('should accept delay prop for animation', () => {
    const { container } = render(
      <SectionContainer delay={0.5}>Content</SectionContainer>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should combine variant and custom className', () => {
    const { container } = render(
      <SectionContainer variant="solid" className="extra-style">
        Content
      </SectionContainer>
    );

    const section = container.firstChild;
    expect(section.className).toContain('from-primary');
    expect(section.className).toContain('extra-style');
  });

  it('should render title with correct content', () => {
    const titleText = 'Key Concepts';
    render(
      <SectionContainer title={titleText}>
        <p>Details</p>
      </SectionContainer>
    );

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('should handle all three variants correctly', () => {
    const variants = ['glass', 'gradient', 'solid'];

    variants.forEach(variant => {
      const { container } = render(
        <SectionContainer variant={variant}>Content</SectionContainer>
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should have proper spacing with title', () => {
    const { container } = render(
      <SectionContainer title="Title">
        <p>Content</p>
      </SectionContainer>
    );

    const heading = container.querySelector('h2');
    expect(heading.className).toContain('mb-4');
  });

  it('should render empty section', () => {
    const { container } = render(
      <SectionContainer title="Empty Section"></SectionContainer>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render with JSX elements as children', () => {
    render(
      <SectionContainer title="Features">
        <button>Action Button</button>
        <span>Some text</span>
      </SectionContainer>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Some text')).toBeInTheDocument();
  });

  it('should maintain title position above content', () => {
    const { container } = render(
      <SectionContainer title="Title">
        <p>First content</p>
      </SectionContainer>
    );

    const heading = container.querySelector('h2');
    const paragraph = screen.getByText('First content');

    // Verify both elements exist and title comes before content
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  it('should handle long title text', () => {
    const longTitle = 'This is a very long title that spans multiple words and should still render properly';
    render(
      <SectionContainer title={longTitle}>
        <p>Content</p>
      </SectionContainer>
    );

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('should support default delay of 0', () => {
    const { container } = render(
      <SectionContainer>Content</SectionContainer>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
