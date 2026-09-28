'use client';

import React from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Bell, RefreshCw, Smartphone, Cloud, Download, Trash2, Shield, Bluetooth } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { settings, toggleSetting, showToast } = useApp();

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
      <IOSHeader title="Ajustes" subtitle="12 Acciones Disponibles" />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Device Status Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '16px 18px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            border: '1px solid rgba(220, 226, 230, 0.8)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: '#EDF8EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bluetooth size={18} color="#2A8532" />
              </div>
              <div>
                <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#101820' }}>
                  Dispensador CODE®
                </h4>
                <span style={{ fontSize: '11px', color: '#2A8532', fontWeight: 700 }}>
                  ● Enlazado • ID 4564856
                </span>
              </div>
            </div>

            <span style={{ fontSize: '11px', fontWeight: 700, color: '#566676', backgroundColor: '#F3F6F8', padding: '4px 8px', borderRadius: '10px' }}>
              🔋 88%
            </span>
          </div>
        </div>

        {/* Toggles Group */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '6px 18px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            border: '1px solid rgba(220, 226, 230, 0.8)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Toggle 1: Notifications */}
          <div
            onClick={() => toggleSetting('notifications')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: '1px solid #EEF2F5',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bell size={17} color="#354556" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#101820' }}>
                  Recordatorios de Dosis
                </div>
                <div style={{ fontSize: '11px', color: '#7E8E9E' }}>
                  Alertas push de horarios
                </div>
              </div>
            </div>

            {/* iOS Switch */}
            <div
              style={{
                width: '44px',
                height: '24px',
                backgroundColor: settings.notifications ? '#73A932' : '#D1D7DC',
                borderRadius: '12px',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: settings.notifications ? 'flex-end' : 'flex-start',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ width: '20px', height: '20px', backgroundColor: '#FFFFFF', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>

          {/* Toggle 2: Auto Refill */}
          <div
            onClick={() => toggleSetting('autoRefill')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: '1px solid #EEF2F5',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <RefreshCw size={17} color="#354556" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#101820' }}>
                  Auto-Recarga Farmacia
                </div>
                <div style={{ fontSize: '11px', color: '#7E8E9E' }}>
                  Pedir blíster al quedar 10 dosis
                </div>
              </div>
            </div>

            <div
              style={{
                width: '44px',
                height: '24px',
                backgroundColor: settings.autoRefill ? '#73A932' : '#D1D7DC',
                borderRadius: '12px',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: settings.autoRefill ? 'flex-end' : 'flex-start',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ width: '20px', height: '20px', backgroundColor: '#FFFFFF', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>

          {/* Toggle 3: Cloud Sync */}
          <div
            onClick={() => toggleSetting('cloudSync')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 0',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cloud size={17} color="#354556" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#101820' }}>
                  Sincronización Cloudflare
                </div>
                <div style={{ fontSize: '11px', color: '#7E8E9E' }}>
                  Respaldo cifrado en el Edge
                </div>
              </div>
            </div>

            <div
              style={{
                width: '44px',
                height: '24px',
                backgroundColor: settings.cloudSync ? '#73A932' : '#D1D7DC',
                borderRadius: '12px',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: settings.cloudSync ? 'flex-end' : 'flex-start',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ width: '20px', height: '20px', backgroundColor: '#FFFFFF', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>

        {/* Action Button: Export */}
        <button
          onClick={() => showToast('Reporte clínico exportado en PDF')}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(220, 226, 230, 0.8)',
            borderRadius: '20px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Download size={17} color="#101820" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#101820' }}>
              Exportar Informe para Médico
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#73A932', fontWeight: 700 }}>
            PDF / FHIR
          </span>
        </button>
      </div>
    </div>
  );
};
