'use client';

import React from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import {
  Bell,
  RefreshCw,
  Cloud,
  Download,
  Bluetooth,
  Moon,
  Sun,
  Globe,
  Sparkles,
  Check,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    settings,
    toggleSetting,
    showToast,
    theme,
    toggleTheme,
    language,
    setLanguage,
    t,
  } = useApp();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'var(--device-bg)',
        overflowY: 'auto',
        paddingBottom: '90px',
        color: 'var(--text-primary)',
      }}
    >
      <IOSHeader title={t('settingsTitle')} subtitle={t('settingsAvailable')} />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Appearance & Language Card */}
        <div
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '16px 18px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(220, 226, 230, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--accent-green)" />
            <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('appearance')} & {t('languageSetting')}
            </h4>
          </div>

          {/* Dark Mode Toggle */}
          <div
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '6px',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(140, 150, 160, 0.15)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: theme === 'dark' ? '#2A2035' : '#FFF9E6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {theme === 'dark' ? (
                  <Moon size={16} color="#A277FF" />
                ) : (
                  <Sun size={16} color="#E5A100" />
                )}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t('themeMode')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {theme === 'dark' ? 'Activado (Oscuro)' : 'Desactivado (Claro)'}
                </div>
              </div>
            </div>

            {/* iOS Switch */}
            <div
              style={{
                width: '46px',
                height: '26px',
                backgroundColor: theme === 'dark' ? 'var(--accent-green)' : '#D1D7DC',
                borderRadius: '13px',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: theme === 'dark' ? 'flex-end' : 'flex-start',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
                }}
              />
            </div>
          </div>

          {/* Language Switcher Segmented Control */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={15} color="var(--accent-cyan)" />
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {t('languageSetting')}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                backgroundColor: theme === 'dark' ? '#0E1318' : '#F1F4F7',
                borderRadius: '14px',
                padding: '3px',
                gap: '4px',
              }}
            >
              <button
                type="button"
                onClick={() => setLanguage('es')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '11px',
                  border: 'none',
                  backgroundColor: language === 'es' ? 'var(--card-white)' : 'transparent',
                  color: language === 'es' ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: language === 'es' ? 800 : 600,
                  fontSize: '12px',
                  cursor: 'pointer',
                  boxShadow: language === 'es' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>🇪🇸</span>
                <span>Español</span>
                {language === 'es' && <Check size={13} color="var(--accent-green)" />}
              </button>

              <button
                type="button"
                onClick={() => setLanguage('en')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '11px',
                  border: 'none',
                  backgroundColor: language === 'en' ? 'var(--card-white)' : 'transparent',
                  color: language === 'en' ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: language === 'en' ? 800 : 600,
                  fontSize: '12px',
                  cursor: 'pointer',
                  boxShadow: language === 'en' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>🇺🇸</span>
                <span>English</span>
                {language === 'en' && <Check size={13} color="var(--accent-green)" />}
              </button>
            </div>
          </div>
        </div>

        {/* Device Status Card */}
        <div
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '16px 18px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(220, 226, 230, 0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--card-lime)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bluetooth size={18} color="var(--accent-green)" />
              </div>
              <div>
                <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {t('connectedDispenser')}
                </h4>
                <span style={{ fontSize: '11px', color: 'var(--accent-green)', fontWeight: 700 }}>
                  ● {t('pairedStatus')}
                </span>
              </div>
            </div>

            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                backgroundColor: theme === 'dark' ? '#1D242E' : '#F3F6F8',
                padding: '4px 8px',
                borderRadius: '10px',
              }}
            >
              🔋 88%
            </span>
          </div>
        </div>

        {/* Toggles Group */}
        <div
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '6px 18px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(220, 226, 230, 0.4)',
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
              borderBottom: '1px solid rgba(140, 150, 160, 0.15)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bell size={17} color="var(--text-secondary)" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t('doseReminders')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {t('doseRemindersDesc')}
                </div>
              </div>
            </div>

            <div
              style={{
                width: '44px',
                height: '24px',
                backgroundColor: settings.notifications ? 'var(--accent-green)' : '#D1D7DC',
                borderRadius: '12px',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: settings.notifications ? 'flex-end' : 'flex-start',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
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
              borderBottom: '1px solid rgba(140, 150, 160, 0.15)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <RefreshCw size={17} color="var(--text-secondary)" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t('autoRefill')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {t('autoRefillDesc')}
                </div>
              </div>
            </div>

            <div
              style={{
                width: '44px',
                height: '24px',
                backgroundColor: settings.autoRefill ? 'var(--accent-green)' : '#D1D7DC',
                borderRadius: '12px',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: settings.autoRefill ? 'flex-end' : 'flex-start',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
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
              <Cloud size={17} color="var(--text-secondary)" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t('cloudSync')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {t('cloudSyncDesc')}
                </div>
              </div>
            </div>

            <div
              style={{
                width: '44px',
                height: '24px',
                backgroundColor: settings.cloudSync ? 'var(--accent-green)' : '#D1D7DC',
                borderRadius: '12px',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: settings.cloudSync ? 'flex-end' : 'flex-start',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Button: Export */}
        <button
          onClick={() => showToast(t('reportExported'))}
          style={{
            backgroundColor: 'var(--card-white)',
            border: '1px solid rgba(220, 226, 230, 0.4)',
            borderRadius: '20px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Download size={17} color="var(--text-primary)" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('exportReport')}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--accent-green)', fontWeight: 700 }}>
            {t('exportReportSub')}
          </span>
        </button>
      </div>
    </div>
  );
};
