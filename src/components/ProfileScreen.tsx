'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Scan, Share2, Pencil, ArrowUpRight, Camera } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const ProfileScreen: React.FC = () => {
  const { profile, diaryEntries, pushView, showToast, setAvatarUrl } = useApp();
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
      title: `CODE® - Informe de ${profile.name}`,
      text: `Paciente: ${profile.name} | ID: ${profile.deviceId} | Residencia: ${profile.residence}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Ignored if cancelled
      }
    } else {
      navigator.clipboard.writeText(
        `CODE® Salud: Paciente ${profile.name} (ID: ${profile.deviceId}), Residencia: ${profile.residence}`
      );
      showToast('Enlace e informe copiado al portapapeles');
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
            color: '#0E141B',
            letterSpacing: '-0.5px',
          }}
        >
          More Options
        </h1>

        <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Scan button */}
          <button
            onClick={() => pushView('scan')}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(220, 226, 230, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
            }}
            title="Escanear código de barras o dispositivo"
          >
            <Scan size={18} color="#181D23" />
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(220, 226, 230, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
            }}
            title="Compartir informe de salud"
          >
            <Share2 size={17} color="#181D23" />
          </button>
        </div>
      </div>

      {/* Main Profile Info Card */}
      <div
        className="profile-card"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '30px',
          padding: '20px 20px 18px 20px',
          boxShadow: '0 8px 30px rgba(16, 24, 40, 0.04)',
          border: '1px solid rgba(230, 235, 240, 0.8)',
          position: 'relative',
        }}
      >
        {/* Top Header of Card */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1A232C' }}>
              {profile.name}&apos;s Device
            </h3>
            <p style={{ fontSize: '11px', color: '#68798A', fontWeight: 500, marginTop: '2px' }}>
              {profile.patientId}
            </p>
          </div>

          <button
            onClick={() => pushView('edit-profile')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#F3F6F8',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title="Editar Perfil"
          >
            <Pencil size={15} color="#455464" />
          </button>
        </div>

        {/* Central Portrait with Halo Backdrop & Camera Button */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0 16px 0' }}>
          <div
            style={{ position: 'relative', width: '106px', height: '106px' }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #BCE4E6 0%, #E3F5F5 70%, transparent 100%)',
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
                border: '3px solid #FFFFFF',
                boxShadow: '0 6px 20px rgba(48, 164, 168, 0.28)',
                cursor: 'pointer',
              }}
              title="Haz clic para cambiar la foto de perfil"
            >
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                sizes="110px"
                style={{ objectFit: 'cover' }}
                priority
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
                backgroundColor: '#12161C',
                border: '2.5px solid #FFFFFF',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 3px 8px rgba(0,0,0,0.25)',
                transition: 'transform 0.2s ease',
              }}
              title="Cambiar foto de perfil"
            >
              <Camera size={14} color="#FFFFFF" />
            </button>
          </div>
        </div>

        {/* Light Cyan Rounded Personal Details Table */}
        <div
          style={{
            backgroundColor: '#E4F2F4',
            borderRadius: '22px',
            padding: '14px 16px',
            border: '1px solid #D6EAEB',
          }}
        >
          {/* Key-Value Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: '#556D73', fontWeight: 500 }}>Age :</span>
              <span style={{ color: '#102025', fontWeight: 700 }}>{profile.age} years</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: '#556D73', fontWeight: 500 }}>Email :</span>
              <span style={{ color: '#102025', fontWeight: 700 }}>{profile.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: '#556D73', fontWeight: 500 }}>Phone number :</span>
              <span style={{ color: '#102025', fontWeight: 700 }}>{profile.phone}</span>
            </div>
          </div>

          {/* Bottom Dual White Chips (Policy removed, spacious 2 columns) */}
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
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '7px 8px',
                textAlign: 'center',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div style={{ fontSize: '9.5px', color: '#688288', fontWeight: 600 }}>ID Paciente</div>
              <div style={{ fontSize: '11px', color: '#102025', fontWeight: 800, marginTop: '1px' }}>
                {profile.deviceId}
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '7px 8px',
                textAlign: 'center',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div style={{ fontSize: '9.5px', color: '#688288', fontWeight: 600 }}>Residencia</div>
              <div style={{ fontSize: '11px', color: '#102025', fontWeight: 800, marginTop: '1px' }}>
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
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: '0 6px 20px rgba(16, 24, 40, 0.04)',
            border: '1px solid rgba(230, 235, 240, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '110px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          title="Abrir bitácora de salud"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#18222B' }}>
              Diary
            </span>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#F3F6F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpRight size={14} color="#354556" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0E141B', lineHeight: 1 }}>
              {diaryEntries.length}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: '#7E8C9C', marginTop: '3px' }}>
              Total
            </div>
          </div>
        </div>

        {/* Settings */}
        <div
          className="action-card"
          onClick={() => pushView('settings')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: '0 6px 20px rgba(16, 24, 40, 0.04)',
            border: '1px solid rgba(230, 235, 240, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '110px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          title="Abrir ajustes de la aplicación"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#18222B' }}>
              Settings
            </span>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#F3F6F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpRight size={14} color="#354556" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0E141B', lineHeight: 1 }}>
              12
            </div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: '#7E8C9C', marginTop: '3px' }}>
              Action
            </div>
          </div>
        </div>

        {/* Subscriptions */}
        <div
          className="action-card"
          onClick={() => pushView('subscriptions')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: '0 6px 20px rgba(16, 24, 40, 0.04)',
            border: '1px solid rgba(230, 235, 240, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '110px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          title="Ver suscripciones y recargas"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#18222B' }}>
              Subscriptions
            </span>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#F3F6F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpRight size={14} color="#354556" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0E141B', lineHeight: 1 }}>
              24
            </div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: '#7E8C9C', marginTop: '3px' }}>
              Day leave
            </div>
          </div>
        </div>

        {/* Health Base */}
        <div
          className="action-card"
          onClick={() => pushView('health-base')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: '0 6px 20px rgba(16, 24, 40, 0.04)',
            border: '1px solid rgba(230, 235, 240, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '110px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          title="Ver métricas de actividad y vitales"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#18222B' }}>
              Health Base
            </span>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#F3F6F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpRight size={14} color="#354556" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0E141B', lineHeight: 1 }}>
              05
            </div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: '#7E8C9C', marginTop: '3px' }}>
              Activity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
