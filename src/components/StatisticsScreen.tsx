'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const StatisticsScreen: React.FC = () => {
  const {
    bottles,
    toggleBottle,
    consumedToday,
    adherenceRate,
    pushView,
    t,
    theme,
  } = useApp();

  const [filterPeriod, setFilterPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  const containerRef = useRef<HTMLDivElement>(null);
  const chartPathRef = useRef<SVGPathElement>(null);
  const stripedBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.stat-title', {
        y: -12,
        opacity: 0,
        duration: 0.45,
      })
      .from('.stat-card', {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.55,
      }, '-=0.2')
      .from(stripedBarRef.current, {
        width: '0%',
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.3');

      // Animate SVG wave path
      if (chartPathRef.current) {
        const length = chartPathRef.current.getTotalLength();
        gsap.set(chartPathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        tl.to(chartPathRef.current, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, '-=0.5');
      }
    },
    { scope: containerRef, dependencies: [filterPeriod] }
  );

  const getFilterLabel = (p: 'Daily' | 'Weekly' | 'Monthly') => {
    if (p === 'Daily') return t('daily');
    if (p === 'Weekly') return t('weekly');
    return t('monthly');
  };

  const getConsumedSubtitle = () => {
    if (filterPeriod === 'Daily') return t('medicinesConsumedToday');
    if (filterPeriod === 'Weekly') return t('medicinesConsumedWeek');
    return t('medicinesConsumedMonth');
  };

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
      {/* Top Title */}
      <div style={{ marginTop: '4px' }}>
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
      </div>

      {/* Medication Status Card (Soft Cyan/Dark Elevated) */}
      <div
        className="stat-card"
        style={{
          backgroundColor: 'var(--card-cyan)',
          borderRadius: '28px',
          padding: '20px 18px',
          border: '1px solid var(--card-cyan-border)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('medicationStatus')}
            </h3>
            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '3px', maxWidth: '190px', lineHeight: 1.35 }}>
              {t('medicationStatusDesc')}
            </p>
          </div>

          {/* Daily filter pill toggle */}
          <button
            onClick={() => {
              const next = filterPeriod === 'Daily' ? 'Weekly' : filterPeriod === 'Weekly' ? 'Monthly' : 'Daily';
              setFilterPeriod(next);
            }}
            style={{
              backgroundColor: 'var(--card-white)',
              border: 'none',
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

        {/* Bottles Matrix + Count Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
          {/* 3x4 Grid of Pill Bottles */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 22px)',
              gap: '8px 10px',
            }}
          >
            {bottles.map((isConsumed, idx) => (
              <div
                key={idx}
                id={`bottle-${idx}`}
                onClick={() => toggleBottle(idx)}
                style={{
                  width: '22px',
                  height: '28px',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transformOrigin: 'center',
                }}
                title={isConsumed ? `Pastilla #${idx + 1}` : `Pastilla #${idx + 1}`}
              >
                {/* Bottle Cap */}
                <div
                  style={{
                    width: '12px',
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor: isConsumed ? 'var(--accent-cyan)' : (theme === 'dark' ? '#334155' : '#B8CFD5'),
                  }}
                />
                {/* Bottle Body */}
                <div
                  style={{
                    width: '20px',
                    height: '24px',
                    borderRadius: '4px 4px 6px 6px',
                    backgroundColor: isConsumed ? 'var(--accent-cyan)' : (theme === 'dark' ? '#1E293B' : '#C7DEE4'),
                    marginTop: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isConsumed ? '0 2px 8px rgba(48, 164, 168, 0.4)' : 'none',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {isConsumed && (
                    <div style={{ width: '8px', height: '10px', backgroundColor: '#FFFFFF', borderRadius: '2px', opacity: 0.7 }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Counter */}
          <div style={{ textAlign: 'right', paddingLeft: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {String(consumedToday).padStart(2, '0')}
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)', marginLeft: '2px' }}>
                {t('pcs')}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px', maxWidth: '105px' }}>
              {getConsumedSubtitle()}
            </div>
          </div>
        </div>
      </div>

      {/* Avg Medication Intake Rate Card */}
      <div
        className="stat-card"
        style={{
          backgroundColor: 'var(--card-white)',
          borderRadius: '28px',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid rgba(230, 235, 240, 0.3)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {adherenceRate}<span style={{ fontSize: '18px', fontWeight: 600 }}>%</span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>
            {t('avgMedRate')}
          </div>
        </div>

        {/* 0 to 100 markers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '10px', marginBottom: '4px' }}>
          <span>0</span>
          <span>100</span>
        </div>

        {/* Diagonal striped green progress bar */}
        <div
          style={{
            width: '100%',
            height: '24px',
            backgroundColor: theme === 'dark' ? '#1F2937' : '#EDF2E8',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={stripedBarRef}
            className="striped-green-bar"
            style={{
              width: `${adherenceRate}%`,
              height: '100%',
              borderRadius: '12px',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      {/* Avg Adherence Card with Smooth Spline Wave Chart */}
      <div
        className="stat-card"
        onClick={() => pushView('health-base')}
        style={{
          backgroundColor: 'var(--card-white)',
          borderRadius: '28px',
          padding: '18px 20px 14px 20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid rgba(230, 235, 240, 0.3)',
          cursor: 'pointer',
        }}
        title="Ver desglose completo de vitales"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('avgAdherence')}
              </h4>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 500 }}>
              {t('last30Days')}
            </p>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {adherenceRate}%
          </div>
        </div>

        {/* Smooth Curved SVG Spline */}
        <div style={{ position: 'relative', width: '100%', height: '85px', marginTop: '12px' }}>
          <svg
            viewBox="0 0 320 85"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF8F6B" />
                <stop offset="50%" stopColor="#FF5722" />
                <stop offset="100%" stopColor="#FFA048" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF6A43" stopOpacity={theme === 'dark' ? 0.3 : 0.15} />
                <stop offset="100%" stopColor="#FF6A43" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Subtle Guide Line */}
            <line x1="0" y1="50" x2="320" y2="50" stroke={theme === 'dark' ? '#27313F' : '#F0F3F6'} strokeWidth="1" strokeDasharray="4 4" />

            {/* Filled Area */}
            <path
              d="M 5,60 Q 40,78 75,55 T 150,70 T 225,35 T 285,62 T 315,50 L 315,85 L 5,85 Z"
              fill="url(#areaGradient)"
            />

            {/* Animated Spline Stroke */}
            <path
              ref={chartPathRef}
              d="M 5,60 Q 40,78 75,55 T 150,70 T 225,35 T 285,62 T 315,50"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* High Peak Node */}
            <circle cx="225" cy="35" r="5.5" fill="var(--card-white)" stroke="#FF5722" strokeWidth="3" />
            <circle cx="225" cy="35" r="9" fill="none" stroke="#FF5722" strokeWidth="1" opacity="0.4" />

            {/* Secondary Node */}
            <circle cx="75" cy="55" r="4.5" fill="var(--card-white)" stroke="#FF8F6B" strokeWidth="2.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};
