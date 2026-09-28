'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { Bell, Clock, Calendar, Check, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export const WorkoutRemindersView: React.FC = () => {
  const {
    workoutSchedule,
    toggleWorkoutDay,
    setWorkoutTime,
    toggleWorkoutReminder,
    showToast,
    t,
    theme,
  } = useApp();

  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTime, setSelectedTimeState] = useState<string>(workoutSchedule.time || '07:30');

  const daysList = [
    { key: 'Lunes', short: 'L', full: 'Lunes' },
    { key: 'Martes', short: 'M', full: 'Martes' },
    { key: 'Miércoles', short: 'X', full: 'Miércoles' },
    { key: 'Jueves', short: 'J', full: 'Jueves' },
    { key: 'Viernes', short: 'V', full: 'Viernes' },
    { key: 'Sábado', short: 'S', full: 'Sábado' },
    { key: 'Domingo', short: 'D', full: 'Domingo' },
  ];

  useGSAP(
    () => {
      gsap.from('.reminder-card', {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTimeState(e.target.value);
    setWorkoutTime(e.target.value);
  };

  const handleSave = () => {
    showToast(t('reminderSaved'));
  };

  return (
    <div
      ref={containerRef}
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
      <IOSHeader title={t('remindersTitle')} subtitle={t('customSchedule')} />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Master Reminder Toggle Banner */}
        <div
          className="reminder-card"
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '26px',
            padding: '20px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: workoutSchedule.enabled ? 'var(--card-lime)' : 'var(--device-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bell size={20} color={workoutSchedule.enabled ? 'var(--accent-green)' : 'var(--text-muted)'} />
            </div>

            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('notificationsActive')}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {workoutSchedule.enabled ? 'Recordatorios automáticos en días fijados' : 'Notificaciones desactivadas'}
              </div>
            </div>
          </div>

          {/* iOS Switch */}
          <div
            onClick={toggleWorkoutReminder}
            style={{
              width: '50px',
              height: '30px',
              borderRadius: '15px',
              backgroundColor: workoutSchedule.enabled ? 'var(--accent-green)' : '#D1D5DB',
              position: 'relative',
              cursor: 'pointer',
              transition: 'background-color 0.25s ease',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                top: '3px',
                left: workoutSchedule.enabled ? '23px' : '3px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'left 0.25s ease',
              }}
            />
          </div>
        </div>

        {/* Training Days Selector */}
        <div
          className="reminder-card"
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '26px',
            padding: '20px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.35)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('selectDays')}
              </h3>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {workoutSchedule.days.length} días seleccionados por semana
              </p>
            </div>
            <Calendar size={18} color="var(--accent-green)" />
          </div>

          {/* Circular Day Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
            {daysList.map((day) => {
              const isSelected = workoutSchedule.days.includes(day.key);
              return (
                <button
                  key={day.key}
                  onClick={() => toggleWorkoutDay(day.key)}
                  style={{
                    width: '38px',
                    height: '46px',
                    borderRadius: '18px',
                    border: isSelected ? '1.5px solid var(--accent-green)' : '1px solid rgba(220, 226, 230, 0.4)',
                    backgroundColor: isSelected ? 'var(--accent-green)' : 'var(--device-bg)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 3px 8px rgba(115, 169, 50, 0.3)' : 'none',
                  }}
                  title={day.full}
                >
                  <span style={{ fontSize: '13px', fontWeight: 800 }}>{day.short}</span>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '12px', fontSize: '11.5px', color: 'var(--text-secondary)', textAlign: 'center' }}>
            {workoutSchedule.days.join(' • ')}
          </div>
        </div>

        {/* Hour & Time Selector */}
        <div
          className="reminder-card"
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '26px',
            padding: '20px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.35)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('selectHour')}
              </h3>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Hora programada para la notificación
              </p>
            </div>
            <Clock size={18} color="var(--accent-green)" />
          </div>

          <div
            style={{
              backgroundColor: 'var(--device-bg)',
              borderRadius: '20px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              style={{
                fontSize: '28px',
                fontWeight: 900,
                border: 'none',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                fontFamily: 'monospace',
                outline: 'none',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>

        {/* Preview of iOS Push Notification */}
        <div
          className="reminder-card"
          style={{
            backgroundColor: 'var(--card-lime)',
            borderRadius: '24px',
            padding: '16px 18px',
            border: '1px solid var(--card-lime-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Sparkles size={16} color="var(--accent-green)" />
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-green)' }}>
              Simulación de Notificación Push
            </span>
          </div>

          <div
            style={{
              backgroundColor: 'var(--card-white)',
              borderRadius: '16px',
              padding: '12px 14px',
              boxShadow: 'var(--shadow-subtle)',
              border: '1px solid rgba(220, 226, 230, 0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-green)' }}>
                CODE® FITNESS COACH
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{selectedTime}</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '3px' }}>
              ¡Hora de entrenar! 🔥
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Hoy te toca tu sesión programada. Prepara tus zapatillas y tu botella de agua.
            </div>
          </div>
        </div>

        {/* Save Schedule CTA Button */}
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '24px',
            backgroundColor: 'var(--accent-green)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '15px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(115, 169, 50, 0.35)',
            transition: 'transform 0.15s ease',
          }}
        >
          <CheckCircle2 size={18} />
          {t('saveSchedule')}
        </button>
      </div>
    </div>
  );
};
