'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Disc, Moon, Sparkles, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const HomeScreen: React.FC = () => {
  const {
    profile,
    adherenceRate,
    pillsRemain,
    totalPills,
    setActiveTab,
    pushView,
    t,
    theme,
  } = useApp();

  const containerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const medCardRef = useRef<HTMLDivElement>(null);
  const wellnessCardRef = useRef<HTMLDivElement>(null);
  const stripedBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.fade-header', {
        y: -15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
      })
      .from(heroCardRef.current, {
        scale: 0.95,
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, '-=0.3')
      .from(stripedBarRef.current, {
        width: '0%',
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.2')
      .from([medCardRef.current, wellnessCardRef.current], {
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.55,
      }, '-=0.4');
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '12px 20px 100px 20px',
        overflowY: 'auto',
        height: '100%',
        color: 'var(--text-primary)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '4px' }}>
        <div>
          <h1
            className="fade-header"
            style={{
              fontSize: '24px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {t('hello')} {profile.name} <span>👋</span>
          </h1>
          <p
            className="fade-header"
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              marginTop: '2px',
              fontWeight: 500,
            }}
          >
            {t('howDoing')} &quot;{profile.name}&quot;!
          </p>
        </div>

        {/* Orange Pill Badge (1:30 Hour) */}
        <div
          className="fade-header"
          onClick={() => pushView('medication-detail')}
          style={{
            backgroundColor: 'var(--card-peach)',
            border: '1px solid rgba(255, 106, 67, 0.25)',
            borderRadius: '20px',
            padding: '4px 10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(255, 106, 67, 0.08)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          title="Ver próxima toma"
        >
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-orange)', lineHeight: 1.1 }}>
            1:30
          </span>
          <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {t('hour')}
          </span>
        </div>
      </div>

      {/* Hero Card: Shohan's Device */}
      <div
        ref={heroCardRef}
        style={{
          backgroundColor: 'var(--card-white)',
          borderRadius: '30px',
          padding: '22px 20px 20px 20px',
          boxShadow: 'var(--shadow-card)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(230, 235, 240, 0.3)',
        }}
      >
        {/* Top Section with Device Info & Avatar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div
            onClick={() => setActiveTab('options')}
            style={{ cursor: 'pointer' }}
            title="Ir al perfil"
          >
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#27313D' }}>
              {profile.name}&apos;s Device
            </span>
            <div style={{ marginTop: '3px' }}>
              <span style={{ fontSize: '12px', color: '#6A7888', fontWeight: 500 }}>
                Device ID:{' '}
              </span>
              <span style={{ fontSize: '12px', color: '#73A932', fontWeight: 700 }}>
                {profile.deviceId}
              </span>
            </div>
          </div>

          {/* Avatar with Soft Teal Circle Backdrop */}
          <div
            onClick={() => setActiveTab('options')}
            style={{ position: 'relative', width: '84px', height: '84px', cursor: 'pointer' }}
            title="Ver opciones de perfil"
          >
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #B2E2E4 0%, #D8F2F3 70%, transparent 100%)',
                opacity: 0.9,
              }}
            />
            <div
              style={{
                position: 'relative',
                width: '78px',
                height: '78px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2.5px solid #FFFFFF',
                boxShadow: '0 4px 14px rgba(48, 164, 168, 0.25)',
              }}
            >
              <Image
                src={profile.avatarUrl && profile.avatarUrl.trim() !== '' ? profile.avatarUrl : '/avatar.jpg'}
                alt={profile.name || 'Usuario'}
                fill
                sizes="80px"
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Divider Stats Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px',
            marginTop: '8px',
            paddingTop: '6px',
          }}
        >
          {/* Left Column: Avg. Adherence */}
          <div
            onClick={() => setActiveTab('statistics')}
            style={{ cursor: 'pointer' }}
            title="Ver reporte estadístico detallado"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {t('avgAdherence')}
              </span>
              <ChevronRight size={12} color="var(--text-muted)" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', margin: '1px 0 6px 0' }}>
              {adherenceRate}%
            </div>

            {/* Slanted Green Striped Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '13px',
                backgroundColor: theme === 'dark' ? '#1F2937' : '#EDF1E8',
                borderRadius: '7px',
                overflow: 'hidden',
              }}
            >
              <div
                ref={stripedBarRef}
                className="striped-green-bar"
                style={{
                  width: `${adherenceRate}%`,
                  height: '100%',
                  borderRadius: '7px',
                }}
              />
            </div>
          </div>

          {/* Right Column: Pills remain */}
          <div
            onClick={() => pushView('medication-detail')}
            style={{ cursor: 'pointer' }}
            title="Ver calendario de dosis"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {t('pillsRemain')}
              </span>
              <ChevronRight size={12} color="var(--text-muted)" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 6px 0' }}>
              {pillsRemain}
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>
                /{totalPills}
              </span>
            </div>

            {/* Micro Dot Matrix Visualizer */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '2.5px',
                alignItems: 'center',
                height: '13px',
                padding: '2px 0',
              }}
            >
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '3.5px',
                    height: '3.5px',
                    borderRadius: '50%',
                    backgroundColor: i < (pillsRemain / totalPills) * 36 ? 'var(--accent-cyan)' : (theme === 'dark' ? '#27313F' : '#DDE6ED'),
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Medication Card (Pale Mint/Teal) */}
      <div
        ref={medCardRef}
        onClick={() => pushView('medication-detail')}
        style={{
          backgroundColor: 'var(--card-cyan)',
          borderRadius: '26px',
          padding: '18px 20px',
          border: '1px solid var(--card-cyan-border)',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        title="Abrir detalles de medicación"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-cyan)' }}>
              {t('medication')}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1px' }}>
              {t('keepMedication')}
            </h3>
          </div>

          {/* White/Dark Circular Badge */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--card-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(48, 164, 168, 0.18)',
            }}
          >
            <Disc size={18} color="var(--accent-cyan)" />
          </div>
        </div>

        <p
          style={{
            fontSize: '12.5px',
            lineHeight: 1.45,
            color: 'var(--text-secondary)',
            marginTop: '8px',
            fontWeight: 500,
          }}
        >
          &quot;{profile.name}&quot; {t('medicationMsg')}{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{t('hoursAndMins')}</strong>
        </p>
      </div>

      {/* Wellness Card (Pale Lime Green) */}
      <div
        ref={wellnessCardRef}
        onClick={() => pushView('wellness-detail')}
        style={{
          backgroundColor: 'var(--card-lime)',
          borderRadius: '26px',
          padding: '18px 20px',
          border: '1px solid var(--card-lime-border)',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        title="Abrir historias y relajación"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-green)' }}>
              {t('wellness')}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1px' }}>
              {t('bedtimeStories')}
            </h3>
          </div>

          {/* White/Dark Circular Badge with Moon Icon */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--card-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(115, 169, 50, 0.18)',
            }}
          >
            <Moon size={18} color="var(--accent-green)" />
          </div>
        </div>

        <p
          style={{
            fontSize: '12.5px',
            lineHeight: 1.45,
            color: 'var(--text-secondary)',
            marginTop: '8px',
            fontWeight: 500,
          }}
        >
          &quot;{profile.name}&quot; {t('wellnessMsg')}
        </p>
      </div>

      {/* Bottom Peek Image Card */}
      <div
        onClick={() => pushView('health-base')}
        style={{
          width: '100%',
          height: '110px',
          borderRadius: '26px 26px 0 0',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)',
          cursor: 'pointer',
        }}
        title="Ver métricas de ambiente y salud"
      >
        <Image
          src="/wellness.jpg"
          alt="Rest & Recovery"
          fill
          sizes="360px"
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(14,20,27,0.75) 0%, transparent 60%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '12px 18px',
          }}
        >
          <span style={{ color: '#FFFFFF', fontSize: '11.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sparkles size={12} color="#A2E285" /> Environment Sensor: 21°C • Quiet (Ver más)
          </span>
        </div>
      </div>
    </div>
  );
};
