import React, { useState } from 'react';

/**
 * Checkbox — custom checkbox control.
 * Sharp-cornered, brand color on checked. Accessible with label.
 */
export function Checkbox({
  label = '',
  checked = false,
  disabled = false,
  onChange = () => {},
  id,
  style = {},
  ...rest
}) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>
      <div style={{
        position: 'relative',
        width: 20,
        height: 20,
        flexShrink: 0,
      }}>
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          style={{
            position: 'absolute',
            opacity: 0,
            width: 0,
            height: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          {...rest}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          borderRadius: 'var(--radius-none)',
          border: `1px solid ${isChecked ? 'var(--color-primary)' : 'var(--border-default)'}`,
          background: isChecked ? 'var(--color-primary)' : disabled ? 'var(--surface-subtle)' : 'var(--surface-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 120ms ease',
        }}>
          {isChecked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6l3 3 5-5" stroke="var(--text-on-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      {label && <span style={{ color: disabled ? 'var(--text-tertiary)' : 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>{label}</span>}
    </label>
  );
}

export default Checkbox;
