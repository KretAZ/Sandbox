import React from 'react';
import { Icon } from '../design-system/icons/Icon';

/**
 * StatCard — displays a statistic with icon, label, and value
 */
export function StatCard({ icon, label, value, color = 'var(--brand-500)' }) {
  return (
    <div
      style={{
        flex: 1,
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
        padding: '16px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        minWidth: 0,
      }}
    >
      <span
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: 'var(--surface-subtle)',
          color,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={20} />
      </span>
      <div style={{ lineHeight: 1.15, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 700, marginTop: 2, color: 'var(--text-primary)' }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
