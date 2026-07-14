import React, { useState } from 'react';
import { Icon } from '../design-system/icons/Icon';
import { PrimaryButton } from '../design-system/buttons/PrimaryButton';

const PRIORITY_COLORS = {
  Pilny: { bg: 'var(--danger-50)', fg: 'var(--danger-500)' },
  Wysoki: { bg: '#FEF3E2', fg: 'var(--warning-600)' },
  Średni: { bg: '#FDF6E3', fg: '#B7860B' },
  Niski: { bg: 'var(--success-50)', fg: 'var(--success-500)' },
};

const SLA_COLOR = (hours) => {
  if (hours <= 4) return 'var(--danger-500)';
  if (hours <= 12) return 'var(--warning-500)';
  if (hours <= 24) return 'var(--warning-300)';
  return 'var(--success-500)';
};

/**
 * CaseTable — displays the case list with columns and interactions
 */
export function CaseTable({ cases = [], onRowSelect = () => {} }) {
  const [selectedCase, setSelectedCase] = useState(null);

  const handleRowClick = (caseId) => {
    setSelectedCase(caseId);
    onRowSelect(caseId);
  };

  const columns = ['Nr sprawy', 'Klient', 'Broker', 'Linia/typ ubezp.', 'Priorytet', 'Underwriter', 'Data wpływu', 'SLA'];

  return (
    <section
      style={{
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 20px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
          Lista spraw <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>({cases.length})</span>
        </h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              height: 36,
              padding: '6px 14px',
              border: 'none',
              borderRadius: 0,
              background: 'transparent',
              color: 'var(--text-secondary)',
              boxShadow: 'inset 0 0 0 1px var(--border-default)',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 120ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-subtle)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <Icon name="search" size={16} />
            Wyszukaj sprawę
          </button>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              height: 36,
              padding: '6px 14px',
              border: 'none',
              borderRadius: 0,
              background: 'transparent',
              color: 'var(--text-secondary)',
              boxShadow: 'inset 0 0 0 1px var(--border-default)',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 120ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-subtle)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <Icon name="filter" size={16} />
            Filtry
            <Icon name="chevronDown" size={14} />
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px 16px' }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Filtry:</span>
        {['Broker', 'Produkt', 'Priorytet', 'SLA'].map((f) => (
          <span
            key={f}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 12px',
              fontSize: 13,
              color: 'var(--text-secondary)',
              background: 'var(--surface-subtle)',
              boxShadow: 'inset 0 0 0 1px var(--border-default)',
              borderRadius: 2,
              cursor: 'pointer',
            }}
          >
            {f} <Icon name="chevronDown" size={13} />
          </span>
        ))}
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 14,
          }}
        >
          <thead>
            <tr style={{ background: 'var(--surface-subtle)', color: 'var(--text-secondary)', textAlign: 'left' }}>
              {columns.map((c) => (
                <th key={c} style={{ padding: '11px 16px', fontWeight: 500, fontSize: 12, whiteSpace: 'nowrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {c}
                    <Icon name="sort" size={12} style={{ opacity: 0.5 }} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cases.map((row) => {
              const priority = PRIORITY_COLORS[row.priority];
              return (
                <tr
                  key={row.id}
                  onClick={() => handleRowClick(row.id)}
                  style={{
                    cursor: 'pointer',
                    borderTop: '1px solid var(--border-subtle)',
                    background: selectedCase === row.id ? 'var(--brand-50)' : 'transparent',
                    transition: 'background 120ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCase !== row.id) {
                      e.currentTarget.style.background = 'var(--surface-subtle)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCase !== row.id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <td style={{ padding: '13px 16px', color: 'var(--brand-500)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {row.id}
                  </td>
                  <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>{row.client}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {row.broker}
                  </td>
                  <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {row.product}
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '3px 10px',
                        fontSize: 12,
                        fontWeight: 500,
                        color: priority.fg,
                        background: priority.bg,
                        whiteSpace: 'nowrap',
                        borderRadius: 2,
                      }}
                    >
                      {row.priority === 'Pilny' && <Icon name="alert" size={12} />}
                      {row.priority}
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>{row.underwriter}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {row.date}
                  </td>
                  <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          width: 34,
                          height: 4,
                          borderRadius: 2,
                          background: SLA_COLOR(row.slaHours),
                        }}
                      />
                      <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{row.sla}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderTop: '1px solid var(--border-subtle)',
          color: 'var(--text-tertiary)',
          fontSize: 13,
        }}
      >
        <span>Wyświetlono {cases.length} z {cases.length} spraw</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            style={{
              minWidth: 28,
              height: 28,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              fontSize: 13,
              cursor: 'pointer',
              background: 'transparent',
              color: 'var(--text-secondary)',
              boxShadow: 'inset 0 0 0 1px var(--border-default)',
              border: 'none',
            }}
          >
            <Icon name="chevronLeft" size={14} />
          </button>
          <span
            style={{
              minWidth: 28,
              height: 28,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              fontSize: 13,
              background: 'var(--brand-500)',
              color: '#fff',
            }}
          >
            1
          </span>
          <button
            style={{
              minWidth: 28,
              height: 28,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              fontSize: 13,
              cursor: 'pointer',
              background: 'transparent',
              color: 'var(--text-secondary)',
              boxShadow: 'inset 0 0 0 1px var(--border-default)',
              border: 'none',
            }}
          >
            <Icon name="chevronLeft" size={14} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CaseTable;
