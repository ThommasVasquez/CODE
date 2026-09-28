'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Scan, Share2, Pencil, ArrowUpRight, Camera, Moon, Sun, Globe, Sliders, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const ProfileScreen: React.FC = () => {
  const {
    profile,
    diaryEntries,
    pushView,
    showToast,
    setAvatarUrl,
    t,
    theme,
    toggleTheme,
    language,
    setLanguage,
  } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Por favor selecciona un archivo de imagen');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setAvatarUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.profile-header', {
        y: -12,
        opacity: 0,
        duration: 0.45,
      })
      .from('.profile-card', {
        scale: 0.96,
        y: 18,
        opacity: 0,
        duration: 0.55,
      }, '-=0.2')
      .from('.action-card', {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
      }, '-=0.3');
    },
    { scope: containerRef }
  );

  const handleShare = async () => {
    const shareData = {
      title: `CODE® - ${profile.name}`,
      text: `${profile.name} | ID: ${profile.deviceId} | ${profile.residence}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(
        `CODE®: ${profile.name} (ID: ${profile.deviceId}), ${profile.residence}`
      );
      showToast(t('linkCopied'));
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '12px 20px 100px 20px',
        overflowY: 'auto',
        height: '100%',
        color: 'var(--text-primary)',
      }}
    >
      {/* Hidden File Input for Avatar Change */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Top Header with Scan & Share Icons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
        <h1
          className="profile-header"
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
          }}
        >
          {t('moreOptions')}
        </h1>

        <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Scan button */}
          <button
            onClick={() => pushView('scan')}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--card-white)',
              border: '1px solid rgba(220, 226, 230, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-subtle)',
            }}
            title={t('scanTitle')}
          >
            <Scan size={18} color="var(--text-primary)" />
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--card-white)',
              border: '1px solid rgba(220, 226, 230, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-subtle)',
            }}
            title="Compartir informe de salud"
          >
            <Share2 size={17} color="var(--text-primary)" />
          </button>
        </div>
      </div>

      {/* Main Profile Info Card */}
      <div
        className="profile-card"
        style={{
          backgroundColor: 'var(--card-white)',
          borderRadius: '30px',
          padding: '20px 20px 18px 20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid rgba(230, 235, 240, 0.3)',
          position: 'relative',
        }}
      >
        {/* Top Header of Card */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {profile.name}{t('device')}
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, marginTop: '2px' }}>
              {profile.patientId}
            </p>
          </div>

          <button
            onClick={() => pushView('edit-profile')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? '#27313F' : '#F3F6F8',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title={t('editProfileTitle')}
          >
            <Pencil size={15} color="var(--text-secondary)" />
          </button>
        </div>

        {/* Central Portrait with Halo Backdrop & Camera Button */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0 16px 0' }}>
          <div style={{ position: 'relative', width: '106px', height: '106px' }}>
            <div
              style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #BCE4E6 0%, #E3F5F5 70%, transparent 100%)',
                opacity: theme === 'dark' ? 0.3 : 1,
              }}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid var(--card-white)',
                boxShadow: '0 6px 20px rgba(48, 164, 168, 0.28)',
                cursor: 'pointer',
              }}
              title={t('changePhoto')}
            >
              <Image
                src={profile.avatarUrl && profile.avatarUrl.trim() !== '' ? profile.avatarUrl : '/avatar.jpg'}
                alt={profile.name || 'Usuario'}
                fill
                sizes="110px"
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>

            {/* Camera Floating Badge Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--device-bezel)',
                border: '2.5px solid var(--card-white)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 3px 8px rgba(0,0,0,0.25)',
                transition: 'transform 0.2s ease',
              }}
              title={t('changePhoto')}
            >
              <Camera size={14} color="#FFFFFF" />
            </button>
          </div>
        </div>

        {/* Light Cyan/Dark Rounded Personal Details Table */}
        <div
          style={{
            backgroundColor: 'var(--card-cyan)',
            borderRadius: '22px',
            padding: '14px 16px',
            border: '1px solid var(--card-cyan-border)',
          }}
        >
          {/* Key-Value Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{t('age')} :</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{profile.age} {t('years')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{t('email')} :</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{profile.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{t('phone')} :</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{profile.phone}</span>
            </div>
          </div>

          {/* Bottom Dual White/Dark Chips */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--card-white)',
                borderRadius: '12px',
                padding: '7px 8px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 600 }}>{t('patientId')}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-primary)', fontWeight: 800, marginTop: '1px' }}>
                {profile.deviceId}
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--card-white)',
                borderRadius: '12px',
                padding: '7px 8px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 600 }}>{t('residence')}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-primary)', fontWeight: 800, marginTop: '1px' }}>
                {profile.residence}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2x2 Grid of Actions (Diary, Settings, Subscriptions, Health Base) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
        }}
      >
        {/* Diary */}
        <div
          className="action-card"
          onClick={() => pushView('diary')}
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '110px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          title={t('diary')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('diary')}
            </span>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#27313F' : '#F3F6F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpRight size={14} color="var(--text-secondary)" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {diaryEntries.length}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', marginTop: '3px' }}>
              {t('diarySub')}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div
          className="action-card"
          onClick={() => pushView('settings')}
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '110px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          title={t('settings')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('settings')}
            </span>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#27313F' : '#F3F6F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpRight size={14} color="var(--text-secondary)" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              12
            </div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', marginTop: '3px' }}>
              {t('settingsSub')}
            </div>
          </div>
        </div>

        {/* Subscriptions */}
        <div
          className="action-card"
          onClick={() => pushView('subscriptions')}
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '110px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          title={t('subscriptions')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('subscriptions')}
            </span>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#27313F' : '#F3F6F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpRight size={14} color="var(--text-secondary)" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              24
            </div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', marginTop: '3px' }}>
              {t('subscriptionsSub')}
            </div>
          </div>
        </div>

        {/* Health Base */}
        <div
          className="action-card"
          onClick={() => pushView('health-base')}
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '110px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          title={t('healthBase')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('healthBase')}
            </span>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#27313F' : '#F3F6F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpRight size={14} color="var(--text-secondary)" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              05
            </div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', marginTop: '3px' }}>
              {t('healthBaseSub')}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Settings Card: Dark/Light Mode & Language Switcher */}
      <div
        className="action-card"
        style={{
          backgroundColor: 'var(--card-white)',
          borderRadius: '26px',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid rgba(220, 226, 230, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={16} color="var(--accent-cyan)" />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {t('quickSettings')}
              </h4>
              <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', margin: 0 }}>
                {t('quickSettingsSub')}
              </p>
            </div>
          </div>

          <button
            onClick={() => pushView('settings')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-cyan)',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            {t('settings')} <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Theme Mode Toggle (Light / Dark) */}
        <div
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '16px',
            backgroundColor: theme === 'dark' ? '#141B22' : '#F7F9FA',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
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
                transition: 'all 0.2s ease',
              }}
            >
              {theme === 'dark' ? (
                <Moon size={16} color="#A277FF" />
              ) : (
                <Sun size={16} color="#E5A100" />
              )}
            </div>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {theme === 'dark' ? t('darkMode') : t('lightMode')}
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                {theme === 'dark' ? 'Tema con fondo negro OLED' : 'Tema claro con alto contraste'}
              </div>
            </div>
          </div>

          {/* iOS Switch Toggle */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={14} color="var(--accent-cyan)" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('languageSetting')}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              backgroundColor: theme === 'dark' ? '#141B22' : '#EFF2F5',
              borderRadius: '14px',
              padding: '3px',
              gap: '4px',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setLanguage('es');
                showToast('Idioma cambiado a Español 🇪🇸');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 12px',
                borderRadius: '11px',
                border: 'none',
                backgroundColor: language === 'es' ? 'var(--card-white)' : 'transparent',
                color: language === 'es' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: language === 'es' ? 800 : 600,
                fontSize: '12.5px',
                cursor: 'pointer',
                boxShadow: language === 'es' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '14px' }}>🇪🇸</span>
              <span>Español</span>
              {language === 'es' && <Check size={13} color="var(--accent-green)" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setLanguage('en');
                showToast('Language switched to English 🇺🇸');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 12px',
                borderRadius: '11px',
                border: 'none',
                backgroundColor: language === 'en' ? 'var(--card-white)' : 'transparent',
                color: language === 'en' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: language === 'en' ? 800 : 600,
                fontSize: '12.5px',
                cursor: 'pointer',
                boxShadow: language === 'en' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '14px' }}>🇺🇸</span>
              <span>English</span>
              {language === 'en' && <Check size={13} color="var(--accent-green)" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
