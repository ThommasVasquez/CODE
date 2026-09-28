'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Home, Activity, LayoutGrid } from 'lucide-react';

interface BottomDockProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({ activeTab, setActiveTab }) => {
  const pillIndicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pillIndicatorRef.current || !containerRef.current) return;

    // Calculate position for indicator (3 buttons, width is ~180px, each button slot is ~54px)
    const positions = [6, 62, 118];
    const targetX = positions[activeTab] ?? 6;

    gsap.to(pillIndicatorRef.current, {
      x: targetX,
      duration: 0.45,
      ease: 'back.out(1.4)',
    });
  }, [activeTab]);

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
    }}>
      {/* Floating Pill Bar */}
      <div
        ref={containerRef}
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          width: '180px',
          height: '58px',
          backgroundColor: '#FFFFFF',
          borderRadius: '35px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(220, 226, 230, 0.7)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 6px',
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
            backgroundColor: '#121417',
            zIndex: 1,
            boxShadow: '0 4px 12px rgba(18, 20, 23, 0.3)',
          }}
        />

        {/* Tab 0: Home */}
        <button
          onClick={() => setActiveTab(0)}
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
            color={activeTab === 0 ? '#FFFFFF' : '#4A5568'}
            strokeWidth={activeTab === 0 ? 2.5 : 2}
          />
        </button>

        {/* Tab 1: Stats */}
        <button
          onClick={() => setActiveTab(1)}
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
            color={activeTab === 1 ? '#FFFFFF' : '#4A5568'}
            strokeWidth={activeTab === 1 ? 2.5 : 2}
          />
        </button>

        {/* Tab 2: Profile / More Options */}
        <button
          onClick={() => setActiveTab(2)}
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
          aria-label="More Options"
        >
          <LayoutGrid
            size={20}
            color={activeTab === 2 ? '#FFFFFF' : '#4A5568'}
            strokeWidth={activeTab === 2 ? 2.5 : 2}
          />
        </button>
      </div>

      {/* iOS Home Indicator */}
      <div
        style={{
          width: '134px',
          height: '4px',
          backgroundColor: '#0E1116',
          borderRadius: '10px',
          marginTop: '12px',
        }}
      />
    </div>
  );
};
