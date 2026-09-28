'use client';

import React from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Package, Truck, CheckCircle2, Calendar, MapPin, RefreshCw } from 'lucide-react';

export const SubscriptionsView: React.FC = () => {
  const { showToast, pillsRemain, t, theme } = useApp();

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
      <IOSHeader title={t('subsTitle')} subtitle={`24 ${t('subscriptionsSub')}`} />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Main Supply Status Card */}
        <div
          style={{
            backgroundColor: 'var(--card-cyan)',
            borderRadius: '26px',
            padding: '20px',
            border: '1px solid var(--card-cyan-border)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                {t('subscriptions')}
              </span>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1 }}>
                24 <span style={{ fontSize: '16px', fontWeight: 600 }}>{t('subscriptionsSub')}</span>
              </div>
            </div>

            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--card-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <Package size={18} color="var(--accent-cyan)" />
            </div>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: 1.4 }}>
            Tu paquete inteligente CODE® tiene suficientes dosis activas ({pillsRemain} pastillas) para cubrir hasta el <strong>22 de Octubre</strong>.
          </p>

          <button
            onClick={() => showToast('Solicitud de recarga enviada a la farmacia')}
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
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '18px 20px',
            boxShadow: 'var(--shadow-subtle)',
            border: '1px solid rgba(220, 226, 230, 0.3)',
          }}
        >
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Próximo Envío Programado
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: theme === 'dark' ? '#1D2A1C' : '#EDF8EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={16} color="var(--accent-green)" />
              </div>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Receta validada por el médico</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Dra. Hannah Vance • Verificada</div>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: theme === 'dark' ? '#182C2D' : '#DEF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={15} color="var(--accent-cyan)" />
              </div>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Preparación de Blíster Inteligente</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Empaque RFID con sensor de apertura</div>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: theme === 'dark' ? '#1B242E' : '#F3F6F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={15} color="var(--text-muted)" />
              </div>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>Entrega a Domicilio</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Estimada en 18 días en California</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
