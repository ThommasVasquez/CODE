'use client';

import React from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Pill, Clock, CheckCircle2, AlertCircle, Plus, Calendar } from 'lucide-react';

export const MedicationDetailView: React.FC = () => {
  const { takeDose, pillsRemain, totalPills, adherenceRate } = useApp();

  const medications = [
    {
      id: 'm1',
      name: 'Cardiovit 50mg',
      dosage: '1 cápsula con desayuno',
      schedule: '08:30 AM',
      status: 'Tomada hoy',
      color: '#DEF1F2',
      accent: '#30A4A8',
      taken: true,
    },
    {
      id: 'm2',
      name: 'NeuroProtect Plus',
      dosage: '1 comprimido',
      schedule: '08:46 PM (Próxima en 12h 16m)',
      status: 'Programada',
      color: '#FFF0EA',
      accent: '#FF6A43',
      taken: false,
    },
    {
      id: 'm3',
      name: 'Omega 3 Pure Vital',
      dosage: '2 perlas con cena',
      schedule: '09:30 PM',
      status: 'Programada',
      color: '#EAF4DC',
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
        backgroundColor: '#F4F6F8',
        overflowY: 'auto',
        paddingBottom: '90px',
      }}
    >
      <IOSHeader title="Control de Medicación" subtitle="Prescripciones Activas" />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Next Dose Banner */}
        <div
          style={{
            backgroundColor: '#DEF1F2',
            borderRadius: '24px',
            padding: '18px 20px',
            border: '1px solid #CEE8EC',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={18} color="#30A4A8" />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#32777A', textTransform: 'uppercase' }}>
                Próxima Toma
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F2126' }}>
                En 12 horas y 16 minutos
              </h3>
            </div>
          </div>

          <p style={{ fontSize: '12px', color: '#4B6B71', marginTop: '10px', lineHeight: 1.4 }}>
            &quot;Shohan&quot; ya completó su dosis de la mañana y está al día con la pauta de tratamiento.
          </p>

          <button
            onClick={() => takeDose('NeuroProtect Plus')}
            style={{
              width: '100%',
              backgroundColor: '#30A4A8',
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
            Registrar Toma Anticipada
          </button>
        </div>

        {/* Stats Pill Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '20px', border: '1px solid rgba(220,226,230,0.8)' }}>
            <span style={{ fontSize: '11px', color: '#687889', fontWeight: 600 }}>Pastillas en Blíster</span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0E141B', marginTop: '2px' }}>
              {pillsRemain} <span style={{ fontSize: '12px', color: '#8E9BAE' }}>/ {totalPills}</span>
            </div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '20px', border: '1px solid rgba(220,226,230,0.8)' }}>
            <span style={{ fontSize: '11px', color: '#687889', fontWeight: 600 }}>Tasa de Adherencia</span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#73A932', marginTop: '2px' }}>
              {adherenceRate}%
            </div>
          </div>
        </div>

        {/* Prescription List */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0E141B', marginBottom: '8px' }}>
            Medicamentos Asignados
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {medications.map((med) => (
              <div
                key={med.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '14px 16px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(220,226,230,0.8)',
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
                    <h5 style={{ fontSize: '13.5px', fontWeight: 800, color: '#121A22' }}>
                      {med.name}
                    </h5>
                    <p style={{ fontSize: '11px', color: '#687787', marginTop: '1px' }}>
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
                    backgroundColor: med.taken ? '#EDF8EE' : '#F4F6F8',
                    color: med.taken ? '#2A8532' : '#687889',
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
