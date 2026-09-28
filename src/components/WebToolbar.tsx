'use client';

import React from 'react';
import { Smartphone, Columns, RotateCcw, Cloud, ChevronRight, Moon, Sun } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface WebToolbarProps {
  viewMode: 'device' | 'showcase';
  setViewMode: (mode: 'device' | 'showcase') => void;
  onReplayAnimations: () => void;
  onOpenDeployModal: () => void;
}

export const WebToolbar: React.FC<WebToolbarProps> = ({
  viewMode,
  setViewMode,
  onReplayAnimations,
  onOpenDeployModal,
}) => {
  const {
    activeTab,
    setActiveTab,
    activeSubView,
    popView,
    theme,
    toggleTheme,
    language,
    setLanguage,
    t,
  } = useApp();

  const subViewNames: Record<string, string> = {
    'medication-detail': t('medication'),
    'wellness-detail': t('wellness'),
    'diary': t('diary'),
    'settings': t('settings'),
    'subscriptions': t('subscriptions'),
    'health-base': t('healthBase'),
    'scan': t('scanTitle'),
    'edit-profile': t('editProfileTitle'),
  };

  return (
    <header
      style={{
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        zIndex: 50,
      }}
    >
      {/* Brand Identity & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          onClick={() => setActiveTab('home')}
          style={{
            background: 'linear-gradient(135deg, #101419 0%, #252D37 100%)',
            color: '#FFFFFF',
            borderRadius: '14px',
            padding: '7px 14px',
            fontWeight: 800,
            fontSize: '15px',
            letterSpacing: '1.2px',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}
        >
          CODE<span>®</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('appSubtitle')}
            </span>
            {activeSubView && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--accent-green)', fontWeight: 700 }}>
                <ChevronRight size={13} color="var(--text-muted)" />
                <span
                  onClick={popView}
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  title={t('back')}
                >
                  {subViewNames[activeSubView] || activeSubView}
                </span>
              </div>
            )}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)' }} />
            {t('readyEdge')}
          </span>
        </div>
      </div>

      {/* Center View Switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--card-white)',
          borderRadius: '30px',
          padding: '4px',
          boxShadow: 'var(--shadow-subtle)',
          border: '1px solid rgba(220, 226, 232, 0.4)',
        }}
      >
        <button
          onClick={() => setViewMode('device')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '24px',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: viewMode === 'device' ? (theme === 'dark' ? '#27313F' : '#12161C') : 'transparent',
            color: viewMode === 'device' ? '#FFFFFF' : 'var(--text-secondary)',
            transition: 'all 0.2s ease',
          }}
        >
          <Smartphone size={15} />
          {t('interactiveIPhone')}
        </button>

        <button
          onClick={() => setViewMode('showcase')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '24px',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: viewMode === 'showcase' ? (theme === 'dark' ? '#27313F' : '#12161C') : 'transparent',
            color: viewMode === 'showcase' ? '#FFFFFF' : 'var(--text-secondary)',
            transition: 'all 0.2s ease',
          }}
        >
          <Columns size={15} />
          {t('threeScreensMockup')}
        </button>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Dark / Light Mode Quick Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--card-white)',
            border: '1px solid rgba(220, 226, 232, 0.4)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-subtle)',
          }}
          title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        >
          {theme === 'dark' ? <Sun size={16} color="#FFA500" /> : <Moon size={16} color="#4A5568" />}
        </button>

        {/* Quick Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '7px 12px',
            borderRadius: '20px',
            backgroundColor: 'var(--card-white)',
            border: '1px solid rgba(220, 226, 232, 0.4)',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-subtle)',
          }}
          title="Cambiar idioma (ES / EN)"
        >
          <span>{language === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}</span>
        </button>

        {/* Replay GSAP button */}
        <button
          onClick={onReplayAnimations}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '7px 12px',
            borderRadius: '20px',
            backgroundColor: 'var(--card-white)',
            border: '1px solid rgba(220, 226, 232, 0.4)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-subtle)',
          }}
          title={t('replay')}
        >
          <RotateCcw size={13} />
          {t('replay')}
        </button>

        {/* Deploy on Cloudflare Pages Guide Button */}
        <button
          onClick={onOpenDeployModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '20px',
            backgroundColor: '#F38020',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: '0 3px 12px rgba(243, 128, 32, 0.35)',
          }}
        >
          <Cloud size={14} />
          {t('cloudflareDeploy')}
        </button>
      </div>
    </header>
  );
};
