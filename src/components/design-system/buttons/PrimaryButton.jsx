import React from 'react';

/**
 * PrimaryButton — filled brand action button.
 * Sharp-cornered, Lexend 14/20. Sizes: big (h40) / small (h32).
 */
export function PrimaryButton({
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
        border: 'none',
        borderRadius: 'var(--radius-none)',
        background: disabled ? 'var(--grey-300)' : 'var(--color-primary)',
        color: disabled ? 'var(--grey-500)' : 'var(--text-on-brand)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-regular)',
        fontSize: 'var(--text-sm)',
        lineHeight: 'var(--lh-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap',
        transition: 'background 120ms ease',
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.background = 'var(--color-primary-active)'; }}
      onMouseUp={(e) => { if (!disabled) e.currentTarget.style.background = 'var(--color-primary-hover)'; }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'var(--color-primary-hover)'; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = 'var(--color-primary)'; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

export default PrimaryButton;
