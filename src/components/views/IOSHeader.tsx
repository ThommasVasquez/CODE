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
  const { popView } = useApp();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px 12px 12px',
        backgroundColor: '#F4F6F8',
        borderBottom: '1px solid rgba(220, 226, 230, 0.6)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
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
          color: '#102227',
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
          padding: '4px 6px',
          borderRadius: '8px',
        }}
      >
        <ChevronLeft size={22} color="#102227" strokeWidth={2.5} />
        Atrás
      </button>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0E141B', lineHeight: 1.1 }}>
          {title}
        </h2>
        {subtitle && (
          <span style={{ fontSize: '10.5px', color: '#6A7888', fontWeight: 500 }}>
            {subtitle}
          </span>
        )}
      </div>

      <div style={{ minWidth: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        {rightAction || <div style={{ width: '32px' }} />}
      </div>
    </div>
  );
};
