'use client';

import React from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Pill, Clock, CheckCircle2, AlertCircle, Plus, Calendar } from 'lucide-react';

export const MedicationDetailView: React.FC = () => {
  const { takeDose, pillsRemain, totalPills, adherenceRate, t, theme } = useApp();

  const medications = [
    {
      id: 'm1',
      name: 'Cardiovit 50mg',
      dosage: '1 cápsula con desayuno',
      schedule: '08:30 AM',
      status: 'Tomada hoy',
      color: theme === 'dark' ? '#182C2D' : '#DEF1F2',
      accent: '#30A4A8',
      taken: true,
    },
    {
      id: 'm2',
      name: 'NeuroProtect Plus',
      dosage: '1 comprimido',
      schedule: '08:46 PM (Próxima en 12h 16m)',
      status: 'Programada',
      color: theme === 'dark' ? '#321D18' : '#FFF0EA',
      accent: '#FF6A43',
      taken: false,
    },
    {
      id: 'm3',
      name: 'Omega 3 Pure Vital',
      dosage: '2 perlas con cena',
      schedule: '09:30 PM',
      status: 'Programada',
      color: theme === 'dark' ? '#1D2A1C' : '#EAF4DC',
      accent: '#73A932',
      taken: false,
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
      <IOSHeader title={t('medControl')} subtitle={t('activePrescriptions')} />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Next Dose Banner */}
        <div
          style={{
            backgroundColor: 'var(--card-cyan)',
            borderRadius: '24px',
            padding: '18px 20px',
            border: '1px solid var(--card-cyan-border)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--card-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={18} color="var(--accent-cyan)" />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                {t('nextDose')}
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('hoursAndMins')}
              </h3>
            </div>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: 1.4 }}>
            &quot;Shohan&quot; {t('medicationMsg')} {t('hoursAndMins')}.
          </p>

          <button
            onClick={() => takeDose('NeuroProtect Plus')}
            style={{
              width: '100%',
              backgroundColor: 'var(--accent-cyan)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '12px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(48, 164, 168, 0.28)',
            }}
          >
            <CheckCircle2 size={16} />
            {t('takeDoseAction')}
          </button>
        </div>

        {/* Stats Pill Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ backgroundColor: 'var(--card-white)', padding: '14px', borderRadius: '20px', border: '1px solid rgba(220,226,230,0.3)', boxShadow: 'var(--shadow-subtle)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{t('pillsRemain')}</span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {pillsRemain} <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ {totalPills}</span>
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--card-white)', padding: '14px', borderRadius: '20px', border: '1px solid rgba(220,226,230,0.3)', boxShadow: 'var(--shadow-subtle)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{t('avgAdherence')}</span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-green)', marginTop: '2px' }}>
              {adherenceRate}%
            </div>
          </div>
        </div>

        {/* Prescription List */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {t('activePrescriptions')}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {medications.map((med) => (
              <div
                key={med.id}
                style={{
                  backgroundColor: 'var(--card-white)',
                  borderRadius: '20px',
                  padding: '14px 16px',
                  boxShadow: 'var(--shadow-subtle)',
                  border: '1px solid rgba(220,226,230,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '14px',
                      backgroundColor: med.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Pill size={18} color={med.accent} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {med.name}
                    </h5>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>
                      {med.dosage}
                    </p>
                    <span style={{ fontSize: '10px', color: med.accent, fontWeight: 700 }}>
                      🕒 {med.schedule}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    backgroundColor: med.taken ? (theme === 'dark' ? '#1D2A1C' : '#EDF8EE') : (theme === 'dark' ? '#1E2630' : '#F4F6F8'),
                    color: med.taken ? 'var(--accent-green)' : 'var(--text-muted)',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}
                >
                  {med.taken ? 'Completada' : 'Pendiente'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
