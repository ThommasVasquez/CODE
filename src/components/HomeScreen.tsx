'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Flame,
  Utensils,
  ChevronRight,
  Bell,
  Sparkles,
  Disc,
  Timer,
  ArrowUpRight,
  Heart,
  Menu,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const HomeScreen: React.FC = () => {
  const {
    profile,
    workoutRoutines,
    selectedRoutine,
    activeDietPlan,
    fastingState,
    workoutSchedule,
    calorieMetrics,
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

  const [selectedDateIdx, setSelectedDateIdx] = useState<number>(3); // Wednesday 16 default
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const todayWorkout = selectedRoutine || workoutRoutines[0];
  const fastingPercent = Math.min(100, Math.round((fastingState.elapsedHours / fastingState.targetHours) * 100));

  const weekDays = [
    { day: 'Sun', date: 13 },
    { day: 'Mon', date: 14 },
    { day: 'Tue', date: 15 },
    { day: 'Wed', date: 16 },
    { day: 'Thu', date: 17 },
    { day: 'Fri', date: 18 },
    { day: 'Sat', date: 19 },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'fat-loss', label: 'Fat Loss' },
    { id: 'yoga', label: 'Yoga' },
    { id: 'strength', label: 'Strength' },
    { id: 'muscle', label: 'Muscle' },
    { id: 'cardio', label: 'Cardio' },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.fade-header', {
        y: -12,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        clearProps: 'transform,opacity',
      })
      .from('.ai-assistant-card', {
        scale: 0.96,
        y: 15,
        opacity: 0,
        duration: 0.45,
        clearProps: 'transform,opacity',
      }, '-=0.25')
      .from('.calendar-strip', {
        y: 12,
        opacity: 0,
        duration: 0.4,
        clearProps: 'transform,opacity',
      }, '-=0.2')
      .from(heroCardRef.current, {
        scale: 0.95,
        y: 18,
        opacity: 0,
        duration: 0.5,
        clearProps: 'transform,opacity',
      }, '-=0.25')
      .from(widgetsGridRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.45,
        clearProps: 'transform,opacity',
      }, '-=0.25')
      .from([dietCardRef.current, scheduleCardRef.current], {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.45,
        clearProps: 'transform,opacity',
      }, '-=0.2');
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '12px 18px 105px 18px',
        overflowY: 'auto',
        height: '100%',
        color: 'var(--text-primary)',
        background: theme === 'dark'
          ? 'linear-gradient(180deg, #151124 0%, #0F131E 130px, var(--device-bg) 280px)'
          : 'linear-gradient(180deg, #EBF1FF 0%, #F4EEFF 110px, var(--device-bg) 260px)',
      }}
    >
      {/* Top Header: User Profile + Notifications + Menu */}
      <div
        className="fade-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2px',
          flexShrink: 0,
        }}
      >
        {/* User Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            onClick={() => setActiveTab('options')}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              flexShrink: 0,
            }}
            title="Ver perfil"
          >
            <Image
              src={profile.avatarUrl || '/avatar.jpg'}
              alt={profile.name}
              fill
              sizes="40px"
              unoptimized
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
              Hello <span>👋</span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15 }}>
              {profile.name}
            </div>
          </div>
        </div>

        {/* Action Buttons: Bell & Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Notification Bell */}
          <button
            onClick={() => pushView('workout-reminders')}
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
              position: 'relative',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              color: 'var(--text-primary)',
            }}
            title="Recordatorios & Notificaciones"
          >
            <Bell size={17} />
            <span
              style={{
                position: 'absolute',
                top: '9px',
                right: '9px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-purple)',
              }}
            />
          </button>

          {/* Settings / Menu */}
          <button
            onClick={() => setActiveTab('options')}
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
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              color: 'var(--text-primary)',
            }}
            title="Ajustes de Perfil"
          >
            <Menu size={17} />
          </button>
        </div>
      </div>

      {/* AI Fitness Assistant Banner Card */}
      <div
        className="ai-assistant-card"
        onClick={() => pushView('workout-detail')}
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          borderRadius: '26px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid rgba(200, 190, 240, 0.4)',
          boxShadow: '0 6px 20px -4px rgba(157, 123, 255, 0.15)',
          cursor: 'pointer',
          flexShrink: 0,
        }}
        title="Abrir entrenador IA"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* 3D Glowing Iridescent Sphere */}
          <div
            style={{
              position: 'relative',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(168, 85, 247, 0.35)',
            }}
          >
            <Image
              src="/ai_orb.jpg"
              alt="AI Sphere"
              fill
              sizes="44px"
              unoptimized
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              AI Fitness Assistant
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 500 }}>
              Smarter daily workouts.
            </div>
          </div>
        </div>

        {/* Circular Action Button */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: theme === 'dark' ? '#2A203F' : '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            border: '1px solid rgba(157, 123, 255, 0.25)',
            color: 'var(--accent-purple)',
            flexShrink: 0,
          }}
        >
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Horizontal Interactive Calendar Strip */}
      <div
        className="calendar-strip"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '4px',
          flexShrink: 0,
          padding: '2px 0',
        }}
      >
        {weekDays.map((item, idx) => {
          const isSelected = selectedDateIdx === idx;
          return (
            <div
              key={item.day}
              onClick={() => setSelectedDateIdx(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isSelected ? '8px 5px 6px 5px' : '6px 5px',
                borderRadius: isSelected ? '26px' : '20px',
                backgroundColor: isSelected
                  ? 'var(--accent-purple)'
                  : theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                boxShadow: isSelected
                  ? '0 6px 16px rgba(157, 123, 255, 0.4)'
                  : '0 2px 6px rgba(0,0,0,0.03)',
                border: isSelected
                  ? 'none'
                  : '1px solid rgba(220, 226, 230, 0.5)',
                cursor: 'pointer',
                flex: 1,
                maxWidth: '46px',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  marginBottom: '5px',
                }}
              >
                {item.day}
              </span>

              {/* Number Circle Badge */}
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isSelected ? '#1E1B4B' : 'var(--text-primary)',
                  fontSize: '13px',
                  fontWeight: 800,
                  boxShadow: isSelected ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {item.date}
              </div>
            </div>
          );
        })}
      </div>

      {/* Horizontal Category Filter Pills */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '2px',
          flexShrink: 0,
          scrollbarWidth: 'none',
        }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '7px 16px',
                borderRadius: '20px',
                backgroundColor: isSelected
                  ? theme === 'dark' ? '#F8FAFC' : '#111827'
                  : theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
                color: isSelected
                  ? theme === 'dark' ? '#0F172A' : '#FFFFFF'
                  : 'var(--text-secondary)',
                border: isSelected
                  ? 'none'
                  : '1px solid rgba(220, 226, 230, 0.6)',
                fontSize: '12px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 3px 8px rgba(0,0,0,0.15)' : 'none',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Featured Hero Card: AI Powers Your Muscle Growth */}
      <div
        ref={heroCardRef}
        onClick={() => pushView('workout-detail')}
        style={{
          backgroundColor: '#131722',
          borderRadius: '28px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 12px 32px rgba(10, 14, 25, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          cursor: 'pointer',
          flexShrink: 0,
        }}
        title="Ver entrenamiento completo"
      >
        {/* Top Multi-color Rainbow Gradient Line */}
        <div
          style={{
            height: '4px',
            width: '100%',
            background: 'linear-gradient(90deg, #FDE047 0%, #F472B6 35%, #38BDF8 70%, #A855F7 100%)',
          }}
        />

        <div style={{ padding: '20px 20px 22px 20px', position: 'relative' }}>
          {/* Top Row: Time Badge + Favorite Heart */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                padding: '5px 11px',
                borderRadius: '16px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              <Timer size={13} /> {todayWorkout.durationMin || 25} min
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: isFavorite ? '#F43F5E' : 'rgba(255, 255, 255, 0.8)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
              }}
              title="Guardar favorito"
            >
              <Heart size={18} fill={isFavorite ? '#F43F5E' : 'none'} />
            </button>
          </div>

          {/* Athlete Cutout Photography Positioned Right */}
          <div
            style={{
              position: 'absolute',
              right: '0',
              bottom: '0',
              width: '150px',
              height: '170px',
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/hero_athlete.jpg"
              alt="Fitness Athlete"
              fill
              sizes="150px"
              unoptimized
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
            {/* Soft dark gradient fade on the left edge */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, #131722 0%, rgba(19, 23, 34, 0.4) 30%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Left Hero Typography */}
          <div style={{ maxWidth: '62%', marginTop: '16px' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-0.3px',
              }}
            >
              AI <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>Powers</span>
              <br />
              Your Muscle
              <br />
              Growth
            </h2>

            <p style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '6px' }}>
              Smarter Muscle Growth.
            </p>

            {/* Bottom-left Arrow Button */}
            <div
              style={{
                marginTop: '18px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              }}
            >
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Dual Widgets: Intermittent Fasting & Calorie Balance */}
      <div
        ref={widgetsGridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          flexShrink: 0,
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
            flexShrink: 0,
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
            flexShrink: 0,
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
          flexShrink: 0,
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
          flexShrink: 0,
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

      {/* Medication & Supplement Routine Card */}
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
          flexShrink: 0,
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
