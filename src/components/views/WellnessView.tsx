'use client';

import React, { useState } from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Moon, Play, Pause, Sparkles, Volume2, CloudRain, Wind, Heart, Smile } from 'lucide-react';

export const WellnessView: React.FC = () => {
  const { showToast, t, theme } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSound, setSelectedSound] = useState('Lluvia Serena');
  const [selectedMood, setSelectedMood] = useState('Tranquilo');

  const soundscapes = [
    { name: 'Lluvia Serena', icon: CloudRain, duration: '45 min' },
    { name: 'Viento Suave', icon: Wind, duration: '60 min' },
    { name: 'Latido Calmado', icon: Heart, duration: '30 min' },
  ];

  const moods = ['😊 Excelente', '😌 Tranquilo', '😴 Cansado', '🧘 Enfocado'];

  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    showToast(next ? t('audioPlaying') : t('audioPaused'));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'var(--device-bg)',
        overflowY: 'auto',
        paddingBottom: '90px',
        color: 'var(--text-primary)',
      }}
    >
      <IOSHeader title={t('wellnessTitle')} subtitle={t('wellnessSub')} />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Main Audio Player Card */}
        <div
          style={{
            background: 'linear-gradient(145deg, #1C242D 0%, #11171E 100%)',
            borderRadius: '26px',
            padding: '22px 20px',
            color: '#FFFFFF',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Moon size={18} color="#A2E285" />
              <span style={{ fontSize: '11px', color: '#A2E285', fontWeight: 700, textTransform: 'uppercase' }}>
                Sesión Nocturna Activa
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#8898A8' }}>24:18 restante</span>
          </div>

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>El Valle del Silencio</h3>
            <p style={{ fontSize: '12px', color: '#8A9BAE', marginTop: '2px' }}>
              Narración guiada para conciliar el sueño
            </p>
          </div>

          {/* Sound Wave Animation Visualizer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              height: '34px',
              margin: '18px 0',
            }}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '3px',
                  height: isPlaying ? `${Math.sin(i * 0.8) * 14 + 16}px` : '4px',
                  backgroundColor: isPlaying ? '#A2E285' : '#415264',
                  borderRadius: '2px',
                  transition: 'height 0.25s ease',
                }}
              />
            ))}
          </div>

          {/* Player Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={togglePlay}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#A2E285',
                color: '#101B0B',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(162, 226, 133, 0.4)',
              }}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '3px' }} />}
            </button>
          </div>
        </div>

        {/* Ambient Soundscapes */}
        <div>
          <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {t('bedtimeStories')}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {soundscapes.map((snd) => {
              const Icon = snd.icon;
              const isSel = selectedSound === snd.name;
              return (
                <button
                  key={snd.name}
                  onClick={() => {
                    setSelectedSound(snd.name);
                    showToast(`${snd.name}`);
                  }}
                  style={{
                    backgroundColor: isSel
                      ? (theme === 'dark' ? '#1D2A1C' : '#EAF4DC')
                      : 'var(--card-white)',
                    border: isSel ? '1.5px solid var(--accent-green)' : '1px solid rgba(220, 226, 230, 0.3)',
                    borderRadius: '18px',
                    padding: '12px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-subtle)',
                  }}
                >
                  <Icon size={18} color={isSel ? 'var(--accent-green)' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px', textAlign: 'center' }}>
                    {snd.name}
                  </span>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '1px' }}>
                    {snd.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Wellness Checkin */}
        <div
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '22px',
            padding: '16px 18px',
            border: '1px solid rgba(220,226,230,0.3)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smile size={18} color="var(--accent-green)" />
            <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('wellness')} Check-in
            </h4>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => {
                  setSelectedMood(m);
                  showToast(`${m}`);
                }}
                style={{
                  backgroundColor: selectedMood === m
                    ? (theme === 'dark' ? '#1D2A1C' : '#EAF4DC')
                    : (theme === 'dark' ? '#161D26' : '#F4F6F8'),
                  border: selectedMood === m ? '1.5px solid var(--accent-green)' : 'none',
                  borderRadius: '14px',
                  padding: '7px 12px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: selectedMood === m ? 'var(--accent-green)' : 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
