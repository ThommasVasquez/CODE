'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { Dumbbell, Timer, Zap, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const DynamicIsland: React.FC = () => {
  const { fastingState, pushView } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (islandRef.current) {
      if (nextState) {
        gsap.to(islandRef.current, {
          width: 326,
          height: 82,
          borderRadius: 42,
          duration: 0.45,
          ease: 'elastic.out(1, 0.78)',
        });
      } else {
        gsap.to(islandRef.current, {
          width: 126,
          height: 35,
          borderRadius: 22,
          duration: 0.35,
          ease: 'power3.out',
        });
      }
    }
  };

  return (
    <div
      ref={islandRef}
      onClick={toggleExpand}
      style={{
        position: 'absolute',
        top: '11px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '126px',
        height: '35px',
        backgroundColor: '#000000',
        borderRadius: '22px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isExpanded ? '12px 18px' : '0 11px',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255, 255, 255, 0.08) inset',
        overflow: 'hidden',
        userSelect: 'none',
        transition: 'box-shadow 0.2s ease',
      }}
      title="Dynamic Island CODE®"
    >
      {!isExpanded ? (
        <>
          {/* Authentic Apple Camera Lens with optical reflection */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#090B0E',
                border: '1.5px solid #23272F',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '3.5px',
                  height: '3.5px',
                  borderRadius: '50%',
                  backgroundColor: '#1E3A5F',
                  opacity: 0.9,
                }}
              />
            </div>

            {/* Glowing Live Activity Dot */}
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: fastingState.isFasting ? 'var(--accent-cyan)' : 'var(--accent-green)',
                boxShadow: fastingState.isFasting ? '0 0 8px #06B6D4' : '0 0 8px #22C55E',
              }}
            />
          </div>

          {/* Right indicator: Live Fasting or Workout Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {fastingState.elapsedHours}h
            </span>
            <Timer size={12} color="var(--accent-cyan)" />
          </div>
        </>
      ) : (
        /* Expanded Dynamic Island HUD */
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(6, 182, 212, 0.18)',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Timer size={20} color="var(--accent-cyan)" />
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.2px' }}>
                Ayuno Activo • {fastingState.plan}
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '1px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Zap size={11} color="var(--accent-green)" />
                {fastingState.elapsedHours}h transcurridas • En Cetosis
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
              pushView('fasting-detail');
            }}
            style={{
              background: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '20px',
              padding: '7px 13px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 12px rgba(6, 182, 212, 0.35)',
            }}
          >
            Ver <ChevronRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
};
