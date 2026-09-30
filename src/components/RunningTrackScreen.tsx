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
  Heart
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { JessicaAvatarSVG } from '@/components/JessicaAvatarSVG';

export type RunningScreenMode = 'dashboard' | 'map' | 'timetrack';

export const RunningTrackScreen: React.FC = () => {
  const { setActiveTab, showToast } = useApp();
  // 'dashboard' = Screen 2 (Hey, Jessica), 'map' = Screen 1 (Track Activity), 'timetrack' = Screen 3 (Time Track)
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
    showToast('¡Sesión de Running GPS iniciada en San Diego! 🏃‍♂️');
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#EBF3F5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
            overflow: 'hidden',
          }}
        >
          {/* Header Bar: Avatar + 124k kal pill on Left, Dark Dial on Right */}
          <div
            style={{
              padding: '52px 20px 6px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 30,
            }}
          >
            {/* Left: Jessica 3D Avatar + 124k kal Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.1)',
                  cursor: 'pointer',
                  border: '1.5px solid #FFFFFF',
                  flexShrink: 0,
                }}
                onClick={() => showToast('Perfil de Jessica')}
                title="Jessica"
              >
                <JessicaAvatarSVG size={38} />
              </div>

              {/* 124k kal Pill */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  boxShadow: '0 3px 10px rgba(15, 23, 42, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.2px' }}>
                  124k
                </span>
                <span style={{ fontSize: '11px', fontWeight: 500, color: '#94A3B8' }}>
                  kal
                </span>
              </div>
            </div>

            {/* Right: Dark Circular Button with Crescent Dial */}
            <button
              onClick={() => showToast('Temporizador rápido activo 🌙')}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#1E2024',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
              }}
              title="Modo / Timer"
            >
              {/* Crescent dial graphic matching mockup */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
                <path
                  d="M12 3A9 9 0 0 1 21 12"
                  stroke="#FFFFFF"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
              </svg>
            </button>
          </div>

          {/* Title Area: Hey, Jessica + Subtitle + Right Start Button */}
          <div
            style={{
              padding: '6px 20px 0 20px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              zIndex: 30,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '25px',
                  fontWeight: 800,
                  color: '#0F172A',
                  margin: '0 0 4px 0',
                  letterSpacing: '-0.6px',
                  lineHeight: 1.15,
                }}
              >
                Hey, Jessica
              </h1>
              <p
                style={{
                  fontSize: '12.5px',
                  color: '#64748B',
                  margin: 0,
                  maxWidth: '200px',
                  lineHeight: 1.35,
                  fontWeight: 500,
                }}
              >
                Crush today&apos;s workout goals and celebrate every strong step.
              </p>
            </div>

            {/* White Start Pill Button (Navigates to Screen 1: Track Activity Map) */}
            <button
              onClick={() => setCurrentScreen('map')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '7px 15px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                cursor: 'pointer',
                marginTop: '4px',
                transition: 'transform 0.15s ease',
              }}
              title="Ir a mapa de running"
            >
              <div
                style={{
                  width: '0',
                  height: '0',
                  borderTop: '4.5px solid transparent',
                  borderBottom: '4.5px solid transparent',
                  borderLeft: '7.5px solid #0F172A',
                }}
              />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                Start
              </span>
            </button>
          </div>

          {/* Hero Section: Runner Athlete + Floating 20 Min Badge */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '-10px',
            }}
          >
            {/* Athlete Photo (Clean, high-res photograph with matching pale cyan background) */}
            <img
              src="/runner_jessica_clean_bg.jpg"
              alt="Jessica Running Athlete"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center 35%',
                display: 'block',
                pointerEvents: 'none',
              }}
            />

            {/* Floating 20 Min Badge on athlete's left */}
            <div
              style={{
                position: 'absolute',
                top: '28%',
                left: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '6px 12px 6px 9px',
                borderRadius: '22px',
                boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.9) inset',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 25,
              }}
            >
              {/* Stopwatch icon in dark circle */}
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Clock size={13} color="#FFFFFF" strokeWidth={2.5} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
                  20
                </span>
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#94A3B8', lineHeight: 1 }}>
                  Min
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Card: Frosted Glass Container with Active Stats */}
          <div
            style={{
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.72)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '32px 32px 0 0',
              padding: '16px 20px 88px 20px',
              boxShadow: '0 -10px 32px rgba(15, 23, 42, 0.06), 0 -1px 0 rgba(255, 255, 255, 0.8) inset',
              zIndex: 35,
              flexShrink: 0,
            }}
          >
            {/* Top Row: Active Stats heading + Cyan Circle Arrow Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.3px' }}>
                Active Stats
              </span>

              {/* Cyan Circle Arrow Button (Navigates to Screen 3: Time Track) */}
              <button
                onClick={() => setCurrentScreen('timetrack')}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#88DCF0',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(136, 220, 240, 0.45)',
                  transition: 'transform 0.15s ease',
                }}
                title="Ver Time Track y Rondas"
              >
                <ArrowRight size={17} color="#0F172A" strokeWidth={2.8} />
              </button>
            </div>

            {/* Stat Cards Row: Calories & Steps */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Card 1: Calories */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '22px',
                  padding: '12px 14px',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Flame size={15} color="#0F172A" strokeWidth={2.5} />
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>
                    Calories
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.3px' }}>
                    250
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>
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
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Footprints size={15} color="#0F172A" strokeWidth={2.5} />
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>
                    Steps
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.3px' }}>
                    10,345
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8' }}>
                    steps
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
            overflow: 'hidden',
          }}
        >
          {/* Background Vector Map */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
            }}
          >
            <img
              src="/running_map_hero.jpg"
              alt="Roadmap"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />

            {/* Radar Pulse in Center Area */}
            <div
              style={{
                position: 'absolute',
                top: '49%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                backgroundColor: 'rgba(136, 220, 240, 0.28)',
                border: '1.5px solid rgba(136, 220, 240, 0.65)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(136, 220, 240, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Red Pin Location Indicator */}
                <div
                  style={{
                    width: '32px',
                    height: '38px',
                    filter: 'drop-shadow(0 4px 10px rgba(239, 68, 68, 0.4))',
                  }}
                >
                  <svg width="32" height="38" viewBox="0 0 34 42" fill="none">
                    <path
                      d="M17 0C7.61 0 0 7.61 0 17C0 29.75 17 42 17 42C17 42 34 29.75 34 17C34 7.61 26.39 0 17 0Z"
                      fill="#FF4B4B"
                    />
                    <circle cx="17" cy="17" r="9" fill="#0F172A" />
                    <circle cx="17" cy="17" r="4.5" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Runner Pin: Alex (Top Right) */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                right: '15%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                padding: '3px 8px 3px 3px',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
                zIndex: 10,
              }}
            >
              <img
                src="/avatar.jpg"
                alt="Alex"
                style={{ width: '22px', height: '22px', borderRadius: '50%', marginRight: '5px', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A' }}>Alex</span>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#FF4B4B', marginLeft: '5px' }} />
            </div>

            {/* Runner Pin: Nyla (Center Left) */}
            <div
              style={{
                position: 'absolute',
                top: '32%',
                left: '28%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                padding: '3px 8px 3px 3px',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
                zIndex: 10,
              }}
            >
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', marginRight: '5px', overflow: 'hidden' }}>
                <JessicaAvatarSVG size={22} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A' }}>Nyla</span>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#FF4B4B', marginLeft: '5px' }} />
            </div>

            {/* Runner Pin: James (Mid Left) */}
            <div
              style={{
                position: 'absolute',
                top: '42%',
                left: '10%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                padding: '3px 8px 3px 3px',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
                zIndex: 10,
              }}
            >
              <img
                src="/hero_athlete.jpg"
                alt="James"
                style={{ width: '22px', height: '22px', borderRadius: '50%', marginRight: '5px', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A' }}>James</span>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#FF4B4B', marginLeft: '5px' }} />
            </div>

            {/* Runner Pin: Neloy (Lower Right) */}
            <div
              style={{
                position: 'absolute',
                top: '52%',
                right: '12%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                padding: '3px 8px 3px 3px',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
                zIndex: 10,
              }}
            >
              <img
                src="/trainer_squat.jpg"
                alt="Neloy"
                style={{ width: '22px', height: '22px', borderRadius: '50%', marginRight: '5px', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A' }}>Neloy</span>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#FF4B4B', marginLeft: '5px' }} />
            </div>
          </div>

          {/* Top Header: Back button + Track Activity + Gym bag */}
          <div
            style={{
              padding: '52px 20px 10px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 30,
              position: 'relative',
            }}
          >
            {/* Back Button -> returns to Hey, Jessica */}
            <button
              onClick={() => setCurrentScreen('dashboard')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.15s ease',
              }}
              title="Volver a Jessica"
            >
              <ChevronLeft size={20} color="#0F172A" strokeWidth={2.5} />
            </button>

            <h1
              style={{
                fontSize: '17px',
                fontWeight: 700,
                color: '#0F172A',
                margin: 0,
                letterSpacing: '-0.3px',
              }}
            >
              Track Activity
            </h1>

            {/* Right Gym Bag Button */}
            <button
              onClick={() => showToast('Mochila de actividad abierta')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Casillero"
            >
              <ShoppingBag size={17} color="#0F172A" strokeWidth={2.2} />
            </button>
          </div>

          {/* Spacer to push floating cards to bottom */}
          <div style={{ flex: 1 }} />

          {/* Bottom Floating Cards Row (Above BottomDock) */}
          <div
            style={{
              position: 'relative',
              zIndex: 30,
              padding: '0 16px 85px 16px',
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
                padding: '14px',
                boxShadow: '0 10px 28px rgba(15, 23, 42, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Footprints size={14} color="#0F172A" />
                </div>
                <div style={{ flex: 1, borderBottom: '1.5px dashed #CBD5E1', margin: '0 8px' }} />
              </div>

              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                10 Runners
              </div>

              {/* Avatar Stack with 8+ */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src="/avatar.jpg"
                  alt="Runner"
                  style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #FFFFFF', zIndex: 3, objectFit: 'cover' }}
                />
                <img
                  src="/hero_athlete.jpg"
                  alt="Runner"
                  style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #FFFFFF', marginLeft: '-6px', zIndex: 2, objectFit: 'cover' }}
                />
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '2px solid #FFFFFF',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '-6px',
                    zIndex: 1,
                  }}
                >
                  8+
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', paddingTop: '6px', borderTop: '1px solid #F1F5F9' }}>
                <MapPin size={13} color="#0F172A" strokeWidth={2.5} />
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#0F172A' }}>
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
                  height: '46px',
                  borderRadius: '24px',
                  backgroundColor: '#88DCF0',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 18px rgba(136, 220, 240, 0.45)',
                  transition: 'transform 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Play size={10} fill="#0F172A" color="#0F172A" style={{ marginLeft: '1px' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
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
                  padding: '12px 14px',
                  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.12)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <MapPin size={13} color="#0F172A" strokeWidth={2.5} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>
                    Distance
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>
                    {distance}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                    km
                  </span>
                </div>
                <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 500 }}>
                  Route Covered
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 3: TIME TRACK (INTERVALS & SMARTWATCH HEART PULSE)                 */}
      {/* ========================================================================= */}
      {currentScreen === 'timetrack' && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Hero Athlete Image (Woman with smartwatch & glowing holographic heart) */}
          <div
            style={{
              position: 'absolute',
              top: '95px',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          >
            <img
              src="/timetrack_woman_hero.jpg"
              alt="Athlete with Smartwatch"
              style={{
                width: '100%',
                height: '56%',
                objectFit: 'cover',
                objectPosition: 'center 12%',
                display: 'block',
              }}
            />

            {/* Floating Badge on Right: Heart 70 */}
            <div
              style={{
                position: 'absolute',
                top: '26%',
                right: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '6px 14px',
                borderRadius: '22px',
                boxShadow: '0 6px 20px rgba(15, 23, 42, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                zIndex: 15,
              }}
            >
              <Heart size={15} color="#EF4444" fill="#EF4444" />
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                70
              </span>
            </div>
          </div>

          {/* Top Header: Back button + Time Track + Gym bag */}
          <div
            style={{
              padding: '52px 20px 10px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 30,
              position: 'relative',
            }}
          >
            <button
              onClick={() => setCurrentScreen('dashboard')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.15s ease',
              }}
              title="Volver a Jessica"
            >
              <ChevronLeft size={20} color="#0F172A" strokeWidth={2.5} />
            </button>

            <h1
              style={{
                fontSize: '17px',
                fontWeight: 700,
                color: '#0F172A',
                margin: 0,
                letterSpacing: '-0.3px',
              }}
            >
              Time Track
            </h1>

            <button
              onClick={() => showToast('Configuraciones guardadas')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Ajustes"
            >
              <ShoppingBag size={17} color="#0F172A" strokeWidth={2.2} />
            </button>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Bottom Frosted Container: Rounds Selector + 3 Row Cards */}
          <div
            style={{
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.82)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '32px 32px 0 0',
              padding: '14px 20px 85px 20px',
              boxShadow: '0 -10px 32px rgba(15, 23, 42, 0.08)',
              zIndex: 30,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {/* Center Pill: Rounds */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '5px 14px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)',
                }}
              >
                <Timer size={13} color="#0F172A" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                  Rounds
                </span>
              </div>
            </div>

            {/* Rounds Selector: 10 | 20 | [ 30 ] | 40 | 50 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 6px',
                marginBottom: '4px',
              }}
            >
              {[10, 20, 30, 40, 50].map((round) => {
                const isSelected = round === selectedRound;
                return (
                  <button
                    key={round}
                    onClick={() => {
                      setSelectedRound(round);
                      showToast(`Seleccionadas: ${round} Rondas`);
                    }}
                    style={{
                      width: '46px',
                      height: '38px',
                      borderRadius: isSelected ? '14px' : '10px',
                      backgroundColor: isSelected ? '#88DCF0' : 'transparent',
                      color: '#0F172A',
                      fontWeight: isSelected ? 800 : 600,
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isSelected ? '0 4px 12px rgba(136, 220, 240, 0.5)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {round}
                  </button>
                );
              })}
            </div>

            {/* Row 1: Active Duration */}
            <div
              onClick={() => showToast('Ajustar duración activa')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '11px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 3px 10px rgba(15, 23, 42, 0.04)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={16} color="#0F172A" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', lineHeight: 1.15 }}>
                    2 min 25 sec
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 500 }}>
                    Active Duration
                  </div>
                </div>
              </div>
              <ArrowRight size={14} color="#0F172A" />
            </div>

            {/* Row 2: Recovery Time */}
            <div
              onClick={() => showToast('Ajustar tiempo de recuperación')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '11px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 3px 10px rgba(15, 23, 42, 0.04)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Timer size={16} color="#0F172A" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', lineHeight: 1.15 }}>
                    30 sec
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 500 }}>
                    Recovery Time
                  </div>
                </div>
              </div>
              <ArrowRight size={14} color="#0F172A" />
            </div>

            {/* Row 3: Alert Sound */}
            <div
              onClick={() => showToast('Alerta de sonido activada: Ding 🔔')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '11px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 3px 10px rgba(15, 23, 42, 0.04)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Volume2 size={16} color="#0F172A" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', lineHeight: 1.15 }}>
                    Alert Sound
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 500 }}>
                    Timer Alert
                  </div>
                </div>
              </div>
              <ArrowRight size={14} color="#0F172A" />
            </div>
          </div>
        </div>
      )}

      {/* Subtle Native iOS Page Dots (Positioned right above the BottomDock) */}
      <div
        style={{
          position: 'absolute',
          bottom: '76px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 55,
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
          pointerEvents: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(10px)',
          padding: '4px 8px',
          borderRadius: '12px',
        }}
      >
        <button
          onClick={() => setCurrentScreen('map')}
          style={{
            width: currentScreen === 'map' ? '16px' : '6px',
            height: '6px',
            borderRadius: '4px',
            backgroundColor: currentScreen === 'map' ? '#0F172A' : '#CBD5E1',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          title="Track Activity (Mapa)"
        />
        <button
          onClick={() => setCurrentScreen('dashboard')}
          style={{
            width: currentScreen === 'dashboard' ? '16px' : '6px',
            height: '6px',
            borderRadius: '4px',
            backgroundColor: currentScreen === 'dashboard' ? '#0F172A' : '#CBD5E1',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          title="Hey, Jessica"
        />
        <button
          onClick={() => setCurrentScreen('timetrack')}
          style={{
            width: currentScreen === 'timetrack' ? '16px' : '6px',
            height: '6px',
            borderRadius: '4px',
            backgroundColor: currentScreen === 'timetrack' ? '#0F172A' : '#CBD5E1',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          title="Time Track"
        />
      </div>
    </div>
  );
};
