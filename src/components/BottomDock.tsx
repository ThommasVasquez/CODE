'use client';

import React from 'react';
import { Home, BarChart2, Sparkles, Utensils, Settings } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const BottomDock: React.FC = () => {
  const { activeTab, setActiveTab, activeSubView, pushView, theme } = useApp();

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
        pointerEvents: activeSubView ? 'none' : 'auto',
        transform: activeSubView ? 'translateY(120%)' : 'translateY(0%)',
        opacity: activeSubView ? 0 : 1,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
      }}
    >
      {/* Floating 5-Item Pill Dock (Matching Reference Image) */}
      <div
        className="glass-dock"
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          width: '272px',
          height: '58px',
          backgroundColor: theme === 'dark' ? 'rgba(19, 23, 34, 0.88)' : 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '35px',
          boxShadow: theme === 'dark'
            ? '0 16px 36px -4px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
            : '0 16px 36px -4px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.85) inset',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Item 1: Home */}
        <button
          onClick={() => setActiveTab('home')}
          style={{
            width: activeTab === 'home' ? '46px' : '38px',
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
            size={19}
            color={activeTab === 'home' ? '#FFFFFF' : (theme === 'dark' ? '#94A3B8' : '#475569')}
            strokeWidth={activeTab === 'home' ? 2.5 : 2}
          />
        </button>

        {/* Item 2: Statistics */}
        <button
          onClick={() => setActiveTab('statistics')}
          style={{
            width: activeTab === 'statistics' ? '46px' : '38px',
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
            size={19}
            color={activeTab === 'statistics' ? '#FFFFFF' : (theme === 'dark' ? '#94A3B8' : '#475569')}
            strokeWidth={activeTab === 'statistics' ? 2.5 : 2}
          />
        </button>

        {/* Item 3: Center AI Coach Button (Glow Circle) */}
        <button
          onClick={() => pushView('workout-detail')}
          style={{
            width: '42px',
            height: '42px',
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
          <Sparkles size={20} color="#FFFFFF" />
        </button>

        {/* Item 4: Diet & Nutrition */}
        <button
          onClick={() => pushView('diet-detail')}
          style={{
            width: '38px',
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
          title="Planes de Dieta"
          aria-label="Planes de Dieta"
        >
          <Utensils
            size={19}
            color={theme === 'dark' ? '#94A3B8' : '#475569'}
            strokeWidth={2}
          />
        </button>

        {/* Item 5: Settings / Profile */}
        <button
          onClick={() => setActiveTab('options')}
          style={{
            width: activeTab === 'options' ? '46px' : '38px',
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
            size={19}
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
