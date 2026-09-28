'use client';

import React, { useState } from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';

export const EditProfileModal: React.FC = () => {
  const { profile, updateProfile, popView } = useApp();

  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age.toString());
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [policy, setPolicy] = useState(profile.policy);
  const [residence, setResidence] = useState(profile.residence);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      age: parseInt(age, 10) || profile.age,
      email,
      phone,
      policy,
      residence,
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
      <IOSHeader title="Editar Perfil" subtitle="Datos del Paciente" />

      <form onSubmit={handleSubmit} style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#687787', textTransform: 'uppercase' }}>
                Póliza
              </label>
              <input
                type="text"
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
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
                Residencia
              </label>
              <input
                type="text"
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
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
          }}
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
