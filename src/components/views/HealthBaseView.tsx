'use client';

import React from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Heart, Activity, Droplets, Moon, Footprints, Flame } from 'lucide-react';

export const HealthBaseView: React.FC = () => {
  const { showToast } = useApp();

  const vitals = [
    {
      title: 'Frecuencia Cardíaca',
      value: '72',
      unit: 'bpm',
      status: 'En reposo normal',
      icon: Heart,
      color: '#FFF0EA',
      accent: '#FF6A43',
    },
    {
      title: 'Presión Arterial',
      value: '120/80',
      unit: 'mmHg',
      status: 'Óptima',
      icon: Activity,
      color: '#EAF4DC',
      accent: '#73A932',
    },
    {
      title: 'Oxígeno en Sangre (SpO2)',
      value: '98',
      unit: '%',
      status: 'Excelente',
      icon: Droplets,
      color: '#DEF1F2',
      accent: '#30A4A8',
    },
    {
      title: 'Calidad de Sueño',
      value: '7h 45m',
      unit: '',
      status: 'Profundo y reparador',
      icon: Moon,
      color: '#ECEEF8',
      accent: '#5E6AD2',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#F4F6F8',
        overflowY: 'auto',
        paddingBottom: '90px',
      }}
    >
      <IOSHeader title="Health Base" subtitle="05 Métricas de Actividad" />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Daily Summary Banner */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '18px 20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            border: '1px solid rgba(220, 226, 230, 0.8)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#687888', fontWeight: 600 }}>
                Índice de Vitalidad General
              </span>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#101820', marginTop: '2px' }}>
                94<span style={{ fontSize: '16px', color: '#73A932' }}>/100</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#EDF8EE',
                color: '#2A8532',
                borderRadius: '14px',
                padding: '6px 12px',
                fontSize: '11.5px',
                fontWeight: 700,
              }}
            >
              Estado Óptimo
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #F1F4F7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#4B5B6D', fontWeight: 600 }}>
              <Footprints size={15} color="#30A4A8" /> 4,820 pasos
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#4B5B6D', fontWeight: 600 }}>
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
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '16px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(220, 226, 230, 0.8)',
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
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#101820', lineHeight: 1 }}>
                    {v.value}
                    {v.unit && (
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#7E8E9E', marginLeft: '3px' }}>
                        {v.unit}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#566676', marginTop: '3px' }}>
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
