'use client';

import React, { useState, useEffect } from 'react';
import { X, Scan, CheckCircle2, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const ScanModal: React.FC = () => {
  const { popView, showToast, takeDose } = useApp();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    // Simulate finding a barcode after 2 seconds
    const timer = setTimeout(() => {
      setScanned(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirmScan = () => {
    takeDose('Cardiovit 50mg (Escaneado)');
    showToast('Código verificado con éxito: Blíster #4564856');
    popView();
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        color: '#FFFFFF',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', marginTop: '10px' }}>
        <button
          onClick={popView}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={18} color="#FFFFFF" />
        </button>

        <span style={{ fontSize: '14px', fontWeight: 700 }}>Escanear Medicamento</span>

        <button
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Zap size={16} color="#FFFFFF" />
        </button>
      </div>

      {/* Viewfinder Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '240px',
            height: '240px',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            borderRadius: '28px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Scanning Laser Line */}
          {!scanned ? (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: '#73A932',
                boxShadow: '0 0 14px #73A932',
                animation: 'scanLine 1.8s infinite ease-in-out',
              }}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <CheckCircle2 size={44} color="#73A932" />
              <div style={{ fontSize: '15px', fontWeight: 800, marginTop: '8px' }}>
                Blíster Identificado
              </div>
              <div style={{ fontSize: '12px', color: '#B2E285', marginTop: '2px' }}>
                Cardiovit 50mg • Lote 2026-X
              </div>
            </div>
          )}

          <style>{`
            @keyframes scanLine {
              0% { top: 10%; opacity: 0.2; }
              50% { top: 90%; opacity: 1; }
              100% { top: 10%; opacity: 0.2; }
            }
          `}</style>
        </div>

        <p style={{ fontSize: '12.5px', color: '#A0B0C0', marginTop: '22px', textAlign: 'center' }}>
          {scanned
            ? 'Prescripción verificada correctamente.'
            : 'Alinea el código QR o código de barras de la caja de medicamento.'}
        </p>

        {scanned && (
          <button
            onClick={handleConfirmScan}
            style={{
              backgroundColor: '#73A932',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '12px 24px',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '16px',
              boxShadow: '0 4px 16px rgba(115, 169, 50, 0.4)',
            }}
          >
            Confirmar y Registrar Toma
          </button>
        )}
      </div>
    </div>
  );
};
