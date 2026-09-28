'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useApp, WorkoutRoutine } from '@/context/AppContext';
import {
  ChevronLeft,
  MoreVertical,
  Play,
  Pause,
  SkipBack,
  Sparkles,
  Volume2,
  Maximize2,
  Star,
  Flame,
  Heart,
  Clock,
  CheckCircle2,
  RotateCcw,
  Zap,
} from 'lucide-react';

export const WorkoutDetailView: React.FC = () => {
  const {
    workoutRoutines,
    selectedRoutine,
    setSelectedRoutine,
    logWorkoutSession,
    popView,
    showToast,
    theme,
  } = useApp();

  const [activeRoutine, setActiveRoutine] = useState<WorkoutRoutine>(selectedRoutine || workoutRoutines[0]);
  const [timerSeconds, setTimerSeconds] = useState<number>(12 * 60 + 34); // 12:34 matching reference
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);
  const [volumeOn, setVolumeOn] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveRoutine(selectedRoutine || workoutRoutines[0]);
    setCompletedExercises(new Array((selectedRoutine || workoutRoutines[0]).exercises.length).fill(false));
  }, [selectedRoutine, workoutRoutines]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  useGSAP(
    () => {
      gsap.from('.workout-screen-item', {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    },
    { scope: containerRef, dependencies: [activeRoutine.id] }
  );

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const totalDurationSec = (activeRoutine.durationMin || 30) * 60;
  const progressPercent = Math.min(100, Math.round((timerSeconds / totalDurationSec) * 100));

  const toggleExerciseDone = (index: number) => {
    setCompletedExercises((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleTogglePlay = () => {
    setIsRunning(!isRunning);
    showToast(isRunning ? 'Entrenamiento pausado' : '¡Entrenamiento en marcha!');
  };

  const handleFinishWorkout = () => {
    const duration = Math.max(1, Math.round(timerSeconds / 60)) || activeRoutine.durationMin;
    logWorkoutSession(activeRoutine.title, duration, activeRoutine.caloriesBurned);
    setIsRunning(false);
    showToast('¡Entrenamiento completado y registrado con éxito!');
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme === 'dark' ? '#090C10' : '#F8FAFC',
        overflowY: 'auto',
        paddingBottom: '90px',
        color: 'var(--text-primary)',
        background: theme === 'dark'
          ? 'linear-gradient(180deg, #13101E 0%, #090C10 250px)'
          : 'linear-gradient(180deg, #EEF2FF 0%, #F8FAFC 260px)',
      }}
    >
      {/* Navigation Header */}
      <div
        className="workout-screen-item"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 18px',
          flexShrink: 0,
        }}
      >
        <button
          onClick={popView}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#FFFFFF',
            border: '1px solid rgba(220, 226, 230, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            color: 'var(--text-primary)',
          }}
          title="Volver"
        >
          <ChevronLeft size={20} />
        </button>

        <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
          Workout Details
        </h2>

        <button
          onClick={() => showToast('Opciones de rutina guardadas')}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#FFFFFF',
            border: '1px solid rgba(220, 226, 230, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            color: 'var(--text-primary)',
          }}
          title="Más opciones"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      <div style={{ padding: '0 18px 24px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Routine Carousel Selector */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px', flexShrink: 0, scrollbarWidth: 'none' }}>
          {workoutRoutines.map((routine) => {
            const isSelected = routine.id === activeRoutine.id;
            return (
              <button
                key={routine.id}
                onClick={() => {
                  setActiveRoutine(routine);
                  setSelectedRoutine(routine);
                }}
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  border: isSelected ? 'none' : '1px solid rgba(220, 226, 230, 0.5)',
                  backgroundColor: isSelected ? 'var(--accent-purple)' : theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 3px 10px rgba(157, 123, 255, 0.35)' : 'none',
                }}
              >
                {routine.title.split(':')[0]}
              </button>
            );
          })}
        </div>

        {/* Video / Photo Player Card (Matching Screen 3) */}
        <div
          className="workout-screen-item"
          style={{
            position: 'relative',
            width: '100%',
            height: '240px',
            borderRadius: '26px',
            overflow: 'hidden',
            boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
            backgroundColor: '#0F172A',
            flexShrink: 0,
          }}
        >
          {/* Trainer Athlete Performing Barbell Squat */}
          <Image
            src="/trainer_squat.jpg"
            alt="Workout Trainer Squat"
            fill
            sizes="360px"
            style={{ objectFit: 'cover' }}
            priority
          />

          {/* Subtle Top & Bottom Gradient Vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.7) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Centered Circular Pause/Play Floating Button */}
          <button
            onClick={handleTogglePlay}
            style={{
              position: 'absolute',
              top: '46%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'rgba(20, 24, 33, 0.75)',
              backdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              transition: 'transform 0.15s ease',
            }}
            title={isRunning ? 'Pausar' : 'Reproducir'}
          >
            {isRunning ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" style={{ marginLeft: '3px' }} />}
          </button>

          {/* Bottom Player Controls & Scrubber Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {/* Control Icons Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => setTimerSeconds(0)}
                  style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', display: 'flex' }}
                  title="Reiniciar"
                >
                  <SkipBack size={16} />
                </button>
                <button
                  onClick={handleTogglePlay}
                  style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', display: 'flex' }}
                  title="Pausar / Continuar"
                >
                  {isRunning ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Sparkles size={16} color="var(--accent-purple)" style={{ cursor: 'pointer' }} />
                <button
                  onClick={() => setVolumeOn(!volumeOn)}
                  style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', display: 'flex' }}
                  title="Volumen"
                >
                  <Volume2 size={16} style={{ opacity: volumeOn ? 1 : 0.4 }} />
                </button>
                <Maximize2 size={15} style={{ cursor: 'pointer' }} />
              </div>
            </div>

            {/* Scrubber Timeline Bar */}
            <div style={{ position: 'relative', width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: '2px' }}>
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: 'var(--accent-purple)',
                  borderRadius: '2px',
                  position: 'relative',
                }}
              >
                {/* Scrubber Knob */}
                <div
                  style={{
                    position: 'absolute',
                    right: '-4px',
                    top: '-3px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 0 6px rgba(157, 123, 255, 0.8)',
                  }}
                />
              </div>
            </div>

            {/* Time Indicators */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
              <span>{formatTimer(timerSeconds)}</span>
              <span>{formatTimer(totalDurationSec)}</span>
            </div>
          </div>
        </div>

        {/* Workout Title & Tags */}
        <div className="workout-screen-item" style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                {activeRoutine.title.split(':')[0]}
              </h1>
              <p style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '2px' }}>
                Gain Power & Muscle
              </p>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                borderRadius: '14px',
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.07)' : '#FFFFFF',
                border: '1px solid rgba(220, 226, 230, 0.5)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-secondary)',
              }}
            >
              <Clock size={12} /> {activeRoutine.durationMin || 30} min
            </div>
          </div>

          {/* Rating & Category Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>
              <Star size={13} fill="#EAB308" color="#EAB308" /> 5.0
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11.5px', fontWeight: 700, color: 'var(--accent-purple)' }}>
              <Zap size={12} /> Power Pulse CODE®
            </span>
          </div>
        </div>

        {/* 3 Metric Cards Row (Matching Screen 3) */}
        <div
          className="workout-screen-item"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            flexShrink: 0,
          }}
        >
          {/* Card 1: Calories */}
          <div
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
              borderRadius: '20px',
              padding: '12px 10px',
              border: '1px solid rgba(220, 226, 230, 0.45)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <Flame size={13} color="var(--accent-orange)" /> Calories
            </div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
              {activeRoutine.caloriesBurned} <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)' }}>kcal</span>
            </div>
          </div>

          {/* Card 2: Heartrate */}
          <div
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
              borderRadius: '20px',
              padding: '12px 10px',
              border: '1px solid rgba(220, 226, 230, 0.45)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <Heart size={13} color="#F43F5E" /> Heartrate
            </div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
              120 <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)' }}>bpm</span>
            </div>
          </div>

          {/* Card 3: Exercise */}
          <div
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
              borderRadius: '20px',
              padding: '12px 10px',
              border: '1px solid rgba(220, 226, 230, 0.45)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <Clock size={13} color="var(--accent-cyan)" /> Exercise
            </div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
              25/{activeRoutine.durationMin || 30} <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)' }}>min</span>
            </div>
          </div>
        </div>

        {/* Description Paragraph */}
        <p
          className="workout-screen-item"
          style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            flexShrink: 0,
          }}
        >
          Desbloquea tu máximo potencial con entrenamientos guiados por IA, planes personalizados de fuerza e hipertrofia, seguimiento inteligente de repeticiones y descansos automáticos.
        </p>

        {/* Primary CTA Button: Join Now / Start Workout */}
        <button
          className="workout-screen-item"
          onClick={handleTogglePlay}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '26px',
            backgroundColor: 'var(--accent-purple)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '15px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(157, 123, 255, 0.4)',
            transition: 'transform 0.15s ease',
            flexShrink: 0,
          }}
        >
          {isRunning ? (
            <>
              <Pause size={18} fill="currentColor" /> Pausar Sesión
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" /> Comenzar Ahora
            </>
          )}
        </button>

        {/* Exercises Checklist */}
        <div className="workout-screen-item" style={{ flexShrink: 0, marginTop: '4px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            Ejercicios de la Rutina ({activeRoutine.exercises.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeRoutine.exercises.map((ex, idx) => {
              const isDone = completedExercises[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleExerciseDone(idx)}
                  style={{
                    backgroundColor: isDone
                      ? theme === 'dark' ? 'rgba(34, 197, 94, 0.12)' : '#F0FDF4'
                      : theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                    borderRadius: '18px',
                    padding: '12px 14px',
                    border: isDone
                      ? '1px solid rgba(34, 197, 94, 0.3)'
                      : '1px solid rgba(220, 226, 230, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: isDone ? 'var(--accent-green)' : 'rgba(200, 210, 220, 0.3)',
                        color: isDone ? '#FFFFFF' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {isDone ? <CheckCircle2 size={14} /> : idx + 1}
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: isDone ? 'var(--accent-green)' : 'var(--text-primary)',
                          textDecoration: isDone ? 'line-through' : 'none',
                        }}
                      >
                        {ex.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '1px' }}>
                        {ex.sets} series • {ex.reps} • Descanso {ex.restSec}s
                      </div>
                    </div>
                  </div>

                  <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {ex.target}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Finish Workout Action */}
        <button
          className="workout-screen-item"
          onClick={handleFinishWorkout}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '22px',
            backgroundColor: 'transparent',
            color: 'var(--accent-green)',
            border: '1.5px solid var(--accent-green)',
            fontSize: '13.5px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            flexShrink: 0,
            marginTop: '4px',
          }}
        >
          <CheckCircle2 size={16} /> Finalizar & Registrar Sesión
        </button>
      </div>
    </div>
  );
};
