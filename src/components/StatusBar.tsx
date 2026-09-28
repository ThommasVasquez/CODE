'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

interface StatusBarProps {
  useLiveTime?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ useLiveTime = false }) => {
  const [time, setTime] = useState('9:40 PM');
  const { theme, activeSubView } = useApp();
  const isDarkBackground = theme === 'dark' || activeSubView === 'onboarding';
  const iconColor = isDarkBackground ? '#F4F6F8' : '#121820';

  return (
    <div style={{
      width: '100%',
      height: '44px',
      padding: '0 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '14.5px',
      fontWeight: 600,
      color: iconColor,
      letterSpacing: '-0.2px',
      userSelect: 'none',
      zIndex: 40,
      transition: 'color 0.3s ease',
    }}>
      {/* Time */}
      <span style={{ fontWeight: 700, fontSize: '15px' }}>{time}</span>

      {/* iOS Icons (Cellular, WiFi, Battery) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Cellular Bars */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0.5" y="8" width="3" height="4" rx="0.8" fill={iconColor} />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" fill={iconColor} />
          <rect x="9.5" y="3" width="3" height="9" rx="0.8" fill={iconColor} />
          <rect x="14" y="0.5" width="3" height="11.5" rx="0.8" fill={iconColor} />
        </svg>

        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5C8.82843 9.5 9.5 10.1716 9.5 11C9.5 11.8284 8.82843 12.5 8 12.5C7.17157 12.5 6.5 11.8284 6.5 11C6.5 10.1716 7.17157 9.5 8 9.5Z" fill={iconColor} />
          <path d="M4.5 7C5.45 6.1 6.68 5.5 8 5.5C9.32 5.5 10.55 6.1 11.5 7" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M1.5 3.8C3.3 2.1 5.5 1.2 8 1.2C10.5 1.2 12.7 2.1 14.5 3.8" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
        </svg>

        {/* Battery */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1px',
          marginLeft: '2px',
        }}>
          <div style={{
            width: '23px',
            height: '11.5px',
            borderRadius: '4px',
            border: `1.8px solid ${iconColor}`,
            padding: '1.2px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <div style={{
              width: '85%',
              height: '100%',
              backgroundColor: iconColor,
              borderRadius: '1.5px',
            }} />
          </div>
          <div style={{
            width: '1.5px',
            height: '4px',
            backgroundColor: iconColor,
            borderRadius: '0 1px 1px 0',
          }} />
        </div>
      </div>
    </div>
  );
};
