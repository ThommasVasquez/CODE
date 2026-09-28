'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { Pill, CheckCircle2, Clock, Activity } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const DynamicIsland: React.FC = () => {
  const { takeDose } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (islandRef.current) {
      if (nextState) {
        gsap.to(islandRef.current, {
          width: 320,
          height: 80,
          borderRadius: 40,
          duration: 0.45,
          ease: 'elastic.out(1, 0.75)',
        });
      } else {
        gsap.to(islandRef.current, {
          width: 124,
          height: 34,
          borderRadius: 20,
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
        width: '124px',
        height: '34px',
        backgroundColor: '#000000',
        borderRadius: '20px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isExpanded ? '12px 18px' : '0 10px',
        cursor: 'pointer',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden',
        userSelect: 'none',
        transition: 'box-shadow 0.2s ease',
      }}
      title="Toca para interactuar con la Dynamic Island"
    >
      {!isExpanded ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#1C1C1E',
              border: '1.5px solid #2C2C2E'
            }} />
            <Activity size={13} color="#73A932" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: '#FFFFFF', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2px' }}>
              1:30h
            </span>
            <div style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#FF6A43'
            }} />
          </div>
        </>
      ) : (
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(115, 169, 50, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Pill size={19} color="#73A932" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                Próxima Toma
              </div>
              <div style={{ fontSize: '11px', color: '#9E9EA7', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={11} /> Cardiovit • en 1h 30m
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              takeDose('Cardiovit 50mg');
              toggleExpand();
            }}
            style={{
              background: '#73A932',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '6px 12px',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <CheckCircle2 size={13} />
            Tomar
          </button>
        </div>
      )}
    </div>
  );
};
