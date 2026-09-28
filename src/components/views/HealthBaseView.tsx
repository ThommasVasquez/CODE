'use client';

import React from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Heart, Activity, Droplets, Moon, Footprints, Flame } from 'lucide-react';

export const HealthBaseView: React.FC = () => {
  const { showToast, t, theme } = useApp();

  const vitals = [
    {
      title: 'Frecuencia Cardíaca',
      value: '72',
      unit: 'bpm',
      status: 'En reposo normal',
      icon: Heart,
      color: theme === 'dark' ? '#321D18' : '#FFF0EA',
      accent: '#FF6A43',
    },
    {
      title: 'Presión Arterial',
      value: '120/80',
      unit: 'mmHg',
      status: 'Óptima',
      icon: Activity,
      color: theme === 'dark' ? '#1D2A1C' : '#EAF4DC',
      accent: '#73A932',
    },
    {
      title: 'Oxígeno en Sangre (SpO2)',
      value: '98',
      unit: '%',
      status: 'Excelente',
      icon: Droplets,
      color: theme === 'dark' ? '#182C2D' : '#DEF1F2',
      accent: '#30A4A8',
    },
    {
      title: 'Calidad de Sueño',
      value: '7h 45m',
      unit: '',
      status: 'Profundo y reparador',
      icon: Moon,
      color: theme === 'dark' ? '#1F2238' : '#ECEEF8',
      accent: '#5E6AD2',
    },
  ];

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
      <IOSHeader title={t('healthBaseTitle')} subtitle={`05 ${t('healthBaseHeaderSub')}`} />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Daily Summary Banner */}
        <div
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '18px 20px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(220, 226, 230, 0.3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                Índice de Vitalidad General
              </span>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                94<span style={{ fontSize: '16px', color: 'var(--accent-green)' }}>/100</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: theme === 'dark' ? '#1D2A1C' : '#EDF8EE',
                color: theme === 'dark' ? '#9FE856' : '#2A8532',
                borderRadius: '14px',
                padding: '6px 12px',
                fontSize: '11.5px',
                fontWeight: 700,
              }}
            >
              Estado Óptimo
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(140, 150, 160, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <Footprints size={15} color="var(--accent-cyan)" /> 4,820 pasos
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <Flame size={15} color="#FF6A43" /> 380 kcal
            </div>
          </div>
        </div>

        {/* 2x2 Grid of Vital Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {vitals.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                onClick={() => showToast(`${v.title}: ${v.value} ${v.unit}`)}
                style={{
                  backgroundColor: 'var(--card-white)',
                  borderRadius: '24px',
                  padding: '16px',
                  boxShadow: 'var(--shadow-subtle)',
                  border: '1px solid rgba(220, 226, 230, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '130px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      backgroundColor: v.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={16} color={v.accent} />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                    {v.value}
                    {v.unit && (
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '3px' }}>
                        {v.unit}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '3px' }}>
                    {v.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
