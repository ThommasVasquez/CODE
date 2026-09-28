'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Dumbbell,
  Flame,
  Clock,
  Zap,
  Play,
  Calendar,
  Utensils,
  ChevronRight,
  Bell,
  Sparkles,
  Award,
  Disc,
  User,
  Timer,
  Scale,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const HomeScreen: React.FC = () => {
  const {
    profile,
    workoutRoutines,
    selectedRoutine,
    setSelectedRoutine,
    activeDietPlan,
    fastingState,
    workoutSchedule,
    calorieMetrics,
    workoutComplianceRate,
    dietComplianceRate,
    pillsRemain,
    totalPills,
    adherenceRate,
    setActiveTab,
    pushView,
    t,
    theme,
  } = useApp();

  const containerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const widgetsGridRef = useRef<HTMLDivElement>(null);
  const dietCardRef = useRef<HTMLDivElement>(null);
  const scheduleCardRef = useRef<HTMLDivElement>(null);

  const todayWorkout = selectedRoutine || workoutRoutines[0];
  const fastingPercent = Math.min(100, Math.round((fastingState.elapsedHours / fastingState.targetHours) * 100));

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.fade-header', {
        y: -15,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
      })
      .from(heroCardRef.current, {
        scale: 0.95,
        y: 20,
        opacity: 0,
        duration: 0.55,
      }, '-=0.25')
      .from(widgetsGridRef.current, {
        y: 18,
        opacity: 0,
        duration: 0.5,
      }, '-=0.3')
      .from([dietCardRef.current, scheduleCardRef.current], {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
      }, '-=0.25');
    },
    { scope: containerRef }
  );

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
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '4px' }}>
        <div>
          <h1
            className="fade-header"
            style={{
              fontSize: '24px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {t('hello')} {profile.name} <span>👋</span>
          </h1>
          <p
            className="fade-header"
            style={{
              fontSize: '12.5px',
              color: 'var(--text-secondary)',
              marginTop: '2px',
              fontWeight: 500,
            }}
          >
            {t('fitnessHeaderSubtitle')}
          </p>
        </div>

        {/* Header Actions: Next Workout Alarm & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Quick Workout Reminder Badge */}
          <div
            className="fade-header"
            onClick={() => pushView('workout-reminders')}
            style={{
              backgroundColor: 'var(--card-lime)',
              border: '1px solid var(--card-lime-border)',
              borderRadius: '20px',
              padding: '4px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(115, 169, 50, 0.12)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
            title="Ver recordatorios de entrenamiento"
          >
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-green)', lineHeight: 1.1 }}>
              {workoutSchedule.time}
            </span>
            <span style={{ fontSize: '8.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {t('alarm')}
            </span>
          </div>

          {/* Quick Profile Settings Button */}
          <button
            className="fade-header"
            onClick={() => setActiveTab('options')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--card-white)',
              border: '1px solid rgba(220, 226, 230, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-subtle)',
              transition: 'transform 0.2s ease',
            }}
            title="Ajustes de Perfil"
          >
            <User size={17} color="var(--text-primary)" />
          </button>
        </div>
      </div>

      {/* Hero Card: Today's Recommended Workout */}
      <div
        ref={heroCardRef}
        onClick={() => pushView('workout-detail')}
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #162417 0%, #0D160E 100%)'
            : 'linear-gradient(135deg, #1C281B 0%, #111A12 100%)',
          borderRadius: '28px',
          padding: '22px 20px',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 28px rgba(115, 169, 50, 0.25)',
          border: '1px solid rgba(162, 226, 133, 0.25)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        {/* Glow ambient background sphere */}
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(162, 226, 133, 0.35) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '12px',
                backgroundColor: 'rgba(162, 226, 133, 0.18)',
                color: '#A2E285',
                fontSize: '10.5px',
                fontWeight: 800,
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
              }}
            >
              <Zap size={12} color="#A2E285" />
              {t('todayWorkout')}
            </div>

            <h2
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#FFFFFF',
                marginTop: '8px',
                lineHeight: 1.25,
                letterSpacing: '-0.3px',
              }}
            >
              {todayWorkout.title}
            </h2>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '3px' }}>
              {todayWorkout.muscleGroup}
            </p>
          </div>

          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(162, 226, 133, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(162, 226, 133, 0.3)',
              flexShrink: 0,
            }}
          >
            <Dumbbell size={22} color="#A2E285" />
          </div>
        </div>

        {/* Metrics Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <Clock size={13} color="#A2E285" /> {todayWorkout.durationMin} min
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <Flame size={13} color="#FF9E80" /> {todayWorkout.caloriesBurned} kcal
          </span>
          <span>•</span>
          <span style={{ fontWeight: 600, color: '#A2E285' }}>
            {todayWorkout.exercisesCount} {t('exercises')}
          </span>
        </div>

        {/* Action Button */}
        <div
          style={{
            marginTop: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              padding: '10px 18px',
              borderRadius: '20px',
              backgroundColor: 'var(--accent-green)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(115, 169, 50, 0.4)',
            }}
          >
            <Play size={14} fill="#FFFFFF" />
            {t('startWorkout')}
          </div>

          <span style={{ fontSize: '11.5px', color: '#A2E285', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
            Ver rutina <ChevronRight size={14} />
          </span>
        </div>
      </div>

      {/* Dual Widgets: Intermittent Fasting & Calorie Balance */}
      <div
        ref={widgetsGridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
        }}
      >
        {/* Left: Intermittent Fasting Widget */}
        <div
          onClick={() => pushView('fasting-detail')}
          style={{
            backgroundColor: 'var(--card-cyan)',
            borderRadius: '24px',
            padding: '16px 14px',
            border: '1px solid var(--card-cyan-border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          title="Ver ayuno intermitente"
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                {t('fastingTitle')}
              </span>
              <Timer size={14} color="var(--accent-cyan)" />
            </div>

            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
              {fastingState.elapsedHours}h{' '}
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                / {fastingState.targetHours}h
              </span>
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Protocolo {fastingState.plan} ({fastingPercent}%)
            </div>
          </div>

          {/* Mini progress bar */}
          <div style={{ marginTop: '12px' }}>
            <div
              style={{
                width: '100%',
                height: '7px',
                backgroundColor: theme === 'dark' ? '#1F2937' : 'rgba(255,255,255,0.7)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${fastingPercent}%`,
                  height: '100%',
                  backgroundColor: 'var(--accent-cyan)',
                  borderRadius: '4px',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', color: 'var(--accent-cyan)', fontWeight: 700, marginTop: '4px' }}>
              <span>{fastingState.isFasting ? '🔥 En Cetosis' : 'Ventana abierta'}</span>
              <ChevronRight size={10} />
            </div>
          </div>
        </div>

        {/* Right: Calories & Macro Balance Widget */}
        <div
          onClick={() => pushView('calorie-calc')}
          style={{
            backgroundColor: 'var(--card-peach)',
            borderRadius: '24px',
            padding: '16px 14px',
            border: '1px solid rgba(255, 106, 67, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          title="Ver calculadora y balance calórico"
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-orange)' }}>
                {t('calories')}
              </span>
              <Flame size={14} color="var(--accent-orange)" />
            </div>

            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
              {calorieMetrics.consumedCalories}{' '}
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                / {calorieMetrics.targetCalories} kcal
              </span>
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Quemadas: <strong style={{ color: 'var(--accent-orange)' }}>{calorieMetrics.burnedCalories} kcal</strong>
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            {/* Protein mini bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', fontWeight: 700, marginBottom: '3px' }}>
              <span style={{ color: 'var(--accent-orange)' }}>Prot: {calorieMetrics.consumedProtein}g / {calorieMetrics.targetProtein}g</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '7px',
                backgroundColor: theme === 'dark' ? '#1F2937' : 'rgba(255,255,255,0.7)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, Math.round((calorieMetrics.consumedProtein / calorieMetrics.targetProtein) * 100))}%`,
                  height: '100%',
                  backgroundColor: 'var(--accent-orange)',
                  borderRadius: '4px',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '9.5px', color: 'var(--accent-orange)', fontWeight: 700, marginTop: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>Calculadora <ChevronRight size={10} /></span>
            </div>
          </div>
        </div>
      </div>

      {/* Diets & Nutrition Recommendation Card */}
      <div
        ref={dietCardRef}
        onClick={() => pushView('diet-detail')}
        style={{
          backgroundColor: 'var(--card-white)',
          borderRadius: '26px',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid rgba(220, 226, 230, 0.4)',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        title="Abrir planes de dieta"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-orange)', textTransform: 'uppercase' }}>
              {t('dietTitle')} • Plan Recomendado
            </span>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {activeDietPlan.name}
            </h3>
          </div>

          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--card-peach)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Utensils size={18} color="var(--accent-orange)" />
          </div>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
          {activeDietPlan.tagline}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid rgba(220, 226, 230, 0.3)',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
            <span>P: <strong style={{ color: 'var(--text-primary)' }}>{activeDietPlan.proteinGrams}g</strong></span>
            <span>•</span>
            <span>C: <strong style={{ color: 'var(--text-primary)' }}>{activeDietPlan.carbsGrams}g</strong></span>
            <span>•</span>
            <span>G: <strong style={{ color: 'var(--text-primary)' }}>{activeDietPlan.fatGrams}g</strong></span>
          </div>

          <span style={{ fontSize: '11.5px', color: 'var(--accent-orange)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
            Ver comidas <ChevronRight size={13} />
          </span>
        </div>
      </div>

      {/* Workout Reminders & Schedule Bar */}
      <div
        ref={scheduleCardRef}
        onClick={() => pushView('workout-reminders')}
        style={{
          backgroundColor: 'var(--card-lime)',
          borderRadius: '24px',
          padding: '16px 18px',
          border: '1px solid var(--card-lime-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        title="Gestionar recordatorios de ejercicios"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--card-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(115, 169, 50, 0.15)',
            }}
          >
            <Bell size={18} color="var(--accent-green)" />
          </div>

          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('workoutReminders')} ({workoutSchedule.time})
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '1px' }}>
              {workoutSchedule.days.join(', ')} • Meta: {workoutSchedule.completedThisWeek}/{workoutSchedule.weeklyTarget}
            </div>
          </div>
        </div>

        <ChevronRight size={16} color="var(--text-muted)" />
      </div>

      {/* Medication & Supplement Routine Card (Preserved Secondary Feature) */}
      <div
        onClick={() => pushView('medication-detail')}
        style={{
          backgroundColor: 'var(--card-white)',
          borderRadius: '24px',
          padding: '16px 18px',
          boxShadow: 'var(--shadow-subtle)',
          border: '1px solid rgba(220, 226, 230, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        title="Ver suplementos y pastillas"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--card-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Disc size={18} color="var(--accent-cyan)" />
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('medication')} & Suplementos
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              {pillsRemain}/{totalPills} dosis restantes • {adherenceRate}% adherencia
            </div>
          </div>
        </div>

        <span style={{ fontSize: '11.5px', color: 'var(--accent-cyan)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
          Control <ChevronRight size={13} />
        </span>
      </div>
    </div>
  );
};
