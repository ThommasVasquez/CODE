'use client';

import React from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Package, Truck, CheckCircle2, Calendar, MapPin, RefreshCw } from 'lucide-react';

export const SubscriptionsView: React.FC = () => {
  const { showToast, pillsRemain } = useApp();

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
      <IOSHeader title="Suscripciones & Recargas" subtitle="24 Días de Suministro" />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Main Supply Status Card */}
        <div
          style={{
            backgroundColor: '#DEF1F2',
            borderRadius: '26px',
            padding: '20px',
            border: '1px solid #CEE8EC',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#30777B', textTransform: 'uppercase' }}>
                Reserva de Medicamentos
              </span>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#0F2126', marginTop: '2px', lineHeight: 1 }}>
                24 <span style={{ fontSize: '16px', fontWeight: 600 }}>Días restantes</span>
              </div>
            </div>

            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(48,164,168,0.2)',
              }}
            >
              <Package size={18} color="#30A4A8" />
            </div>
          </div>

          <p style={{ fontSize: '12px', color: '#4B6B71', marginTop: '10px', lineHeight: 1.4 }}>
            Tu paquete inteligente CODE® tiene suficientes dosis activas ({pillsRemain} pastillas) para cubrir hasta el <strong>22 de Octubre</strong>.
          </p>

          <button
            onClick={() => showToast('Solicitud de recarga enviada a la farmacia')}
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
              marginTop: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(48,164,168,0.25)',
            }}
          >
            <RefreshCw size={15} />
            Solicitar Nueva Entrega Ahora
          </button>
        </div>

        {/* Delivery Timeline Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '18px 20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            border: '1px solid rgba(220, 226, 230, 0.8)',
          }}
        >
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#101820', marginBottom: '14px' }}>
            Próximo Envío Programado
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#EDF8EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={16} color="#2A8532" />
              </div>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#101820' }}>Receta validada por el médico</div>
                <div style={{ fontSize: '10.5px', color: '#7E8E9E' }}>Dra. Hannah Vance • Verificada</div>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#DEF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={15} color="#30A4A8" />
              </div>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#101820' }}>Preparación de Blíster Inteligente</div>
                <div style={{ fontSize: '10.5px', color: '#7E8E9E' }}>Empaque RFID con sensor de apertura</div>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F3F6F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={15} color="#8E9DAE" />
              </div>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#526272' }}>Entrega a Domicilio</div>
                <div style={{ fontSize: '10.5px', color: '#7E8E9E' }}>Estimada en 18 días en California</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
