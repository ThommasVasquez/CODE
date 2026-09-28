'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface IOSHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export const IOSHeader: React.FC<IOSHeaderProps> = ({ title, subtitle, rightAction }) => {
  const { popView, t, theme } = useApp();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px 12px 10px',
        backgroundColor: theme === 'dark' ? 'rgba(9, 12, 16, 0.86)' : 'rgba(241, 244, 248, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid rgba(15, 23, 42, 0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        color: 'var(--text-primary)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <button
        onClick={popView}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          color: 'var(--accent-green)',
          fontSize: '15px',
          fontWeight: 700,
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '12px',
        }}
      >
        <ChevronLeft size={22} color="var(--accent-green)" strokeWidth={2.5} />
        {t('back')}
      </button>

      <div style={{ textAlign: 'center', maxWidth: '190px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, letterSpacing: '-0.2px' }}>
          {title}
        </h2>
        {subtitle && (
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>
            {subtitle}
          </span>
        )}
      </div>

      <div style={{ minWidth: '48px', display: 'flex', justifyContent: 'flex-end' }}>
        {rightAction || <div style={{ width: '32px' }} />}
      </div>
    </div>
  );
};
