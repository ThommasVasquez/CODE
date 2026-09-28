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
              color: '#0E141B',
              letterSpacing: '-0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Hello {profile.name} <span>👋</span>
          </h1>
          <p
            className="fade-header"
            style={{
              fontSize: '13px',
              color: '#5C6A79',
              marginTop: '2px',
              fontWeight: 500,
            }}
          >
            Here&apos;s how &quot;{profile.name}&quot; is doing!
          </p>
        </div>

        {/* Orange Pill Badge (1:30 Hour) */}
        <div
          className="fade-header"
          onClick={() => pushView('medication-detail')}
          style={{
            backgroundColor: '#FFF0EA',
            border: '1px solid #FFE0D3',
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
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#FF5E36', lineHeight: 1.1 }}>
            1:30
          </span>
          <span style={{ fontSize: '9px', fontWeight: 600, color: '#A36855', textTransform: 'uppercase' }}>
            Hour
          </span>
        </div>
      </div>

      {/* Hero Card: Shohan's Device */}
      <div
        ref={heroCardRef}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '30px',
          padding: '22px 20px 20px 20px',
          boxShadow: '0 8px 30px rgba(16, 24, 40, 0.05)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(230, 235, 240, 0.8)',
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
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                sizes="80px"
                style={{ objectFit: 'cover' }}
                priority
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
              <span style={{ fontSize: '10.5px', color: '#6B7A8B', fontWeight: 600 }}>
                Avg. Adherence
              </span>
              <ChevronRight size={12} color="#8E9DAE" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0E141B', margin: '1px 0 6px 0' }}>
              {adherenceRate}%
            </div>

            {/* Slanted Green Striped Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '13px',
                backgroundColor: '#EDF1E8',
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
              <span style={{ fontSize: '10.5px', color: '#6B7A8B', fontWeight: 600 }}>
                Pills remain in the Pack
              </span>
              <ChevronRight size={12} color="#8E9DAE" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0E141B', margin: '2px 0 6px 0' }}>
              {pillsRemain}
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#7E8C9C' }}>
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
                    backgroundColor: i < (pillsRemain / totalPills) * 36 ? '#30A4A8' : '#DDE6ED',
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
          backgroundColor: '#DEF1F2',
          borderRadius: '26px',
          padding: '18px 20px',
          border: '1px solid #CFEBEB',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        title="Abrir detalles de medicación"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#3A777A' }}>
              Medication
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0E1E22', marginTop: '1px' }}>
              Keep Medication
            </h3>
          </div>

          {/* White Circular Badge */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(48, 164, 168, 0.18)',
            }}
          >
            <Disc size={18} color="#30A4A8" />
          </div>
        </div>

        <p
          style={{
            fontSize: '12.5px',
            lineHeight: 1.45,
            color: '#345558',
            marginTop: '8px',
            fontWeight: 500,
          }}
        >
          &quot;{profile.name}&quot; has taken his medication and is due for their next intake in time{' '}
          <strong style={{ color: '#133538', fontWeight: 700 }}>12 hours and 16 minutes!</strong>
        </p>
      </div>

      {/* Wellness Card (Pale Lime Green) */}
      <div
        ref={wellnessCardRef}
        onClick={() => pushView('wellness-detail')}
        style={{
          backgroundColor: '#EAF4DC',
          borderRadius: '26px',
          padding: '18px 20px',
          border: '1px solid #DDEEC7',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        title="Abrir historias y relajación"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#57782A' }}>
              Wellness
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1A290E', marginTop: '1px' }}>
              Bedtime Stories
            </h3>
          </div>

          {/* White Circular Badge with Moon Icon */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(115, 169, 50, 0.18)',
            }}
          >
            <Moon size={18} color="#73A932" />
          </div>
        </div>

        <p
          style={{
            fontSize: '12.5px',
            lineHeight: 1.45,
            color: '#3C4F24',
            marginTop: '8px',
            fontWeight: 500,
          }}
        >
          &quot;{profile.name}&quot; has perform his wellness check today
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
