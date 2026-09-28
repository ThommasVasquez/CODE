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

    // Perfectly centered positions for 3 slots in 192px dock (slot width = 64px, pill = 50px, margin = 7px)
    const positions = [7, 71, 135];
    const targetX = positions[currentIdx] ?? 7;

    gsap.to(pillIndicatorRef.current, {
      x: targetX,
      duration: 0.4,
      ease: 'back.out(1.5)',
    });
  }, [currentIdx]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '16px',
        left: '0',
        right: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 60,
        pointerEvents: activeSubView ? 'none' : 'auto',
        transform: activeSubView ? 'translateY(120%)' : 'translateY(0%)',
        opacity: activeSubView ? 0 : 1,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
      }}
    >
      {/* Floating Pill Dock */}
      <div
        ref={containerRef}
        className="glass-dock"
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          width: '192px',
          height: '60px',
          backgroundColor: theme === 'dark' ? 'rgba(18, 23, 32, 0.82)' : 'rgba(255, 255, 255, 0.88)',
          borderRadius: '35px',
          boxShadow: theme === 'dark'
            ? '0 16px 36px -4px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
            : '0 16px 36px -4px rgba(15, 23, 42, 0.14), 0 0 0 1px rgba(255, 255, 255, 0.85) inset',
          display: 'flex',
          alignItems: 'center',
          padding: '0',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Animated Pill Indicator Slider */}
        <div
          ref={pillIndicatorRef}
          style={{
            position: 'absolute',
            top: '5px',
            left: '0',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: theme === 'dark' ? '#222A38' : '#0F172A',
            zIndex: 1,
            boxShadow: theme === 'dark'
              ? '0 4px 14px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
              : '0 6px 16px rgba(15, 23, 42, 0.3)',
            transition: 'background-color 0.3s ease',
          }}
        />

        {/* Tab 0: Home */}
        <button
          onClick={() => setActiveTab('home')}
          style={{
            width: '64px',
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
          title="Panel Principal"
        >
          <Home
            size={22}
            color={activeTab === 'home' ? '#FFFFFF' : (theme === 'dark' ? '#94A3B8' : '#64748B')}
            strokeWidth={activeTab === 'home' ? 2.5 : 2}
          />
        </button>

        {/* Tab 1: Stats */}
        <button
          onClick={() => setActiveTab('statistics')}
          style={{
            width: '64px',
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
          title="Reporte Estadístico"
        >
          <Activity
            size={22}
            color={activeTab === 'statistics' ? '#FFFFFF' : (theme === 'dark' ? '#94A3B8' : '#64748B')}
            strokeWidth={activeTab === 'statistics' ? 2.5 : 2}
          />
        </button>

        {/* Tab 2: Profile / Settings */}
        <button
          onClick={() => setActiveTab('options')}
          style={{
            width: '64px',
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
            size={22}
            color={activeTab === 'options' ? '#FFFFFF' : (theme === 'dark' ? '#94A3B8' : '#64748B')}
            strokeWidth={activeTab === 'options' ? 2.5 : 2}
          />
        </button>
      </div>

      {/* iOS Home Indicator */}
      <div
        style={{
          width: '136px',
          height: '4px',
          backgroundColor: theme === 'dark' ? '#FFFFFF' : '#0F172A',
          opacity: theme === 'dark' ? 0.45 : 0.9,
          borderRadius: '10px',
          marginTop: '10px',
        }}
      />
    </div>
  );
};
