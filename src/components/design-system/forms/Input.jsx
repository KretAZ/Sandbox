import React from 'react';

/**
 * Input — text input field.
 * Sharp-cornered, inset border shadow, focus state with brand outline.
 * Validation states: danger (red), success (green).
 */
export function Input({
  placeholder = '',
  disabled = false,
  status = 'default', // 'default' | 'danger' | 'success'
  style = {},
  ...rest
}) {
  const statusBg = status === 'danger' ? 'rgba(237, 28, 36, 0.05)' : status === 'success' ? 'rgba(40, 161, 90, 0.05)' : 'transparent';
  const statusBorder = status === 'danger' ? '#ed1c24' : status === 'success' ? '#28a15a' : 'var(--border-strong)';

  return (
    <input
      disabled={disabled}
      placeholder={placeholder}
      style={{
        width: '100%',
        height: 40,
        padding: '0 12px',
        border: 'none',
        borderRadius: 'var(--radius-none)',
        background: disabled ? 'var(--surface-subtle)' : statusBg,
        color: disabled ? 'var(--text-tertiary)' : 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-regular)',
        fontSize: 'var(--text-sm)',
        lineHeight: 'var(--lh-sm)',
        boxShadow: `inset 0 0 0 1px ${disabled ? 'var(--border-default)' : statusBorder}, 0px 1px 2px 0px rgba(0,0,0,0.12)`,
        transition: 'all 120ms ease',
        cursor: disabled ? 'not-allowed' : 'text',
        ...style,
      }}
      onFocus={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = `inset 0 0 0 2px var(--color-primary), 0px 1px 2px 0px rgba(0,0,0,0.12)`;
        }
      }}
      onBlur={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${statusBorder}, 0px 1px 2px 0px rgba(0,0,0,0.12)`;
        }
      }}
      {...rest}
    />
  );
}

export default Input;
