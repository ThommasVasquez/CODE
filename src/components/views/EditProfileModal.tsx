'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Camera, Upload, Check } from 'lucide-react';

export const EditProfileModal: React.FC = () => {
  const { profile, updateProfile, popView, showToast, setAvatarUrl } = useApp();

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
      showToast('Por favor selecciona una imagen válida');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCurrentAvatar(dataUrl);
        setAvatarUrl(dataUrl);
        showToast('Foto cargada correctamente');
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
        backgroundColor: '#F4F6F8',
        overflowY: 'auto',
        paddingBottom: '90px',
      }}
    >
      <IOSHeader title="Editar Perfil" subtitle="Datos y Foto del Paciente" />

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
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '18px',
            border: '1px solid rgba(220,226,230,0.8)',
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
                border: '3px solid #73A932',
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
                backgroundColor: '#12161C',
                border: '2px solid #FFFFFF',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
              title="Cargar foto desde tu dispositivo"
            >
              <Camera size={15} />
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                backgroundColor: '#EDF8EE',
                color: '#2A8532',
                border: 'none',
                borderRadius: '16px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Upload size={13} />
              Cargar Foto Personal
            </button>
          </div>

          {/* Quick Avatar Presets */}
          <div style={{ width: '100%', marginTop: '4px' }}>
            <span style={{ fontSize: '10.5px', color: '#7E8E9E', fontWeight: 600, display: 'block', marginBottom: '6px', textAlign: 'center' }}>
              O elige un avatar sugerido:
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
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
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: isSelected ? '2.5px solid #73A932' : '2px solid #E2E8F0',
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
                      sizes="42px"
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Personal Details Form */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '18px', border: '1px solid rgba(220,226,230,0.8)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#687787', textTransform: 'uppercase' }}>
              Nombre Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '12px',
                border: '1px solid #D1D9E0',
                fontSize: '13px',
                marginTop: '4px',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#687787', textTransform: 'uppercase' }}>
                Edad (Años)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '12px',
                  border: '1px solid #D1D9E0',
                  fontSize: '13px',
                  marginTop: '4px',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#687787', textTransform: 'uppercase' }}>
                Residencia / Ciudad
              </label>
              <input
                type="text"
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '12px',
                  border: '1px solid #D1D9E0',
                  fontSize: '13px',
                  marginTop: '4px',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#687787', textTransform: 'uppercase' }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '12px',
                border: '1px solid #D1D9E0',
                fontSize: '13px',
                marginTop: '4px',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#687787', textTransform: 'uppercase' }}>
              Teléfono de Contacto
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '12px',
                border: '1px solid #D1D9E0',
                fontSize: '13px',
                marginTop: '4px',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#12161C',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '16px',
            padding: '13px',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <Check size={16} />
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
