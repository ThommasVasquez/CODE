'use client';

import React from 'react';
import { X, Cloud, CheckCircle2, Terminal } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface CloudflareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudflareModal: React.FC<CloudflareModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useApp();
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 15, 22, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          backgroundColor: 'var(--card-white)',
          borderRadius: '28px',
          padding: '28px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(220, 228, 235, 0.2)',
          position: 'relative',
          color: 'var(--text-primary)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: theme === 'dark' ? '#212A35' : '#F1F4F7',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={16} color="var(--text-secondary)" />
        </button>

        {/* Modal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#FFF2EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Cloud size={22} color="#F38020" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Despliegue de CODE® en Cloudflare Pages
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              A través de GitHub en 3 pasos automáticos
            </p>
          </div>
        </div>

        {/* Step List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '22px' }}>
          {/* Step 1 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: 'var(--device-bezel)',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              1
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Subir este código a tu repositorio GitHub
              </div>
              <div
                style={{
                  backgroundColor: theme === 'dark' ? '#141A22' : '#F4F7F9',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: theme === 'dark' ? '#A2B5CC' : '#2B3847',
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: theme === 'dark' ? '1px solid #2B3542' : 'none',
                }}
              >
                <Terminal size={14} color="var(--accent-cyan)" />
                git init && git add . && git commit -m &quot;feat: CODE® iOS UI&quot;
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#111822',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              2
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111822' }}>
                Conectar Cloudflare Pages con GitHub
              </div>
              <p style={{ fontSize: '12.5px', color: '#566677', marginTop: '3px' }}>
                En el panel de Cloudflare, ve a <strong>Workers & Pages</strong> &gt; <strong>Create application</strong> &gt; <strong>Pages</strong> &gt; <strong>Connect to Git</strong>.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#111822',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              3
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111822' }}>
                Configuración del Build en Cloudflare
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginTop: '6px',
                }}
              >
                <div style={{ backgroundColor: '#F4F7F9', padding: '8px 10px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#7E8E9E' }}>Framework preset</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#111822' }}>Next.js (Static HTML Export)</div>
                </div>
                <div style={{ backgroundColor: '#F4F7F9', padding: '8px 10px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#7E8E9E' }}>Build command</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#111822' }}>npm run build</div>
                </div>
                <div style={{ backgroundColor: '#F4F7F9', padding: '8px 10px', borderRadius: '10px', gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '11px', color: '#7E8E9E' }}>Build output directory</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#111822' }}>out</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ready Badge */}
        <div
          style={{
            backgroundColor: '#EDF8EE',
            borderRadius: '14px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          <CheckCircle2 size={18} color="#2A8532" />
          <span style={{ fontSize: '12px', color: '#1B5620', fontWeight: 600 }}>
            El proyecto ya está preconfigurado con <code>output: &apos;export&apos;</code> en next.config.mjs para Cloudflare Pages.
          </span>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            backgroundColor: '#111822',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '16px',
            padding: '12px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: '18px',
          }}
        >
          Entendido, volver al preview
        </button>
      </div>
    </div>
  );
};
