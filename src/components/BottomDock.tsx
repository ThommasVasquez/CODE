'use client';

import React from 'react';
import { Home, BarChart2, Sparkles, BookOpen, Settings } from 'lucide-react';
import { useApp } from '@/context/AppContext';

// High-fidelity Olympic / Fitness Runner Icon SVG
const RunnerIcon: React.FC<{ size?: number; color?: string; strokeWidth?: number }> = ({
  size = 19,
  color = '#FFFFFF',
  strokeWidth = 2.2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="15.8" cy="4.5" r="2.2" fill={color} stroke="none" />
    <path d="M14.8 7.5l-3.3 3 2.3 3.5-2.8 5.5" />
    <path d="M11 17l2 4.5" />
    <path d="M11.5 10.5L8.2 9.5l1.3-3.5" />
    <path d="M14.8 10.5l3.2 1.5 2-2" />
  </svg>
);

export const BottomDock: React.FC = () => {
  const { activeTab, setActiveTab, activeSubView, pushView, theme } = useApp();
  const isDockHidden = Boolean(activeSubView);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '12px',
        left: '0',
        right: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 60,
        pointerEvents: isDockHidden ? 'none' : 'auto',
        transform: isDockHidden ? 'translateY(120%)' : 'translateY(0%)',
        opacity: isDockHidden ? 0 : 1,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
      }}
    >
      {/* Floating Pill Dock with 6 items (Home, Running, AI Coach, Statistics, Diets, Settings) */}
      <div
        className="glass-dock"
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          width: '320px',
          height: '58px',
          backgroundColor: theme === 'dark' ? 'rgba(19, 23, 34, 0.88)' : 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '35px',
          boxShadow: theme === 'dark'
            ? '0 16px 36px -4px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
            : '0 16px 36px -4px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.9) inset',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Item 1: Home */}
        <button
          onClick={() => setActiveTab('home')}
          style={{
            width: activeTab === 'home' ? '44px' : '36px',
            height: '38px',
            borderRadius: '20px',
            background: activeTab === 'home' ? 'var(--accent-purple)' : 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: activeTab === 'home' ? '0 4px 12px rgba(157, 123, 255, 0.4)' : 'none',
          }}
          title="Inicio"
          aria-label="Inicio"
        >
          <Home
            size={18}
            color={activeTab === 'home' ? '#FFFFFF' : (theme === 'dark' ? '#94A3B8' : '#475569')}
            strokeWidth={activeTab === 'home' ? 2.5 : 2}
          />
        </button>

        {/* Item 2: Running (Correr - New Running Track Feature) */}
        <button
          onClick={() => setActiveTab('running')}
          style={{
            width: activeTab === 'running' ? '44px' : '36px',
            height: '38px',
            borderRadius: '20px',
            background: activeTab === 'running' ? '#88DCF0' : 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: activeTab === 'running' ? '0 4px 12px rgba(136, 220, 240, 0.5)' : 'none',
          }}
          title="Correr / GPS Track"
          aria-label="Correr / GPS Track"
        >
          <RunnerIcon
            size={19}
            color={activeTab === 'running' ? '#0F172A' : (theme === 'dark' ? '#94A3B8' : '#475569')}
            strokeWidth={activeTab === 'running' ? 2.5 : 2}
          />
        </button>

        {/* Item 3: Center AI Coach Button (Glow Circle) */}
        <button
          onClick={() => pushView('workout-detail')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #B794F6 0%, #9D7BFF 50%, #7C3AED 100%)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(157, 123, 255, 0.5)',
            transition: 'transform 0.15s ease',
          }}
          title="Entrenador IA"
          aria-label="Entrenador IA"
        >
          <Sparkles size={19} color="#FFFFFF" />
        </button>

        {/* Item 4: Statistics */}
        <button
          onClick={() => setActiveTab('statistics')}
          style={{
            width: activeTab === 'statistics' ? '44px' : '36px',
            height: '38px',
            borderRadius: '20px',
            background: activeTab === 'statistics' ? 'var(--accent-purple)' : 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: activeTab === 'statistics' ? '0 4px 12px rgba(157, 123, 255, 0.4)' : 'none',
          }}
          title="Estadísticas"
          aria-label="Estadísticas"
        >
          <BarChart2
            size={18}
            color={activeTab === 'statistics' ? '#FFFFFF' : (theme === 'dark' ? '#94A3B8' : '#475569')}
            strokeWidth={activeTab === 'statistics' ? 2.5 : 2}
          />
        </button>

        {/* Item 5: Routines / Diets Book */}
        <button
          onClick={() => pushView('diet-detail')}
          style={{
            width: '36px',
            height: '38px',
            borderRadius: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s ease',
          }}
          title="Planes de Dieta & Guías"
          aria-label="Planes de Dieta & Guías"
        >
          <BookOpen
            size={18}
            color={theme === 'dark' ? '#94A3B8' : '#475569'}
            strokeWidth={2}
          />
        </button>

        {/* Item 6: Settings / Profile */}
        <button
          onClick={() => setActiveTab('options')}
          style={{
            width: activeTab === 'options' ? '44px' : '36px',
            height: '38px',
            borderRadius: '20px',
            background: activeTab === 'options' ? 'var(--accent-purple)' : 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: activeTab === 'options' ? '0 4px 12px rgba(157, 123, 255, 0.4)' : 'none',
          }}
          title="Ajustes de Perfil"
          aria-label="Ajustes de Perfil"
        >
          <Settings
            size={18}
            color={activeTab === 'options' ? '#FFFFFF' : (theme === 'dark' ? '#94A3B8' : '#475569')}
            strokeWidth={activeTab === 'options' ? 2.5 : 2}
          />
        </button>
      </div>

      {/* iOS Home Indicator Bar */}
      <div
        style={{
          width: '136px',
          height: '4px',
          backgroundColor: theme === 'dark' ? '#FFFFFF' : '#0F172A',
          opacity: theme === 'dark' ? 0.45 : 0.85,
          borderRadius: '10px',
          marginTop: '8px',
        }}
      />
    </div>
  );
};
