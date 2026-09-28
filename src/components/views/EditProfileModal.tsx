'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Camera, Upload, Check } from 'lucide-react';

export const EditProfileModal: React.FC = () => {
  const { profile, updateProfile, popView, showToast, setAvatarUrl, t, theme } = useApp();

  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age.toString());
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [residence, setResidence] = useState(profile.residence);
  const [currentAvatar, setCurrentAvatar] = useState(profile.avatarUrl);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatarPresets = [
    { name: 'Shohan', url: '/avatar.jpg' },
    { name: 'Elena', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
    { name: 'Marcus', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { name: 'Dra. Vance', url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast(t('selectValidImage'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCurrentAvatar(dataUrl);
        setAvatarUrl(dataUrl);
        showToast(t('photoLoadedSuccess'));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      age: parseInt(age, 10) || profile.age,
      email,
      phone,
      residence,
      avatarUrl: currentAvatar,
    });
    popView();
  };

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
      <IOSHeader title={t('editProfileTitle')} subtitle={t('editProfileSub')} />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <form onSubmit={handleSubmit} style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Avatar Editing Section */}
        <div
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '18px',
            border: '1px solid rgba(220,226,230,0.3)',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ position: 'relative', width: '92px', height: '92px' }}>
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid var(--accent-green)',
                position: 'relative',
                boxShadow: '0 4px 16px rgba(115, 169, 50, 0.25)',
              }}
            >
              <Image
                src={currentAvatar}
                alt={name}
                fill
                sizes="92px"
                style={{ objectFit: 'cover' }}
              />
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--device-bezel)',
                border: '2px solid var(--card-white)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
              title={t('uploadPhoto')}
            >
              <Camera size={15} />
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                backgroundColor: theme === 'dark' ? '#1D2A1C' : '#EDF8EE',
                color: theme === 'dark' ? '#9FE856' : '#2A8532',
                border: 'none',
                borderRadius: '16px',
                padding: '7px 16px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Upload size={13} />
              {t('uploadPhoto')}
            </button>
          </div>

          {/* Quick Avatar Presets */}
          <div style={{ width: '100%', marginTop: '4px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px', textAlign: 'center' }}>
              {t('orPreset')}
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {avatarPresets.map((preset) => {
                const isSelected = currentAvatar === preset.url;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setCurrentAvatar(preset.url);
                      setAvatarUrl(preset.url);
                    }}
                    style={{
                      position: 'relative',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: isSelected ? '2.5px solid var(--accent-green)' : '2px solid rgba(150, 160, 175, 0.3)',
                      cursor: 'pointer',
                      padding: 0,
                      transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                    }}
                    title={preset.name}
                  >
                    <Image
                      src={preset.url}
                      alt={preset.name}
                      fill
                      sizes="44px"
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Personal Details Form */}
        <div
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '24px',
            padding: '18px',
            border: '1px solid rgba(220,226,230,0.3)',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              {t('fullName')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '13px',
                border: theme === 'dark' ? '1px solid #2B3542' : '1px solid #D5DCE2',
                backgroundColor: theme === 'dark' ? '#141A22' : '#FFFFFF',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                marginTop: '4px',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                {t('ageYears')}
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '13px',
                  border: theme === 'dark' ? '1px solid #2B3542' : '1px solid #D5DCE2',
                  backgroundColor: theme === 'dark' ? '#141A22' : '#FFFFFF',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  marginTop: '4px',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                {t('residenceCity')}
              </label>
              <input
                type="text"
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '13px',
                  border: theme === 'dark' ? '1px solid #2B3542' : '1px solid #D5DCE2',
                  backgroundColor: theme === 'dark' ? '#141A22' : '#FFFFFF',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  marginTop: '4px',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              {t('email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '13px',
                border: theme === 'dark' ? '1px solid #2B3542' : '1px solid #D5DCE2',
                backgroundColor: theme === 'dark' ? '#141A22' : '#FFFFFF',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                marginTop: '4px',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              {t('phone')}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '13px',
                border: theme === 'dark' ? '1px solid #2B3542' : '1px solid #D5DCE2',
                backgroundColor: theme === 'dark' ? '#141A22' : '#FFFFFF',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                marginTop: '4px',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: 'var(--device-bezel)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '16px',
            padding: '14px',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'transform 0.15s ease',
          }}
        >
          <Check size={16} />
          {t('saveChanges')}
        </button>
      </form>
    </div>
  );
};
