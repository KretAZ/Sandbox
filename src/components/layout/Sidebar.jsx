import React, { useState } from 'react';
import { Icon } from '../design-system/icons/Icon';

const navItems = [
  { icon: 'panel', label: 'Panel Główny', id: 'dashboard', badge: 0 },
  { icon: 'list', label: 'Lista spraw', id: 'cases', badge: 0 },
  { icon: 'bell', label: 'Powiadomienia', id: 'notifications', badge: 4 },
  { icon: 'mail', label: 'Korespondencja', id: 'correspondence', badge: 0 },
  { icon: 'gear', label: 'Ustawienia', id: 'settings', badge: 0 },
];

/**
 * Sidebar — fixed left navigation with user profile
 */
export function Sidebar({ activeNav = 'dashboard', onNavChange = () => {} }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? 60 : 236,
        background: 'var(--surface-sidebar)',
        color: 'var(--text-on-sidebar)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        minHeight: '100vh',
        transition: 'width 200ms ease',
        borderRight: '1px solid var(--border-strong)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 20px 26px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {!collapsed && (
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-.01em' }}>
            Ofertownik<span style={{ color: 'var(--brand-500)' }}>+</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title="Zwiń / rozwiń menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
          }}
        >
          <Icon name="chevronLeft" size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          padding: '0 12px',
          flex: 1,
        }}
      >
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavChange(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '11px 14px',
              cursor: 'pointer',
              borderRadius: 8,
              fontSize: 14,
              lineHeight: '20px',
              background: activeNav === item.id ? 'var(--brand-500)' : 'transparent',
              color: activeNav === item.id ? '#fff' : 'rgba(255,255,255,0.82)',
              fontWeight: activeNav === item.id ? 500 : 400,
              transition: 'all 120ms ease',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              if (activeNav !== item.id) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== item.id) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <Icon name={item.icon} size={20} />
            {!collapsed && (
              <>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge > 0 && (
                  <span
                    style={{
                      minWidth: 20,
                      height: 20,
                      borderRadius: 999,
                      background: activeNav === item.id ? 'rgba(255,255,255,0.25)' : 'var(--brand-500)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          margin: 16,
          padding: '12px 14px',
          background: 'var(--brand-500)',
          borderRadius: 8,
        }}
      >
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.2)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          AK
        </span>
        {!collapsed && (
          <div style={{ lineHeight: 1.3, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Anna Kowalska</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>Underwriter Sr.</div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
