'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Timer, Play, Square, Sparkles, Flame, ShieldCheck, Heart, Info, CheckCircle2 } from 'lucide-react';

export const FastingDetailView: React.FC = () => {
  const {
    fastingState,
    toggleFasting,
    setFastingPlan,
    fastingComplianceRate,
    t,
    theme,
  } = useApp();

  const containerRef = useRef<HTMLDivElement>(null);
  const circleProgressRef = useRef<SVGCircleElement>(null);

  const plans: Array<'14:10' | '16:8' | '18:6' | '20:4'> = ['14:10', '16:8', '18:6', '20:4'];
  const percentComplete = Math.min(100, Math.round((fastingState.elapsedHours / fastingState.targetHours) * 100));

  // Circular progress calculations (Radius = 78, Circumference = 2 * PI * 78 ≈ 490)
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentComplete) / 100;

  useGSAP(
    () => {
      gsap.from('.fasting-card', {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
      });

      if (circleProgressRef.current) {
        gsap.fromTo(
          circleProgressRef.current,
          { strokeDashoffset: circumference },
          { strokeDashoffset, duration: 1.2, ease: 'power2.out' }
        );
      }
    },
    { scope: containerRef, dependencies: [fastingState.plan, fastingState.isFasting] }
  );

  const getMetabolicStage = (hours: number) => {
    if (hours < 12) {
      return {
        title: 'Digestión & Quema de Glucógeno',
        desc: 'Tu cuerpo está gastando la energía de las últimas comidas e iniciando la lipólisis.',
        color: 'var(--accent-cyan)',
        stage: 1,
      };
    }
    if (hours < 16) {
      return {
        title: 'Cetosis Metabólica & Quema de Grasa',
        desc: 'Los niveles de insulina caen y el hígado transforma grasa almacenada en cuerpos cetónicos.',
        color: 'var(--accent-orange)',
        stage: 2,
      };
    }
    return {
      title: 'Autofagia Celular & Rejuvenecimiento',
      desc: 'Tus células reciclan componentes dañados, estimulando la longevidad y desinflamación.',
      color: 'var(--accent-green)',
      stage: 3,
    };
  };

  const currentStage = getMetabolicStage(fastingState.elapsedHours);

  return (
    <div
      ref={containerRef}
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
      <IOSHeader title={t('fastingTitle')} subtitle={`Protocolo ${fastingState.plan}`} />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Fasting Plan Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
          {plans.map((p) => {
            const isSelected = fastingState.plan === p;
            return (
              <button
                key={p}
                onClick={() => setFastingPlan(p)}
                style={{
                  padding: '9px 0',
                  borderRadius: '16px',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid rgba(220, 226, 230, 0.4)',
                  backgroundColor: isSelected ? 'var(--accent-cyan)' : 'var(--card-white)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 3px 10px rgba(48, 164, 168, 0.3)' : 'var(--shadow-subtle)',
                }}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Circular Fasting Progress Clock */}
        <div
          className="fasting-card"
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '30px',
            padding: '24px 20px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* SVG Radial Clock */}
          <div style={{ position: 'relative', width: '190px', height: '190px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="190" height="190" style={{ transform: 'rotate(-90deg)' }}>
              {/* Background Track */}
              <circle
                cx="95"
                cy="95"
                r={radius}
                fill="none"
                stroke={theme === 'dark' ? '#1F2937' : '#EDF4F6'}
                strokeWidth="12"
              />
              {/* Active Progress Path */}
              <circle
                ref={circleProgressRef}
                cx="95"
                cy="95"
                r={radius}
                fill="none"
                stroke="var(--accent-cyan)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            </svg>

            {/* Inner Clock Center Text */}
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: fastingState.isFasting ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                }}
              >
                {fastingState.isFasting ? t('fastingActive') : 'Ventana Abierta'}
              </span>
              <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1, marginTop: '2px' }}>
                {fastingState.elapsedHours}h
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                de {fastingState.targetHours} horas ({percentComplete}%)
              </span>
            </div>
          </div>

          {/* Start / Stop Fasting Button */}
          <button
            onClick={toggleFasting}
            style={{
              marginTop: '16px',
              padding: '12px 28px',
              borderRadius: '24px',
              backgroundColor: fastingState.isFasting ? 'var(--card-peach)' : 'var(--accent-cyan)',
              color: fastingState.isFasting ? 'var(--accent-orange)' : '#FFFFFF',
              border: fastingState.isFasting ? '1px solid rgba(255, 106, 67, 0.3)' : 'none',
              fontSize: '14px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: fastingState.isFasting ? 'none' : '0 4px 14px rgba(48, 164, 168, 0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            {fastingState.isFasting ? (
              <>
                <Square size={14} fill="currentColor" /> {t('endFast')}
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" /> {t('startFast')}
              </>
            )}
          </button>
        </div>

        {/* Current Metabolic Zone Card */}
        <div
          className="fasting-card"
          style={{
            backgroundColor: 'var(--card-cyan)',
            borderRadius: '24px',
            padding: '18px 20px',
            border: '1px solid var(--card-cyan-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--accent-cyan)" />
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              Fase Actual: {currentStage.title}
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.45 }}>
            {currentStage.desc}
          </p>
        </div>

        {/* 3 Metabolic Milestones Timeline */}
        <div
          className="fasting-card"
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '18px 20px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(220, 226, 230, 0.35)',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Etapas Biológicas del Ayuno
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Stage 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: fastingState.elapsedHours >= 4 ? 'var(--accent-cyan)' : 'var(--device-bg)',
                  color: fastingState.elapsedHours >= 4 ? '#FFFFFF' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  0 - 12h: Descenso de Insulina & Digestión
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  El tracto gastrointestinal descansa y los niveles de azúcar en sangre se estabilizan.
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: fastingState.elapsedHours >= 12 ? 'var(--accent-orange)' : 'var(--device-bg)',
                  color: fastingState.elapsedHours >= 12 ? '#FFFFFF' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  12 - 16h: Quema de Grasa Acelerada (Cetosis)
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  La grasa corporal se oxida preferencialmente para suministrar energía a los músculos y el cerebro.
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: fastingState.elapsedHours >= 16 ? 'var(--accent-green)' : 'var(--device-bg)',
                  color: fastingState.elapsedHours >= 16 ? '#FFFFFF' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                3
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  16h+: Autofagia Celular CODE®
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Premio Nobel de Medicina: las células eliminan mitocondrias y proteínas senescentes dañadas.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Allowed Drinks Tip Banner */}
        <div
          style={{
            backgroundColor: 'var(--card-lime)',
            borderRadius: '20px',
            padding: '14px 16px',
            border: '1px solid var(--card-lime-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Info size={18} color="var(--accent-green)" />
          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Bebidas permitidas:</strong> Agua mineral, café solo sin azúcar, té verde e infusiones con una pizca de sal marina.
          </div>
        </div>
      </div>
    </div>
  );
};
