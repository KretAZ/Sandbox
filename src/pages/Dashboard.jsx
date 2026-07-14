import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { StatCard } from '../components/dashboard/StatCard';
import { CaseTable } from '../components/dashboard/CaseTable';
import { PrimaryButton } from '../components/design-system/buttons/PrimaryButton';
import { Icon } from '../components/design-system/icons/Icon';
import { mockCases } from '../data/mockCases';

/**
 * Dashboard — main Ofertownik+ dashboard (Panel Główny)
 * Shows case statistics and case list table
 */
export function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [selectedCase, setSelectedCase] = useState(null);

  // Get current date in Polish format
  const today = new Date();
  const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
  const months = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
  const dateString = `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

  // Calculate stats
  const urgentCount = mockCases.filter((c) => c.priority === 'Pilny').length;
  const newCount = 0;
  const inProgressCount = mockCases.filter((c) => c.priority === 'Wysoki').length;
  const missingDocsCount = 5;

  const stats = [
    { icon: 'alert', label: 'Pilne', value: urgentCount, color: 'var(--danger-500)' },
    { icon: 'mail', label: 'Nowe sprawy', value: newCount, color: 'var(--brand-500)' },
    { icon: 'clock', label: 'Sprawy w toku', value: inProgressCount, color: 'var(--brand-500)' },
    { icon: 'document', label: 'Braki dokumentów', value: missingDocsCount, color: 'var(--warning-600)' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-sans)', backgroundColor: 'var(--surface-page)', color: 'var(--text-primary)' }}>
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Main Content */}
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px 32px',
            background: 'var(--surface-card)',
            borderBottom: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-.01em' }}>Panel Główny</h1>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 3 }}>{dateString}</div>
          </div>
          <PrimaryButton size="big" iconLeft={<Icon name="plus" size={16} />}>
            Dodaj nową sprawę
          </PrimaryButton>
        </header>

        {/* Content */}
        <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1, overflow: 'auto' }}>
          {/* Stats Grid */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          {/* Case Table */}
          <CaseTable cases={mockCases} onRowSelect={setSelectedCase} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
