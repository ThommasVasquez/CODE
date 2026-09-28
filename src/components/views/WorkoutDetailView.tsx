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
        y: 16,
        opacity: 0,
        stagger: 0.06,
        duration: 0.45,
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

  const totalDurationSec = 30 * 60; // 30:00 matching reference
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
    logWorkoutSession('Build Strength Gain Power', 30, 1230);
    setIsRunning(false);
    showToast('¡Sesión registrada con éxito!');
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme === 'dark' ? '#090C10' : '#F9FAFC',
        overflowY: 'auto',
        paddingBottom: '90px',
        color: 'var(--text-primary)',
        minWidth: 0,
        width: '100%',
      }}
    >
      {/* Navigation Top Bar (Matching Screen 3) */}
      <div
        className="workout-screen-item"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 18px 8px 18px',
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
            border: '1px solid rgba(220, 226, 230, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            color: 'var(--text-primary)',
          }}
          title="Volver"
        >
          <ChevronLeft size={19} />
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
            border: '1px solid rgba(220, 226, 230, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            color: 'var(--text-primary)',
          }}
          title="Más opciones"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      <div style={{ padding: '0 18px 24px 18px', display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0, width: '100%' }}>
        {/* Video / Workout Player Card (Identical to Screen 3 in reference image) */}
        <div
          className="workout-screen-item"
          style={{
            position: 'relative',
            width: '100%',
            height: '260px',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            backgroundColor: '#F1F4F9',
            flexShrink: 0,
            border: '1px solid rgba(220, 226, 235, 0.8)',
          }}
        >
          {/* Trainer Athlete with Barbell on Shoulders */}
          <Image
            src="/trainer_squat.jpg"
            alt="Workout Trainer Squat"
            fill
            sizes="380px"
            unoptimized
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'center 32%',
            }}
          />

          {/* Centered Timer / Pause Badge ("00" on black pill on chest matching Screen 3) */}
          <button
            onClick={handleTogglePlay}
            style={{
              position: 'absolute',
              top: '46%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(20, 24, 33, 0.88)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
              transition: 'transform 0.15s ease',
              fontFamily: 'monospace',
              fontSize: '17px',
              fontWeight: 800,
            }}
            title={isRunning ? 'Pausar' : '00'}
          >
            {isRunning ? <Pause size={20} fill="currentColor" /> : '00'}
          </button>

          {/* Bottom Player Controls & Scrubber Bar on White/Translucent Glass */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              padding: '10px 16px 12px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.95) 100%)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Control Icons Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#1E293B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={() => setTimerSeconds(0)}
                  style={{ background: 'none', border: 'none', color: '#334155', cursor: 'pointer', display: 'flex' }}
                  title="Reiniciar"
                >
                  <SkipBack size={16} />
                </button>
                <button
                  onClick={handleTogglePlay}
                  style={{ background: 'none', border: 'none', color: '#334155', cursor: 'pointer', display: 'flex' }}
                  title="Pausar / Continuar"
                >
                  {isRunning ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Sparkles size={16} color="var(--accent-purple)" style={{ cursor: 'pointer' }} />
                <button
                  onClick={() => setVolumeOn(!volumeOn)}
                  style={{ background: 'none', border: 'none', color: '#334155', cursor: 'pointer', display: 'flex' }}
                  title="Volumen"
                >
                  <Volume2 size={16} style={{ opacity: volumeOn ? 1 : 0.4 }} />
                </button>
                <Maximize2 size={15} color="#334155" style={{ cursor: 'pointer' }} />
              </div>
            </div>

            {/* Scrubber Timeline Bar */}
            <div style={{ position: 'relative', width: '100%', height: '4px', backgroundColor: 'rgba(148, 163, 184, 0.25)', borderRadius: '2px' }}>
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: '#A78BFA',
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
                    border: '1.5px solid #A78BFA',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  }}
                />
              </div>
            </div>

            {/* Time Indicators */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', fontWeight: 700 }}>
              <span>{formatTimer(timerSeconds)}</span>
              <span>30:00</span>
            </div>
          </div>
        </div>

        {/* Title & Tags (Build Strength Gain Power) */}
        <div className="workout-screen-item" style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                Build Strength
                <br />
                Gain Power
              </h1>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 11px',
                borderRadius: '16px',
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.07)' : '#FFFFFF',
                border: '1px solid rgba(220, 226, 230, 0.55)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              }}
            >
              <Clock size={12} /> 30 min
            </div>
          </div>

          {/* Rating & Category Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>
              <Star size={13} fill="#EAB308" color="#EAB308" /> 5.0
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11.5px', fontWeight: 700, color: 'var(--accent-purple)' }}>
              <Zap size={12} /> Power Pulse
            </span>
          </div>
        </div>

        {/* 3 Metric Cards Row (Matching Screen 3) */}
        <div
          className="workout-screen-item"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            flexShrink: 0,
            width: '100%',
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
            <div style={{ fontSize: '14.5px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
              1230 <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)' }}>kcal</span>
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
            <div style={{ fontSize: '14.5px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
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
            <div style={{ fontSize: '14.5px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
              25/30 <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)' }}>min</span>
            </div>
          </div>
        </div>

        {/* Description Paragraph (Exact text from reference Screen 3) */}
        <p
          className="workout-screen-item"
          style={{
            fontSize: '11.5px',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            flexShrink: 0,
          }}
        >
          Unlock your full potential with AI-powered workouts, personalized training plans, smart progress tracking, and expert guidance to build strength, endurance, and confidence. 🔥💪
        </p>

        {/* Primary CTA Button: Join Now (Lilac / Purple Pill) */}
        <button
          className="workout-screen-item"
          onClick={handleTogglePlay}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #C4B5FD 0%, #A78BFA 50%, #8B5CF6 100%)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '15.5px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(167, 139, 250, 0.4)',
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
              Join Now
            </>
          )}
        </button>

        {/* Routine Exercises Checklist */}
        <div className="workout-screen-item" style={{ flexShrink: 0, marginTop: '4px' }}>
          <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
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
                        width: '24px',
                        height: '24px',
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
                      {isDone ? <CheckCircle2 size={13} /> : idx + 1}
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: isDone ? 'var(--accent-green)' : 'var(--text-primary)',
                          textDecoration: isDone ? 'line-through' : 'none',
                        }}
                      >
                        {ex.name}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '1px' }}>
                        {ex.sets} • {ex.reps} • Descanso {ex.restSec}s
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
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <CheckCircle2 size={16} /> Finalizar & Registrar Sesión
        </button>
      </div>
    </div>
  );
};
