'use client';

import React, { useRef } from 'react';
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

// Subviews
import { MedicationDetailView } from '@/components/views/MedicationDetailView';
import { WellnessView } from '@/components/views/WellnessView';
import { DiaryView } from '@/components/views/DiaryView';
import { SettingsView } from '@/components/views/SettingsView';
import { SubscriptionsView } from '@/components/views/SubscriptionsView';
import { HealthBaseView } from '@/components/views/HealthBaseView';
import { ScanModal } from '@/components/views/ScanModal';
import { EditProfileModal } from '@/components/views/EditProfileModal';
import { WorkoutDetailView } from '@/components/views/WorkoutDetailView';
import { DietDetailView } from '@/components/views/DietDetailView';
import { FastingDetailView } from '@/components/views/FastingDetailView';
import { CalorieCalculatorView } from '@/components/views/CalorieCalculatorView';
import { WorkoutRemindersView } from '@/components/views/WorkoutRemindersView';
import { OnboardingView } from '@/components/views/OnboardingView';

function AppContent() {
  const { activeTab, activeSubView, popView, theme } = useApp();
  const screenContainerRef = useRef<HTMLDivElement>(null);

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
    { dependencies: [activeTab, activeSubView] }
  );

  const renderActiveScreen = () => {
    // If a subview is active in navigation stack
    if (activeSubView === 'onboarding') return <OnboardingView onStart={popView} />;
    if (activeSubView === 'medication-detail') return <MedicationDetailView />;
    if (activeSubView === 'wellness-detail') return <WellnessView />;
    if (activeSubView === 'diary') return <DiaryView />;
    if (activeSubView === 'settings') return <SettingsView />;
    if (activeSubView === 'subscriptions') return <SubscriptionsView />;
    if (activeSubView === 'health-base') return <HealthBaseView />;
    if (activeSubView === 'scan') return <ScanModal />;
    if (activeSubView === 'edit-profile') return <EditProfileModal />;
    if (activeSubView === 'workout-detail') return <WorkoutDetailView />;
    if (activeSubView === 'diet-detail') return <DietDetailView />;
    if (activeSubView === 'fasting-detail') return <FastingDetailView />;
    if (activeSubView === 'calorie-calc') return <CalorieCalculatorView />;
    if (activeSubView === 'workout-reminders') return <WorkoutRemindersView />;

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
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--bg-desktop)',
        backgroundImage: 'var(--bg-desktop-gradient)',
        position: 'relative',
        color: 'var(--text-primary)',
        transition: 'background 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Interactive iPhone Frame (90% viewport height) */}
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
            top: '18%',
            width: '3.5px',
            height: '5.8%',
            backgroundColor: '#353940',
            borderRadius: '3px 0 0 3px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-14px',
            top: '25%',
            width: '3.5px',
            height: '5.8%',
            backgroundColor: '#353940',
            borderRadius: '3px 0 0 3px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-14px',
            top: '21%',
            width: '3.5px',
            height: '9%',
            backgroundColor: '#353940',
            borderRadius: '0 3px 3px 0',
          }}
        />

        {/* Inner iOS Screen */}
        <div
          className="iphone-screen"
          style={{
            backgroundColor: activeSubView === 'onboarding' ? '#05070A' : undefined,
          }}
        >
          {/* Status Bar (Ultra clean matching reference image) */}
          <StatusBar />

          {/* Drop-down iOS Toast / Banner Alert */}
          <IOSToast />

          {/* Screen Content Switcher with GSAP animation */}
          <div
            ref={screenContainerRef}
            key={`screen-${activeTab}-${activeSubView}`}
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
