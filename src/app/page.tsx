'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AppProvider, useApp } from '@/context/AppContext';
import { StatusBar } from '@/components/StatusBar';
import { DynamicIsland } from '@/components/DynamicIsland';
import { BottomDock } from '@/components/BottomDock';
import { IOSToast } from '@/components/IOSToast';
import { HomeScreen } from '@/components/HomeScreen';
import { StatisticsScreen } from '@/components/StatisticsScreen';
import { ProfileScreen } from '@/components/ProfileScreen';
import { WebToolbar } from '@/components/WebToolbar';
import { CloudflareModal } from '@/components/CloudflareModal';

// Subviews
import { MedicationDetailView } from '@/components/views/MedicationDetailView';
import { WellnessView } from '@/components/views/WellnessView';
import { DiaryView } from '@/components/views/DiaryView';
import { SettingsView } from '@/components/views/SettingsView';
import { SubscriptionsView } from '@/components/views/SubscriptionsView';
import { HealthBaseView } from '@/components/views/HealthBaseView';
import { ScanModal } from '@/components/views/ScanModal';
import { EditProfileModal } from '@/components/views/EditProfileModal';

function AppContent() {
  const { activeTab, activeSubView, theme } = useApp();
  const [viewMode, setViewMode] = useState<'device' | 'showcase'>('device');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const screenContainerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  // GSAP transition when changing tabs or pushing subviews
  useGSAP(
    () => {
      if (screenContainerRef.current) {
        if (activeSubView) {
          // Push slide in from right
          gsap.fromTo(
            screenContainerRef.current,
            { x: '25%', opacity: 0.5 },
            { x: '0%', opacity: 1, duration: 0.38, ease: 'power2.out' }
          );
        } else {
          // Tab fade and subtle scale
          gsap.fromTo(
            screenContainerRef.current,
            { opacity: 0.6, y: 10, scale: 0.985 },
            { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
          );
        }
      }
    },
    { dependencies: [activeTab, activeSubView, animationKey] }
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

  const replayAnimations = () => {
    setAnimationKey((k) => k + 1);
  };

  const renderActiveScreen = () => {
    // If a subview is active in navigation stack
    if (activeSubView === 'medication-detail') return <MedicationDetailView />;
    if (activeSubView === 'wellness-detail') return <WellnessView />;
    if (activeSubView === 'diary') return <DiaryView />;
    if (activeSubView === 'settings') return <SettingsView />;
    if (activeSubView === 'subscriptions') return <SubscriptionsView />;
    if (activeSubView === 'health-base') return <HealthBaseView />;
    if (activeSubView === 'scan') return <ScanModal />;
    if (activeSubView === 'edit-profile') return <EditProfileModal />;

    // Otherwise render active tab
    if (activeTab === 'home') return <HomeScreen />;
    if (activeTab === 'statistics') return <StatisticsScreen />;
    if (activeTab === 'options') return <ProfileScreen />;

    return <HomeScreen />;
  };

  return (
    <main
      data-theme={theme}
      className={theme === 'dark' ? 'dark' : ''}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'var(--bg-desktop)',
        backgroundImage: 'var(--bg-desktop-gradient)',
        position: 'relative',
        paddingBottom: '40px',
        color: 'var(--text-primary)',
        transition: 'background 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Top Presentation Toolbar */}
      <WebToolbar
        viewMode={viewMode}
        setViewMode={setViewMode}
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
              <DynamicIsland />

              {/* Status Bar */}
              <StatusBar />

              {/* Drop-down iOS Toast / Banner Alert */}
              <IOSToast />

              {/* Screen Content Switcher with GSAP animation */}
              <div
                ref={screenContainerRef}
                key={`screen-${activeTab}-${activeSubView}-${animationKey}`}
                style={{
                  flex: 1,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {renderActiveScreen()}
              </div>

              {/* Floating Bottom Navigation Dock */}
              <BottomDock />
            </div>
          </div>
        ) : (
          /* 3-Screen Mockup Showcase Mode */
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
                <DynamicIsland />
                <StatusBar />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <HomeScreen />
                </div>
                <BottomDock />
              </div>
            </div>

            {/* Screen 2: Statistics */}
            <div className="iphone-frame showcase-device" style={{ transform: 'scale(0.92)' }}>
              <div className="iphone-screen">
                <DynamicIsland />
                <StatusBar />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <StatisticsScreen />
                </div>
                <BottomDock />
              </div>
            </div>

            {/* Screen 3: More Options */}
            <div className="iphone-frame showcase-device" style={{ transform: 'scale(0.92)' }}>
              <div className="iphone-screen">
                <DynamicIsland />
                <StatusBar />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <ProfileScreen />
                </div>
                <BottomDock />
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

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
