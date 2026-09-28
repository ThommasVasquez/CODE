'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CheckCircle2, Bell } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const IOSToast: React.FC = () => {
  const { toastMessage } = useApp();
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    if (toastMessage) {
      gsap.fromTo(
        bannerRef.current,
        { y: -60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.5)' }
      );
    }
  }, [toastMessage]);

  if (!toastMessage) return null;

  return (
    <div
      ref={bannerRef}
      style={{
        position: 'absolute',
        top: '52px',
        left: '20px',
        right: '20px',
        backgroundColor: 'rgba(18, 24, 32, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '20px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#FFFFFF',
        zIndex: 80,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          backgroundColor: '#73A932',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <CheckCircle2 size={15} color="#FFFFFF" />
      </div>

      <div style={{ flex: 1, fontSize: '12px', fontWeight: 600 }}>
        {toastMessage}
      </div>
    </div>
  );
};
