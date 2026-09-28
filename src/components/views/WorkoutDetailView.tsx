'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IOSHeader } from './IOSHeader';
import { useApp, WorkoutRoutine } from '@/context/AppContext';
import { Dumbbell, Play, Pause, RotateCcw, CheckCircle2, Flame, Clock, Award, ChevronRight, Zap } from 'lucide-react';

export const WorkoutDetailView: React.FC = () => {
  const {
    workoutRoutines,
    selectedRoutine,
    setSelectedRoutine,
    logWorkoutSession,
    completedWorkoutsCount,
    workoutSchedule,
    pushView,
    t,
    theme,
  } = useApp();

  const [activeRoutine, setActiveRoutine] = useState<WorkoutRoutine>(selectedRoutine || workoutRoutines[0]);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);

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
      gsap.from('.workout-card', {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
      });
    },
    { scope: containerRef, dependencies: [activeRoutine.id] }
  );

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleExerciseDone = (index: number) => {
    setCompletedExercises((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleFinishWorkout = () => {
    const duration = Math.max(1, Math.round(timerSeconds / 60)) || activeRoutine.durationMin;
    logWorkoutSession(activeRoutine.title, duration, activeRoutine.caloriesBurned);
    setIsRunning(false);
    setTimerSeconds(0);
    setCompletedExercises(new Array(activeRoutine.exercises.length).fill(false));
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
      <IOSHeader title={t('workoutsTitle')} subtitle={activeRoutine.category} />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Routine Selector Carousel / Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {workoutRoutines.map((routine) => {
            const isSelected = routine.id === activeRoutine.id;
            return (
              <button
                key={routine.id}
                onClick={() => {
                  setActiveRoutine(routine);
                  setSelectedRoutine(routine);
                  setIsRunning(false);
                  setTimerSeconds(0);
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: isSelected ? '1px solid var(--accent-green)' : '1px solid rgba(220, 226, 230, 0.4)',
                  backgroundColor: isSelected ? 'var(--accent-green)' : 'var(--card-white)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 3px 10px rgba(115, 169, 50, 0.3)' : 'var(--shadow-subtle)',
                }}
              >
                {routine.title.split(':')[0]}
              </button>
            );
          })}
        </div>

        {/* Live Active Workout Hero & Timer Card */}
        <div
          className="workout-card"
          style={{
            background: 'linear-gradient(135deg, #1A2619 0%, #0E1611 100%)',
            borderRadius: '28px',
            padding: '22px 20px',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(115, 169, 50, 0.22)',
            border: '1px solid rgba(162, 226, 133, 0.2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                  color: '#A2E285',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Zap size={12} color="#A2E285" />
                {t('sessionActive')}
              </span>
              <h2 style={{ fontSize: '19px', fontWeight: 800, marginTop: '4px', lineHeight: 1.25 }}>
                {activeRoutine.title}
              </h2>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                {activeRoutine.muscleGroup}
              </p>
            </div>

            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(162, 226, 133, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(162, 226, 133, 0.3)',
              }}
            >
              <Dumbbell size={20} color="#A2E285" />
            </div>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              marginTop: '16px',
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <div>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Clock size={11} /> {t('duration')}
              </span>
              <div style={{ fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>
                {activeRoutine.durationMin}m
              </div>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Flame size={11} color="#FF8A65" /> {t('calories')}
              </span>
              <div style={{ fontSize: '15px', fontWeight: 700, marginTop: '2px', color: '#FFB199' }}>
                {activeRoutine.caloriesBurned}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Award size={11} color="#A2E285" /> {t('level')}
              </span>
              <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '3px', color: '#A2E285' }}>
                {activeRoutine.level}
              </div>
            </div>
          </div>

          {/* Live Workout Chronometer & Control Bar */}
          <div
            style={{
              marginTop: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '14px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div>
              <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                {isRunning ? '⏱️ Cronómetro en Vivo' : 'Tiempo de Sesión'}
              </div>
              <div style={{ fontSize: '26px', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '1px', color: '#A2E285' }}>
                {formatTimer(timerSeconds)}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setTimerSeconds(0)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                title="Reiniciar temporizador"
              >
                <RotateCcw size={15} />
              </button>

              <button
                onClick={() => setIsRunning(!isRunning)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '24px',
                  backgroundColor: isRunning ? '#E74C3C' : 'var(--accent-green)',
                  border: 'none',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s ease',
                }}
              >
                {isRunning ? (
                  <>
                    <Pause size={15} /> {t('pauseTimer')}
                  </>
                ) : (
                  <>
                    <Play size={15} fill="#FFFFFF" /> {t('startTimer')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Exercises Breakdown List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('exercises')} ({activeRoutine.exercises.length})
            </h3>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {completedExercises.filter(Boolean).length} / {activeRoutine.exercises.length} completados
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeRoutine.exercises.map((exercise, index) => {
              const isDone = completedExercises[index];
              return (
                <div
                  key={index}
                  className="workout-card"
                  onClick={() => toggleExerciseDone(index)}
                  style={{
                    backgroundColor: isDone
                      ? (theme === 'dark' ? '#132317' : '#F1F9EE')
                      : 'var(--card-white)',
                    borderRadius: '20px',
                    padding: '14px 16px',
                    boxShadow: 'var(--shadow-subtle)',
                    border: isDone
                      ? '1px solid rgba(115, 169, 50, 0.4)'
                      : '1px solid rgba(220, 226, 230, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isDone ? 'var(--accent-green)' : (theme === 'dark' ? '#1F2937' : '#EFF3F6'),
                        color: isDone ? '#FFFFFF' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: 800,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isDone ? <CheckCircle2 size={18} /> : index + 1}
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: isDone ? 'var(--accent-green)' : 'var(--text-primary)',
                          textDecoration: isDone ? 'line-through' : 'none',
                        }}
                      >
                        {exercise.name}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{exercise.sets}</span> • {exercise.reps} • {exercise.restSec}s pausa
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '10.5px',
                      padding: '4px 8px',
                      borderRadius: '10px',
                      backgroundColor: theme === 'dark' ? '#1F2937' : '#F3F4F6',
                      color: 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    {exercise.target}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Complete Workout CTA Button */}
        <button
          onClick={handleFinishWorkout}
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
            marginTop: '8px',
            transition: 'transform 0.15s ease',
          }}
        >
          <CheckCircle2 size={18} />
          {t('finishWorkout')}
        </button>

        {/* Shortcut to Reminders & Schedule */}
        <div
          onClick={() => pushView('workout-reminders')}
          style={{
            backgroundColor: 'var(--card-lime)',
            borderRadius: '20px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid var(--card-lime-border)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={18} color="var(--accent-green)" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {t('workoutReminders')}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                {workoutSchedule.days.join(', ')} • {workoutSchedule.time}
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="var(--text-muted)" />
        </div>
      </div>
    </div>
  );
};
