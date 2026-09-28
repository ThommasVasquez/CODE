'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ChevronRight,
  ArrowUpRight,
  Dumbbell,
  Utensils,
  Timer,
  Flame,
  CheckCircle2,
  TrendingUp,
  Disc,
  Calendar,
  Zap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const StatisticsScreen: React.FC = () => {
  const {
    workoutComplianceRate,
    dietComplianceRate,
    fastingComplianceRate,
    workoutSchedule,
    calorieMetrics,
    bottles,
    toggleBottle,
    consumedToday,
    adherenceRate,
    pushView,
    t,
    theme,
  } = useApp();

  const [filterPeriod, setFilterPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');

  const containerRef = useRef<HTMLDivElement>(null);
  const workoutBarRef = useRef<HTMLDivElement>(null);
  const dietBarRef = useRef<HTMLDivElement>(null);
  const chartPathRef = useRef<SVGPathElement>(null);
  const chartBurnedPathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.stat-title', {
        y: -12,
        opacity: 0,
        duration: 0.45,
        clearProps: 'transform,opacity',
      })
      .from('.stat-card', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        clearProps: 'transform,opacity',
      }, '-=0.2')
      .from([workoutBarRef.current, dietBarRef.current], {
        width: '0%',
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.3');

      // Animate SVG wave paths
      if (chartPathRef.current && chartBurnedPathRef.current) {
        const len1 = chartPathRef.current.getTotalLength();
        const len2 = chartBurnedPathRef.current.getTotalLength();

        gsap.set(chartPathRef.current, { strokeDasharray: len1, strokeDashoffset: len1 });
        gsap.set(chartBurnedPathRef.current, { strokeDasharray: len2, strokeDashoffset: len2 });

        tl.to(chartPathRef.current, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, '-=0.5');
        tl.to(chartBurnedPathRef.current, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, '-=0.9');
      }
    },
    { scope: containerRef, dependencies: [filterPeriod] }
  );

  const getFilterLabel = (p: 'Daily' | 'Weekly' | 'Monthly') => {
    if (p === 'Daily') return t('daily');
    if (p === 'Weekly') return t('weekly');
    return t('monthly');
  };

  // Weekly data comparison (Mon - Sun)
  const weekDays = [
    { day: 'Lun', consumed: 2100, burned: 580 },
    { day: 'Mar', consumed: 1980, burned: 620 },
    { day: 'Mié', consumed: 2250, burned: 450 },
    { day: 'Jue', consumed: 2050, burned: 520 },
    { day: 'Vie', consumed: 2180, burned: 600 },
    { day: 'Sáb', consumed: 2300, burned: 690 },
    { day: 'Dom', consumed: 1950, burned: 350 },
  ];

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
      {/* Top Title & Period Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
        <div>
          <h1
            className="stat-title"
            style={{
              fontSize: '24px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.5px',
            }}
          >
            {t('statisticsReport')}
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Cumplimiento de metas, dietas y balance
          </p>
        </div>

        {/* Filter Period Toggle */}
        <button
          onClick={() => {
            const next = filterPeriod === 'Daily' ? 'Weekly' : filterPeriod === 'Weekly' ? 'Monthly' : 'Daily';
            setFilterPeriod(next);
          }}
          style={{
            backgroundColor: 'var(--card-white)',
            border: '1px solid rgba(220, 226, 230, 0.5)',
            borderRadius: '20px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11.5px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-subtle)',
            cursor: 'pointer',
          }}
          title="Cambiar intervalo temporal"
        >
          {getFilterLabel(filterPeriod)}
          <ChevronRight size={13} color="var(--text-muted)" />
        </button>
      </div>

      {/* Dual Compliance Highlight Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Card 1: Workout Goals Compliance */}
        <div
          className="stat-card"
          onClick={() => pushView('workout-detail')}
          style={{
            backgroundColor: 'var(--card-lime)',
            borderRadius: '24px',
            padding: '16px 14px',
            border: '1px solid var(--card-lime-border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          title="Ver entrenamientos"
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--accent-green)', textTransform: 'uppercase' }}>
                {t('workoutCompliance')}
              </span>
              <Dumbbell size={15} color="var(--accent-green)" />
            </div>

            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
              {workoutComplianceRate}%
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {workoutSchedule.completedThisWeek} de {workoutSchedule.weeklyTarget} sesiones esta semana
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            <div
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: theme === 'dark' ? '#1E293B' : 'rgba(255,255,255,0.7)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                ref={workoutBarRef}
                style={{
                  width: `${workoutComplianceRate}%`,
                  height: '100%',
                  backgroundColor: 'var(--accent-green)',
                  borderRadius: '4px',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', color: 'var(--accent-green)', fontWeight: 700, marginTop: '4px' }}>
              <span>🔥 Meta en camino</span>
              <ChevronRight size={10} />
            </div>
          </div>
        </div>

        {/* Card 2: Diet Compliance */}
        <div
          className="stat-card"
          onClick={() => pushView('diet-detail')}
          style={{
            backgroundColor: 'var(--card-peach)',
            borderRadius: '24px',
            padding: '16px 14px',
            border: '1px solid rgba(255, 106, 67, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          title="Ver nutrición"
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--accent-orange)', textTransform: 'uppercase' }}>
                {t('dietCompliance')}
              </span>
              <Utensils size={15} color="var(--accent-orange)" />
            </div>

            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
              {dietComplianceRate}%
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Adherencia a macros y calorías diarias
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            <div
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: theme === 'dark' ? '#1E293B' : 'rgba(255,255,255,0.7)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                ref={dietBarRef}
                style={{
                  width: `${dietComplianceRate}%`,
                  height: '100%',
                  backgroundColor: 'var(--accent-orange)',
                  borderRadius: '4px',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', color: 'var(--accent-orange)', fontWeight: 700, marginTop: '4px' }}>
              <span>🥗 Superavit/Déficit controlado</span>
              <ChevronRight size={10} />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Energy Balance Chart: Calories Burned vs. Consumed */}
      <div
        className="stat-card"
        style={{
          backgroundColor: 'var(--card-white)',
          borderRadius: '28px',
          padding: '20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid rgba(230, 235, 240, 0.35)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
              {t('energyBalance')}
            </span>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {t('caloriesBurnedVsConsumed')}
            </h3>
          </div>

          <div
            onClick={() => pushView('calorie-calc')}
            style={{
              padding: '5px 10px',
              borderRadius: '14px',
              backgroundColor: 'var(--card-cyan)',
              color: 'var(--accent-cyan)',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            Calculadora <ChevronRight size={12} />
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '14px', marginTop: '12px', fontSize: '11.5px', fontWeight: 600 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-primary)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-orange)' }} />
            Consumidas (~2,100 kcal)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-primary)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-green)' }} />
            Quemadas (~580 kcal)
          </span>
        </div>

        {/* SVG Dual Wave Graph */}
        <div style={{ marginTop: '16px', position: 'relative', height: '130px' }}>
          <svg viewBox="0 0 320 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="consumedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-orange)" stopOpacity={theme === 'dark' ? 0.35 : 0.22} />
                <stop offset="100%" stopColor="var(--accent-orange)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="burnedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-green)" stopOpacity={theme === 'dark' ? 0.35 : 0.22} />
                <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0" />
              </linearGradient>
              <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="var(--accent-orange)" floodOpacity="0.4" />
              </filter>
              <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="var(--accent-green)" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="0" y1="30" x2="320" y2="30" stroke={theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)'} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="70" x2="320" y2="70" stroke={theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)'} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="110" x2="320" y2="110" stroke={theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'} strokeWidth="1" />

            {/* Consumed Calories Curve (Orange) */}
            <path
              d="M 10,50 Q 55,30 100,55 T 190,40 T 270,35 T 310,45 L 310,110 L 10,110 Z"
              fill="url(#consumedGradient)"
            />
            <path
              ref={chartPathRef}
              d="M 10,50 Q 55,30 100,55 T 190,40 T 270,35 T 310,45"
              fill="none"
              stroke="var(--accent-orange)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glowOrange)"
            />

            {/* Burned Calories Curve (Green) */}
            <path
              d="M 10,85 Q 55,75 100,80 T 190,70 T 270,60 T 310,80 L 310,110 L 10,110 Z"
              fill="url(#burnedGradient)"
            />
            <path
              ref={chartBurnedPathRef}
              d="M 10,85 Q 55,75 100,80 T 190,70 T 270,60 T 310,80"
              fill="none"
              stroke="var(--accent-green)"
              strokeWidth="2.8"
              strokeLinecap="round"
              filter="url(#glowGreen)"
            />

            {/* Data Points on Curves */}
            <circle cx="100" cy="55" r="4.5" fill="var(--accent-orange)" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="270" cy="35" r="4.5" fill="var(--accent-orange)" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="190" cy="70" r="4" fill="var(--accent-green)" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="270" cy="60" r="4" fill="var(--accent-green)" stroke="#FFFFFF" strokeWidth="2" />
          </svg>

          {/* Day Labels below chart */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px', marginTop: '6px' }}>
            {weekDays.map((w, idx) => (
              <span key={idx} style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 600 }}>
                {w.day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Fasting Compliance & Cellular Autophagy Stats */}
      <div
        className="stat-card"
        onClick={() => pushView('fasting-detail')}
        style={{
          backgroundColor: 'var(--card-cyan)',
          borderRadius: '26px',
          padding: '18px 20px',
          border: '1px solid var(--card-cyan-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        title="Ver métricas de ayuno"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--card-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(48, 164, 168, 0.2)',
            }}
          >
            <Timer size={20} color="var(--accent-cyan)" />
          </div>

          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
              Cumplimiento de Ayuno Intermitente
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {fastingComplianceRate}% de consistencia
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Promedio: 16.2 horas de ayuno diario • Protocolo 16:8
            </div>
          </div>
        </div>

        <ChevronRight size={18} color="var(--text-muted)" />
      </div>

      {/* Medication & Supplement Intake Compliance (Preserved Feature) */}
      <div
        className="stat-card"
        style={{
          backgroundColor: 'var(--card-white)',
          borderRadius: '26px',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid rgba(230, 235, 240, 0.35)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {t('medicationStatus')} & Suplementación
            </span>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              Adherencia: {adherenceRate}%
            </div>
          </div>

          <div
            onClick={() => pushView('medication-detail')}
            style={{
              fontSize: '11.5px',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            Pastillero <ChevronRight size={13} />
          </div>
        </div>

        {/* Bottles Matrix + Count Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px' }}>
          {/* 3x4 Grid of Pill Bottles */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 22px)',
              gap: '6px 10px',
            }}
          >
            {bottles.map((isConsumed, idx) => (
              <div
                key={idx}
                onClick={() => toggleBottle(idx)}
                style={{
                  width: '22px',
                  height: '26px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                title={isConsumed ? `Pastilla #${idx + 1}` : `Pastilla #${idx + 1}`}
              >
                <div
                  style={{
                    width: '12px',
                    height: '3.5px',
                    borderRadius: '2px',
                    backgroundColor: isConsumed ? 'var(--accent-cyan)' : (theme === 'dark' ? '#334155' : '#B8CFD5'),
                  }}
                />
                <div
                  style={{
                    width: '18px',
                    height: '22px',
                    borderRadius: '3px 3px 5px 5px',
                    backgroundColor: isConsumed ? 'var(--accent-cyan)' : (theme === 'dark' ? '#1E293B' : '#C7DEE4'),
                    marginTop: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isConsumed ? '0 2px 6px rgba(48, 164, 168, 0.35)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isConsumed && (
                    <div style={{ width: '7px', height: '8px', backgroundColor: '#FFFFFF', borderRadius: '2px', opacity: 0.7 }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {String(consumedToday).padStart(2, '0')}
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginLeft: '2px' }}>
                {t('pcs')}
              </span>
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '3px' }}>
              Tomadas hoy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
