'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Home, Activity, User } from 'lucide-react';
import { useApp, MainTab } from '@/context/AppContext';

export const BottomDock: React.FC = () => {
  const { activeTab, setActiveTab, activeSubView, theme } = useApp();
  const pillIndicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabIndexMap: Record<MainTab, number> = {
    home: 0,
    statistics: 1,
    options: 2,
  };

  const currentIdx = tabIndexMap[activeTab] ?? 0;

  useEffect(() => {
    if (!pillIndicatorRef.current || !containerRef.current) return;

    // Positions for 3 buttons in 180px width dock
    const positions = [6, 62, 118];
    const targetX = positions[currentIdx] ?? 6;

    gsap.to(pillIndicatorRef.current, {
      x: targetX,
      duration: 0.45,
      ease: 'back.out(1.4)',
    });
  }, [currentIdx]);

  return (
    <div style={{
      position: 'absolute',
      bottom: '22px',
      left: '0',
      right: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 60,
      pointerEvents: 'none',
      opacity: activeSubView === 'scan' ? 0 : 1,
      transition: 'opacity 0.2s ease',
    }}>
      {/* Floating Pill Bar */}
      <div
        ref={containerRef}
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          width: '180px',
          height: '58px',
          backgroundColor: theme === 'dark' ? '#1A212B' : '#FFFFFF',
          borderRadius: '35px',
          boxShadow: theme === 'dark' ? '0 10px 30px rgba(0, 0, 0, 0.6)' : '0 10px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(220, 226, 230, 0.7)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 6px',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Animated Dark Pill Slider */}
        <div
          ref={pillIndicatorRef}
          style={{
            position: 'absolute',
            top: '6px',
            left: '0',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: theme === 'dark' ? '#2A3342' : '#121417',
            zIndex: 1,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'background-color 0.3s ease',
          }}
        />

        {/* Tab 0: Home */}
        <button
          onClick={() => setActiveTab('home')}
          style={{
            flex: 1,
            height: '100%',
            background: 'none',
            border: 'none',
            zIndex: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.25s ease',
          }}
          aria-label="Home Dashboard"
        >
          <Home
            size={21}
            color={activeTab === 'home' ? '#FFFFFF' : (theme === 'dark' ? '#8696A6' : '#4A5568')}
            strokeWidth={activeTab === 'home' ? 2.5 : 2}
          />
        </button>

        {/* Tab 1: Stats */}
        <button
          onClick={() => setActiveTab('statistics')}
          style={{
            flex: 1,
            height: '100%',
            background: 'none',
            border: 'none',
            zIndex: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.25s ease',
          }}
          aria-label="Statistics Report"
        >
          <Activity
            size={22}
            color={activeTab === 'statistics' ? '#FFFFFF' : (theme === 'dark' ? '#8696A6' : '#4A5568')}
            strokeWidth={activeTab === 'statistics' ? 2.5 : 2}
          />
        </button>

        {/* Tab 2: Profile / More Options */}
        <button
          onClick={() => setActiveTab('options')}
          style={{
            flex: 1,
            height: '100%',
            background: 'none',
            border: 'none',
            zIndex: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.25s ease',
          }}
          aria-label="Perfil y Ajustes"
          title="Perfil y Ajustes"
        >
          <User
            size={21}
            color={activeTab === 'options' ? '#FFFFFF' : (theme === 'dark' ? '#8696A6' : '#4A5568')}
            strokeWidth={activeTab === 'options' ? 2.5 : 2}
          />
        </button>
      </div>

      {/* iOS Home Indicator */}
      <div
        style={{
          width: '134px',
          height: '4px',
          backgroundColor: theme === 'dark' ? '#FFFFFF' : '#0E1116',
          opacity: theme === 'dark' ? 0.6 : 1,
          borderRadius: '10px',
          marginTop: '12px',
        }}
      />
    </div>
  );
};
