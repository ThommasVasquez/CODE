'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ShoppingBag, 
  Play, 
  MapPin, 
  Flame, 
  Footprints, 
  ArrowRight,
  Clock, 
  Timer, 
  Volume2, 
  Moon, 
  Heart,
  X
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export type RunningScreenMode = 'dashboard' | 'map' | 'timetrack';

export const RunningTrackScreen: React.FC = () => {
  const { setActiveTab, showToast } = useApp();
  const [currentScreen, setCurrentScreen] = useState<RunningScreenMode>('dashboard');

  // Interactive state
  const [selectedRound, setSelectedRound] = useState<number>(30);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [distance, setDistance] = useState<string>('10,3');

  // Expose screen setter for automated testing/CDP
  useEffect(() => {
    (window as any).__setRunningScreen = (mode: RunningScreenMode) => {
      setCurrentScreen(mode);
    };
  }, []);

  const handleStartRun = () => {
    setIsTracking(true);
    showToast('¡Sesión de Running GPS iniciada en San Diego!');
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#F3F6F8',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ========================================================================= */}
      {/* SCREEN 1: TRACK ACTIVITY (MAP VIEW)                                       */}
      {/* ========================================================================= */}
      {currentScreen === 'map' && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '52px 20px 10px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 30,
            }}
          >
            {/* Back Button -> returns to Hey, Jessica */}
            <button
              onClick={() => setCurrentScreen('dashboard')}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.15s ease',
              }}
              title="Volver a Jessica Dashboard"
            >
              <ChevronLeft size={22} color="#1E293B" strokeWidth={2.5} />
            </button>

            {/* Title */}
            <h1
              style={{
                fontSize: '17px',
                fontWeight: 700,
                color: '#1E293B',
                margin: 0,
                letterSpacing: '-0.3px',
              }}
            >
              Track Activity
            </h1>

            {/* Right Action Button (Gym bag/lock) */}
            <button
              onClick={() => showToast('Rutas guardadas en tu casillero')}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Mochila / Casillero"
            >
              <ShoppingBag size={18} color="#1E293B" strokeWidth={2.2} />
            </button>
          </div>

          {/* Full Screen Vector Map Area */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              overflow: 'hidden',
            }}
          >
            {/* Map Background Image */}
            <img
              src="/running_map.jpg"
              alt="Running Map"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.98,
              }}
            />

            {/* SVG Curving Dashed Route Path */}
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              <path
                d="M 60 520 C 100 480, 160 490, 196 420 S 230 310, 210 260 S 260 180, 310 160"
                fill="none"
                stroke="#1E293B"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 196 420 C 160 380, 120 370, 95 340"
                fill="none"
                stroke="#1E293B"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 196 420 C 230 450, 270 460, 305 480"
                fill="none"
                stroke="#1E293B"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>

            {/* Central Radar Pulse & Red Pin Target */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              {/* Radar Outer Halo */}
              <div
                style={{
                  position: 'absolute',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(143, 225, 244, 0.32)',
                  border: '1.5px solid rgba(143, 225, 244, 0.65)',
                  boxShadow: '0 0 36px rgba(143, 225, 244, 0.55)',
                }}
              />
              {/* Radar Inner Circle */}
              <div
                style={{
                  position: 'absolute',
                  width: '115px',
                  height: '115px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(143, 225, 244, 0.28)',
                }}
              />
              {/* Red Map Pin with black ring and white dot */}
              <div
                style={{
                  position: 'relative',
                  width: '32px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 5,
                  filter: 'drop-shadow(0 6px 14px rgba(239, 68, 68, 0.5))',
                }}
              >
                <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
                  <path
                    d="M17 0C7.61 0 0 7.61 0 17C0 29.75 17 42 17 42C17 42 34 29.75 34 17C34 7.61 26.39 0 17 0Z"
                    fill="#FF4B4B"
                  />
                  <circle cx="17" cy="17" r="10" fill="#1E293B" />
                  <circle cx="17" cy="17" r="5" fill="#FFFFFF" />
                </svg>
              </div>
            </div>

            {/* Runner Pin: Alex (Top Right) */}
            <div
              style={{
                position: 'absolute',
                top: '23%',
                right: '18%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                padding: '3px 8px 3px 3px',
                borderRadius: '20px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                zIndex: 15,
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginRight: '6px',
                  border: '1.5px solid #FFFFFF',
                }}
              >
                <img src="/avatar.jpg" alt="Alex" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#1E293B' }}>Alex</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF4B4B', marginLeft: '5px' }} />
            </div>

            {/* Runner Pin: Nyla (Upper Middle) */}
            <div
              style={{
                position: 'absolute',
                top: '34%',
                left: '32%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                padding: '3px 8px 3px 3px',
                borderRadius: '20px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                zIndex: 15,
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginRight: '6px',
                  border: '1.5px solid #FFFFFF',
                }}
              >
                <img src="/runner_jessica.jpg" alt="Nyla" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#1E293B' }}>Nyla</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF4B4B', marginLeft: '5px' }} />
            </div>

            {/* Runner Pin: James (Mid Left) */}
            <div
              style={{
                position: 'absolute',
                top: '44%',
                left: '14%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                padding: '3px 8px 3px 3px',
                borderRadius: '20px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                zIndex: 15,
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginRight: '6px',
                  border: '1.5px solid #FFFFFF',
                }}
              >
                <img src="/avatar.jpg" alt="James" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#1E293B' }}>James</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF4B4B', marginLeft: '5px' }} />
            </div>

            {/* Runner Pin: Neloy (Lower Right) */}
            <div
              style={{
                position: 'absolute',
                top: '55%',
                right: '18%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                padding: '3px 8px 3px 3px',
                borderRadius: '20px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                zIndex: 15,
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginRight: '6px',
                  border: '1.5px solid #FFFFFF',
                }}
              >
                <img src="/avatar.jpg" alt="Neloy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#1E293B' }}>Neloy</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF4B4B', marginLeft: '5px' }} />
            </div>
          </div>

          {/* Bottom Floating Cards Overlay (Resting cleanly right above home indicator) */}
          <div
            style={{
              position: 'absolute',
              bottom: '26px',
              left: '16px',
              right: '16px',
              zIndex: 35,
              display: 'flex',
              gap: '12px',
            }}
          >
            {/* Left Card: 10 Runners & San Diego */}
            <div
              style={{
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '14px 14px 12px 14px',
                boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Runner Icon Chip + dotted line */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Footprints size={15} color="#1E293B" />
                </div>
                {/* Dotted indicator line */}
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    borderBottom: '1.5px dashed #CBD5E1',
                    margin: '0 8px',
                  }}
                />
              </div>

              {/* Title: 10 Runners */}
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                10 Runners
              </div>

              {/* Overlapping Avatar Stack with 8+ badge */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: '2px solid #FFFFFF',
                    overflow: 'hidden',
                    zIndex: 4,
                  }}
                >
                  <img src="/avatar.jpg" alt="r1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: '2px solid #FFFFFF',
                    overflow: 'hidden',
                    marginLeft: '-8px',
                    zIndex: 3,
                  }}
                >
                  <img src="/runner_jessica.jpg" alt="r2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: '2px solid #FFFFFF',
                    overflow: 'hidden',
                    marginLeft: '-8px',
                    zIndex: 2,
                  }}
                >
                  <img src="/timetrack_woman.jpg" alt="r3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: '2px solid #FFFFFF',
                    backgroundColor: '#1E293B',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '-8px',
                    zIndex: 1,
                  }}
                >
                  8+
                </div>
              </div>

              {/* Bottom Location Sub-row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  paddingTop: '8px',
                  borderTop: '1px solid #F1F5F9',
                }}
              >
                <MapPin size={13} color="#1E293B" strokeWidth={2.5} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1E293B', whiteSpace: 'nowrap' }}>
                  San Diego, CA
                </span>
              </div>
            </div>

            {/* Right Side: Start Now Button + Distance Card */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Start Now Pill Button */}
              <button
                onClick={handleStartRun}
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '24px',
                  backgroundColor: '#88DCF0',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(136, 220, 240, 0.45)',
                  transition: 'transform 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Play size={11} fill="#1E293B" color="#1E293B" style={{ marginLeft: '1px' }} />
                </div>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>
                  Start Now
                </span>
              </button>

              {/* Distance Card */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '14px 16px',
                  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <MapPin size={14} color="#1E293B" strokeWidth={2.5} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B' }}>
                    Distance
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: '#1E293B', letterSpacing: '-0.5px' }}>
                    {distance}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                    km
                  </span>
                </div>

                <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>
                  Route Covered
                </div>
              </div>
            </div>
          </div>

          {/* iOS Home Indicator Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '134px',
              height: '4px',
              backgroundColor: '#1E293B',
              borderRadius: '10px',
              zIndex: 40,
            }}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 2: HEY, JESSICA (MAIN RUNNING DASHBOARD)                           */}
      {/* ========================================================================= */}
      {currentScreen === 'dashboard' && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F5F8FA',
          }}
        >
          {/* Header Row: Illustrated Avatar + 124k kal Pill, Right Dial Button */}
          <div
            style={{
              padding: '52px 20px 8px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 20,
            }}
          >
            {/* Left: Avatar + Calories Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Illustrated Avatar with glasses */}
              <div
                onClick={() => setActiveTab('home')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                  background: 'linear-gradient(135deg, #FFD166 0%, #F78C6B 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                title="Volver a Inicio"
              >
                <img
                  src="/avatar.jpg"
                  alt="Jessica"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* 124k kal Pill */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '7px 14px',
                  borderRadius: '24px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>
                  124k
                </span>
                <span style={{ fontSize: '11px', fontWeight: 500, color: '#94A3B8' }}>
                  kal
                </span>
              </div>
            </div>

            {/* Right: Dark Circular Button with crescent/dial */}
            <button
              onClick={() => showToast('Modo concentración activo')}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#1E2024',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
              title="Modo / Timer"
            >
              <Moon size={18} color="#FFFFFF" fill="#FFFFFF" />
            </button>
          </div>

          {/* Title Area: Hey, Jessica + Subtitle + Right Start Button */}
          <div
            style={{
              padding: '12px 20px 8px 20px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              zIndex: 20,
            }}
          >
            {/* Title & Subtitle */}
            <div style={{ maxWidth: '230px' }}>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#111827',
                  margin: '0 0 6px 0',
                  letterSpacing: '-0.6px',
                }}
              >
                Hey, Jessica
              </h1>
              <p
                style={{
                  fontSize: '12.5px',
                  lineHeight: '1.4',
                  color: '#6B7280',
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Crush today's workout goals and celebrate every strong step.
              </p>
            </div>

            {/* Right Pill Button: ▶ Start (switches to Screen 1 Map) */}
            <button
              onClick={() => setCurrentScreen('map')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '9px 16px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                marginTop: '4px',
              }}
              title="Abrir mapa de running"
            >
              <Play size={12} fill="#111827" color="#111827" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
                Start
              </span>
            </button>
          </div>

          {/* Hero Athlete Image (Jessica in high afro ponytail & mint leggings) */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginTop: '-10px',
            }}
          >
            <img
              src="/runner_jessica.jpg"
              alt="Jessica Running"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
              }}
            />

            {/* Floating Badge: ⏱ 20 Min */}
            <div
              style={{
                position: 'absolute',
                top: '32%',
                left: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '24px',
                padding: '8px 14px',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 15,
              }}
            >
              <Clock size={16} color="#1E293B" strokeWidth={2.5} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#1E293B' }}>
                  20
                </span>
                <span style={{ fontSize: '9px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>
                  Min
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Frosted Glass Card: Active Stats (Resting directly above home indicator) */}
          <div
            style={{
              position: 'absolute',
              bottom: '26px',
              left: '14px',
              right: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.82)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '32px',
              padding: '16px 16px 16px 16px',
              boxShadow: '0 20px 48px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.9) inset',
              zIndex: 30,
            }}
          >
            {/* Row Title: Active Stats + Light Blue Arrow Button (switches to Screen 3 Time Track) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
              }}
            >
              <h2
                style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#111827',
                  margin: 0,
                  letterSpacing: '-0.3px',
                }}
              >
                Active Stats
              </h2>

              <button
                onClick={() => setCurrentScreen('timetrack')}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#88DCF0',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(136, 220, 240, 0.4)',
                  transition: 'transform 0.15s ease',
                }}
                title="Ver Time Track y Rondas"
              >
                <ArrowRight size={16} color="#111827" strokeWidth={2.5} />
              </button>
            </div>

            {/* Two Side-by-Side Stat Cards */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* Card 1: Calories */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '22px',
                  padding: '12px 14px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#1E293B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Flame size={13} color="#FFFFFF" fill="#FFFFFF" />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B' }}>
                    Calories
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '22px', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px' }}>
                    250
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#94A3B8' }}>
                    kcal
                  </span>
                </div>
              </div>

              {/* Card 2: Steps */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '22px',
                  padding: '12px 14px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#1E293B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Footprints size={13} color="#FFFFFF" />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B' }}>
                    Steps
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px' }}>
                    10,345
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#94A3B8' }}>
                    steps
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* iOS Home Indicator Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '134px',
              height: '4px',
              backgroundColor: '#1E293B',
              borderRadius: '10px',
              zIndex: 40,
            }}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 3: TIME TRACK (ROUNDS & SMARTWATCH HEART RATE)                     */}
      {/* ========================================================================= */}
      {currentScreen === 'timetrack' && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F5F8FA',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '52px 20px 8px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 30,
            }}
          >
            {/* Back Button -> returns to Hey, Jessica */}
            <button
              onClick={() => setCurrentScreen('dashboard')}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.15s ease',
              }}
              title="Volver a Jessica Dashboard"
            >
              <ChevronLeft size={22} color="#1E293B" strokeWidth={2.5} />
            </button>

            {/* Title */}
            <h1
              style={{
                fontSize: '17px',
                fontWeight: 700,
                color: '#1E293B',
                margin: 0,
                letterSpacing: '-0.3px',
              }}
            >
              Time Track
            </h1>

            {/* Right Action Button (Gym bag/lock) */}
            <button
              onClick={() => showToast('Configuraciones guardadas')}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Mochila / Casillero"
            >
              <ShoppingBag size={18} color="#1E293B" strokeWidth={2.2} />
            </button>
          </div>

          {/* Hero Athlete Image (Woman smiling with hand on chest & Smartwatch) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '48%',
              overflow: 'hidden',
              marginTop: '-10px',
            }}
          >
            <img
              src="/timetrack_woman.jpg"
              alt="Athlete Time Track"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
              }}
            />

            {/* Glowing Heart Rate Hologram over Smartwatch */}
            <div
              style={{
                position: 'absolute',
                top: '58%',
                right: '25%',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.25)',
                border: '1.5px solid rgba(239, 68, 68, 0.7)',
                boxShadow: '0 0 16px rgba(239, 68, 68, 0.65)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <Heart size={18} color="#FF3B30" fill="#FF3B30" />
            </div>

            {/* Floating Heart Rate Badge: ❤️ 70 */}
            <div
              style={{
                position: 'absolute',
                top: '22%',
                right: '22px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '24px',
                padding: '6px 12px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                zIndex: 15,
              }}
            >
              <Heart size={14} color="#FF3B30" fill="#FF3B30" />
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#1E293B' }}>
                70
              </span>
            </div>
          </div>

          {/* Bottom Frosted Glass Card: Rounds & Time Intervals (Resting directly above home indicator) */}
          <div
            style={{
              position: 'absolute',
              bottom: '26px',
              left: '14px',
              right: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '34px',
              padding: '16px 16px 16px 16px',
              boxShadow: '0 20px 48px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.9) inset',
              zIndex: 30,
            }}
          >
            {/* Top Pill Header: ⏱ Rounds */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '5px 14px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Clock size={13} color="#1E293B" strokeWidth={2.5} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>
                  Rounds
                </span>
              </div>
            </div>

            {/* Number Selector Row: 10  20  [30]  40  50 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 8px',
                marginBottom: '16px',
              }}
            >
              {[10, 20, 30, 40, 50].map((round) => {
                const isSelected = selectedRound === round;
                return (
                  <button
                    key={round}
                    onClick={() => {
                      setSelectedRound(round);
                      showToast(`Seleccionado: ${round} Rondas`);
                    }}
                    style={{
                      border: 'none',
                      backgroundColor: isSelected ? '#88DCF0' : 'transparent',
                      color: isSelected ? '#1E293B' : '#94A3B8',
                      fontSize: '15px',
                      fontWeight: isSelected ? 800 : 600,
                      width: isSelected ? '46px' : '36px',
                      height: '34px',
                      borderRadius: '17px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isSelected ? '0 4px 14px rgba(136, 220, 240, 0.5)' : 'none',
                    }}
                  >
                    {round}
                  </button>
                );
              })}
            </div>

            {/* Setting List Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Row 1: 2 min 25 sec / Active Duration */}
              <div
                onClick={() => showToast('Ajustar duración activa')}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#1E293B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Timer size={14} color="#FFFFFF" />
                  </div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E293B' }}>
                      2 min 25 sec
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>
                      Active Duration
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowRight size={13} color="#1E293B" strokeWidth={2.5} />
                </div>
              </div>

              {/* Row 2: 30 sec / Recovery Time */}
              <div
                onClick={() => showToast('Ajustar tiempo de recuperación')}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#1E293B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Clock size={14} color="#FFFFFF" />
                  </div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E293B' }}>
                      30 sec
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>
                      Recovery Time
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowRight size={13} color="#1E293B" strokeWidth={2.5} />
                </div>
              </div>

              {/* Row 3: Alert Sound / Timer Alert */}
              <div
                onClick={() => showToast('Sonido de alerta: Campana')}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#1E293B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Volume2 size={14} color="#FFFFFF" />
                  </div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E293B' }}>
                      Alert Sound
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>
                      Timer Alert
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowRight size={13} color="#1E293B" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>

          {/* iOS Home Indicator Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '134px',
              height: '4px',
              backgroundColor: '#1E293B',
              borderRadius: '10px',
              zIndex: 40,
            }}
          />
        </div>
      )}
    </div>
  );
};
