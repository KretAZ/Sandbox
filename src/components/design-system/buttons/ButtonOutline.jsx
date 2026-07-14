import React from 'react';

/**
 * ButtonOutline — outline-style button.
 * Sharp-cornered, brand border, text color. Fills with brand tint on hover.
 * Sizes: big (h40) / small (h32).
 */
export function ButtonOutline({
  children,
  size = 'big',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const pad = size === 'big' ? '8px 24px' : '6px 16px';
  const height = size === 'big' ? 40 : 32;

  return (
    <button
      disabled={disabled}
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        height,
        padding: pad,
        border: `1px solid ${disabled ? 'var(--grey-300)' : 'var(--color-primary)'}`,
        borderRadius: 'var(--radius-none)',
        background: disabled ? 'var(--surface-page)' : 'transparent',
        color: disabled ? 'var(--grey-500)' : 'var(--color-primary)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-regular)',
        fontSize: 'var(--text-sm)',
        lineHeight: 'var(--lh-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap',
        transition: 'background 120ms ease, color 120ms ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = 'var(--color-primary-tint)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = 'transparent';
        }
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

export default ButtonOutline;
