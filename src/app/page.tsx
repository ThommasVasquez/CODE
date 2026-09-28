'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { StatusBar } from '@/components/StatusBar';
import { DynamicIsland } from '@/components/DynamicIsland';
import { BottomDock } from '@/components/BottomDock';
import { HomeScreen } from '@/components/HomeScreen';
import { StatisticsScreen } from '@/components/StatisticsScreen';
import { ProfileScreen } from '@/components/ProfileScreen';
import { WebToolbar } from '@/components/WebToolbar';
import { CloudflareModal } from '@/components/CloudflareModal';

export default function Page() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'device' | 'showcase'>('device');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Health state
  const [adherenceRate, setAdherenceRate] = useState<number>(65);
  const [pillsRemain, setPillsRemain] = useState<number>(40);

  const screenContainerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  // GSAP transition when changing tabs in single device mode
  useGSAP(
    () => {
      if (screenContainerRef.current) {
        gsap.fromTo(
          screenContainerRef.current,
          { opacity: 0.6, y: 10, scale: 0.985 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
        );
      }
    },
    { dependencies: [activeTab, animationKey] }
  );

  // GSAP entrance for 3-screen showcase mode
  useGSAP(
    () => {
      if (viewMode === 'showcase' && showcaseRef.current) {
        gsap.from('.showcase-device', {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
        });
      }
    },
    { dependencies: [viewMode, animationKey] }
  );

  const handleDoseTaken = () => {
    setPillsRemain((prev) => Math.max(0, prev - 1));
    setAdherenceRate((prev) => Math.min(100, prev + 1));
  };

  const replayAnimations = () => {
    setAnimationKey((k) => k + 1);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at 50% 15%, #F4F6F9 0%, #DDE3E8 100%)',
        position: 'relative',
        paddingBottom: '40px',
      }}
    >
      {/* Top Presentation Toolbar */}
      <WebToolbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReplayAnimations={replayAnimations}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
      />

      {/* Main View Area */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 20px 40px 20px',
        }}
      >
        {viewMode === 'device' ? (
          /* Single Interactive iPhone Mode */
          <div className="iphone-frame" style={{ position: 'relative' }}>
            {/* Ambient Gloss Highlight on screen rim */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                zIndex: 60,
                pointerEvents: 'none',
              }}
            />

            {/* Hardware Side Buttons */}
            {/* Volume Up */}
            <div
              style={{
                position: 'absolute',
                left: '-14px',
                top: '145px',
                width: '3.5px',
                height: '48px',
                backgroundColor: '#353940',
                borderRadius: '3px 0 0 3px',
              }}
            />
            {/* Volume Down */}
            <div
              style={{
                position: 'absolute',
                left: '-14px',
                top: '205px',
                width: '3.5px',
                height: '48px',
                backgroundColor: '#353940',
                borderRadius: '3px 0 0 3px',
              }}
            />
            {/* Power Button */}
            <div
              style={{
                position: 'absolute',
                right: '-14px',
                top: '170px',
                width: '3.5px',
                height: '75px',
                backgroundColor: '#353940',
                borderRadius: '0 3px 3px 0',
              }}
            />

            {/* Inner iOS Screen */}
            <div className="iphone-screen">
              {/* Dynamic Island */}
              <DynamicIsland onDoseTaken={handleDoseTaken} />

              {/* Status Bar */}
              <StatusBar />

              {/* Screen Content Switcher with GSAP animation */}
              <div
                ref={screenContainerRef}
                key={`screen-${activeTab}-${animationKey}`}
                style={{
                  flex: 1,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {activeTab === 0 && (
                  <HomeScreen
                    onNavigateToStats={() => setActiveTab(1)}
                    adherenceRate={adherenceRate}
                    pillsRemain={pillsRemain}
                  />
                )}
                {activeTab === 1 && (
                  <StatisticsScreen
                    onBackToHome={() => setActiveTab(0)}
                  />
                )}
                {activeTab === 2 && (
                  <ProfileScreen />
                )}
              </div>

              {/* Floating Bottom Navigation Dock */}
              <BottomDock activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
        ) : (
          /* 3-Screen Mockup Showcase Mode (matching attached reference image) */
          <div
            ref={showcaseRef}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '28px',
              flexWrap: 'wrap',
              maxWidth: '1360px',
              margin: '0 auto',
            }}
          >
            {/* Screen 1: Home */}
            <div className="iphone-frame showcase-device" style={{ transform: 'scale(0.92)' }}>
              <div className="iphone-screen">
                <DynamicIsland onDoseTaken={handleDoseTaken} />
                <StatusBar />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <HomeScreen
                    onNavigateToStats={() => {}}
                    adherenceRate={adherenceRate}
                    pillsRemain={pillsRemain}
                  />
                </div>
                <BottomDock activeTab={0} setActiveTab={() => {}} />
              </div>
            </div>

            {/* Screen 2: Statistics */}
            <div className="iphone-frame showcase-device" style={{ transform: 'scale(0.92)' }}>
              <div className="iphone-screen">
                <DynamicIsland onDoseTaken={handleDoseTaken} />
                <StatusBar />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <StatisticsScreen />
                </div>
                <BottomDock activeTab={1} setActiveTab={() => {}} />
              </div>
            </div>

            {/* Screen 3: More Options */}
            <div className="iphone-frame showcase-device" style={{ transform: 'scale(0.92)' }}>
              <div className="iphone-screen">
                <DynamicIsland onDoseTaken={handleDoseTaken} />
                <StatusBar />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <ProfileScreen />
                </div>
                <BottomDock activeTab={2} setActiveTab={() => {}} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cloudflare Pages Guide Modal */}
      <CloudflareModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </main>
  );
}
