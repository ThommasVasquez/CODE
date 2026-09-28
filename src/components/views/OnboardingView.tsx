'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface OnboardingViewProps {
  onStart: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onStart }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#05070A',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 20px 24px 20px',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Top Header Text Section (Matching Screen 1) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
          marginTop: '6px',
        }}
      >
        {/* Top Pill Outline: "TAKE THE FIRST STEP" */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 20px',
            borderRadius: '999px',
            border: '1.5px solid rgba(255, 255, 255, 0.75)',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            marginBottom: '14px',
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
          }}
        >
          TAKE THE FIRST STEP
        </div>

        {/* Big 3D Bold Gradient Title: "AI FITNESS" with Barbell Motif */}
        <div style={{ position: 'relative', margin: '4px 0 2px 0' }}>
          <h1
            style={{
              fontSize: '44px',
              fontWeight: 900,
              letterSpacing: '-0.5px',
              lineHeight: 1.0,
              background: 'linear-gradient(180deg, #F3E8FF 0%, #D8B4FE 45%, #A855F7 85%, #7E22CE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 8px 30px rgba(168, 85, 247, 0.45)',
              filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.8))',
              margin: 0,
            }}
          >
            AI FITNESS
          </h1>

          {/* 3D Barbell graphic overlay resting horizontally across "I" and "T" */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '88px',
              height: '24px',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="86" height="26" viewBox="0 0 86 26" fill="none">
              {/* Left Plates */}
              <rect x="2" y="3" width="5" height="20" rx="2" fill="#262626" stroke="#525252" strokeWidth="1" />
              <rect x="7" y="5" width="4" height="16" rx="1.5" fill="#404040" stroke="#737373" strokeWidth="0.8" />
              {/* Bar */}
              <rect x="11" y="11" width="64" height="4" rx="2" fill="url(#barGradient)" />
              {/* Right Plates */}
              <rect x="75" y="5" width="4" height="16" rx="1.5" fill="#404040" stroke="#737373" strokeWidth="0.8" />
              <rect x="79" y="3" width="5" height="20" rx="2" fill="#262626" stroke="#525252" strokeWidth="1" />
              <defs>
                <linearGradient id="barGradient" x1="11" y1="11" x2="75" y2="15" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#94A3B8" />
                  <stop offset="0.5" stopColor="#E2E8F0" />
                  <stop offset="1" stopColor="#64748B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Subtitle: "TRAIN WITH AI" */}
        <div
          style={{
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '2.5px',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            marginTop: '8px',
            marginBottom: '14px',
            textShadow: '0 2px 6px rgba(0,0,0,0.6)',
          }}
        >
          TRAIN WITH AI
        </div>

        {/* Purple Pill Button: "FREE TRIAL NOW" */}
        <button
          onClick={onStart}
          style={{
            backgroundColor: '#B794F6',
            color: '#0A0A0A',
            border: 'none',
            borderRadius: '999px',
            padding: '11px 28px',
            fontSize: '15px',
            fontWeight: 900,
            letterSpacing: '0.3px',
            boxShadow: '0 10px 25px rgba(183, 148, 246, 0.45), 0 0 0 1px rgba(255,255,255,0.3) inset',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
        >
          FREE TRIAL NOW
        </button>
      </div>

      {/* Main Athlete Photography (Female in pushup on black floor with pink lines) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/onboarding_athlete.jpg"
          alt="Athlete pushup"
          fill
          sizes="400px"
          unoptimized
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center 60%',
          }}
        />

        {/* Dark Vignette & Gradient Overlays */}
        {/* Top Fade to allow text contrast */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(180deg, rgba(5, 7, 10, 0.95) 0%, rgba(5, 7, 10, 0.8) 45%, rgba(5, 7, 10, 0.1) 85%, transparent 100%)',
          }}
        />

        {/* Bottom Fade */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '35%',
            background: 'linear-gradient(0deg, rgba(5, 7, 10, 0.95) 0%, rgba(5, 7, 10, 0.6) 45%, transparent 100%)',
          }}
        />
      </div>

      {/* Bottom CTA Capsule: "Get Started  →" */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
        }}
      >
        <button
          onClick={onStart}
          style={{
            width: '100%',
            maxWidth: '320px',
            height: '52px',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255, 255, 255, 0.28)',
            color: '#FFFFFF',
            fontSize: '15px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            transition: 'background-color 0.2s ease, transform 0.15s ease',
          }}
        >
          <span>Get Started</span>
          <ArrowRight size={17} strokeWidth={2.5} />
        </button>

        {/* iOS Home Indicator Bar */}
        <div
          style={{
            width: '136px',
            height: '4.5px',
            backgroundColor: '#FFFFFF',
            opacity: 0.6,
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  );
};
