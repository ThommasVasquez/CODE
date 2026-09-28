'use client';

import React from 'react';
import { Smartphone, Columns, RotateCcw, Cloud, ChevronRight } from 'lucide-react';
import { useApp, MainTab } from '@/context/AppContext';

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
  const { activeTab, setActiveTab, activeSubView, popView } = useApp();

  const subViewNames: Record<string, string> = {
    'medication-detail': 'Medicación',
    'wellness-detail': 'Bienestar',
    'diary': 'Bitácora',
    'settings': 'Ajustes',
    'subscriptions': 'Suscripciones',
    'health-base': 'Health Base',
    'scan': 'Escáner',
    'edit-profile': 'Editar Perfil',
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
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
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
            <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#161F28' }}>
              iOS Vital & Medication OS
            </span>
            {activeSubView && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#73A932', fontWeight: 700 }}>
                <ChevronRight size={13} color="#8898A8" />
                <span
                  onClick={popView}
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  title="Volver"
                >
                  {subViewNames[activeSubView] || activeSubView}
                </span>
              </div>
            )}
          </div>
          <span style={{ fontSize: '11px', color: '#637384', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#73A932' }} />
            Totalmente Interactivo • Cloudflare Pages Ready
          </span>
        </div>
      </div>

      {/* Center View Switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '30px',
          padding: '4px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(220, 226, 232, 0.9)',
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
            backgroundColor: viewMode === 'device' ? '#12161C' : 'transparent',
            color: viewMode === 'device' ? '#FFFFFF' : '#4E5F70',
            transition: 'all 0.2s ease',
          }}
        >
          <Smartphone size={15} />
          iPhone Interactivo
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
            backgroundColor: viewMode === 'showcase' ? '#12161C' : 'transparent',
            color: viewMode === 'showcase' ? '#FFFFFF' : '#4E5F70',
            transition: 'all 0.2s ease',
          }}
        >
          <Columns size={15} />
          Vista 3 Pantallas (Mockup)
        </button>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Replay GSAP button */}
        <button
          onClick={onReplayAnimations}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 13px',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(220, 226, 232, 0.9)',
            fontSize: '12px',
            fontWeight: 600,
            color: '#2B3947',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
          }}
          title="Reiniciar animaciones GSAP"
        >
          <RotateCcw size={13} />
          Reanimar
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
          Cloudflare Deploy
        </button>
      </div>
    </header>
  );
};
