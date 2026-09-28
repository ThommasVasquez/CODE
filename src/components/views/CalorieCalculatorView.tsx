'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IOSHeader } from './IOSHeader';
import { useApp, CalorieMetrics } from '@/context/AppContext';
import { Calculator, Flame, Dumbbell, Target, CheckCircle2, Sparkles, Scale, Activity } from 'lucide-react';

export const CalorieCalculatorView: React.FC = () => {
  const {
    calorieMetrics,
    calculateAndSetCalorieMetrics,
    pushView,
    t,
    theme,
  } = useApp();

  const [weight, setWeight] = useState<number>(calorieMetrics.weightKg || 76);
  const [height, setHeight] = useState<number>(calorieMetrics.heightCm || 178);
  const [age, setAge] = useState<number>(calorieMetrics.age || 34);
  const [activity, setActivity] = useState<CalorieMetrics['activityLevel']>(calorieMetrics.activityLevel || 'moderate');
  const [goal, setGoal] = useState<CalorieMetrics['goal']>(calorieMetrics.goal || 'fat_loss');

  const containerRef = useRef<HTMLDivElement>(null);

  // Real-time calculation previews
  const bmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725,
  };
  const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.55));
  let targetCalories = tdee;
  if (goal === 'fat_loss') targetCalories -= 450;
  if (goal === 'muscle_gain') targetCalories += 350;

  const targetProtein = Math.round(weight * 2.1);
  const targetFat = Math.round(weight * 0.9);
  const remainingCal = Math.max(0, targetCalories - (targetProtein * 4 + targetFat * 9));
  const targetCarbs = Math.round(remainingCal / 4);

  useGSAP(
    () => {
      gsap.from('.calc-card', {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const handleApply = () => {
    calculateAndSetCalorieMetrics(weight, height, age, activity, goal);
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
      <IOSHeader title={t('calorieCalcTitle')} subtitle={t('tdeeBmr')} />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Real-Time Result Banner */}
        <div
          className="calc-card"
          style={{
            background: 'linear-gradient(135deg, #1C2430 0%, #0F141C 100%)',
            borderRadius: '26px',
            padding: '20px',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(48, 164, 168, 0.25)',
            border: '1px solid rgba(48, 164, 168, 0.3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#30A4A8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Meta Calórica Recomendada
              </span>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', marginTop: '2px' }}>
                {targetCalories}{' '}
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#30A4A8' }}>kcal / día</span>
              </div>
            </div>

            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(48, 164, 168, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Flame size={20} color="#30A4A8" />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div>
              <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.6)' }}>{t('bmr')}</span>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>{bmr} kcal</div>
            </div>
            <div>
              <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.6)' }}>{t('tdee')}</span>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>{tdee} kcal</div>
            </div>
          </div>

          {/* Macro Split Preview */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              marginTop: '12px',
              padding: '10px',
              borderRadius: '14px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '10px', color: '#FF9E80', fontWeight: 700 }}>Proteínas</div>
              <div style={{ fontSize: '15px', fontWeight: 800, marginTop: '2px' }}>{targetProtein}g</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#80DEEA', fontWeight: 700 }}>Carbos</div>
              <div style={{ fontSize: '15px', fontWeight: 800, marginTop: '2px' }}>{targetCarbs}g</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#C5E1A5', fontWeight: 700 }}>Grasas</div>
              <div style={{ fontSize: '15px', fontWeight: 800, marginTop: '2px' }}>{targetFat}g</div>
            </div>
          </div>
        </div>

        {/* Input Parameters Card */}
        <div
          className="calc-card"
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '26px',
            padding: '20px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Datos Biométricos
          </h3>

          {/* Weight */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              <span>{t('weight')}</span>
              <span style={{ color: 'var(--accent-cyan)' }}>{weight} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="150"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
            />
          </div>

          {/* Height */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              <span>{t('height')}</span>
              <span style={{ color: 'var(--accent-cyan)' }}>{height} cm</span>
            </div>
            <input
              type="range"
              min="130"
              max="220"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
            />
          </div>

          {/* Age */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              <span>{t('age')}</span>
              <span style={{ color: 'var(--accent-cyan)' }}>{age} años</span>
            </div>
            <input
              type="range"
              min="16"
              max="90"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Activity Level Selector */}
        <div
          className="calc-card"
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '26px',
            padding: '20px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.35)',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            {t('activityLevel')}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { id: 'sedentary', label: 'Sedentario', desc: 'Poco o ningún ejercicio' },
              { id: 'light', label: 'Ligero', desc: '1-3 días / sem' },
              { id: 'moderate', label: 'Moderado', desc: '3-5 días / sem' },
              { id: 'very_active', label: 'Muy Activo', desc: '6-7 días intensos' },
            ].map((lvl) => {
              const isSelected = activity === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setActivity(lvl.id as CalorieMetrics['activityLevel'])}
                  style={{
                    padding: '12px 10px',
                    borderRadius: '16px',
                    border: isSelected ? '1.5px solid var(--accent-cyan)' : '1px solid rgba(220, 226, 230, 0.4)',
                    backgroundColor: isSelected ? 'var(--card-cyan)' : 'var(--device-bg)',
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                    {lvl.label}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {lvl.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Goal Selector */}
        <div
          className="calc-card"
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '26px',
            padding: '20px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.35)',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            {t('fitnessGoal')}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'fat_loss', label: 'Pérdida de Grasa (Déficit -450 kcal)', color: 'var(--accent-orange)' },
              { id: 'maintenance', label: 'Mantenimiento & Longevidad', color: 'var(--accent-cyan)' },
              { id: 'muscle_gain', label: 'Ganancia Muscular (Superávit +350 kcal)', color: 'var(--accent-green)' },
            ].map((g) => {
              const isSelected = goal === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id as CalorieMetrics['goal'])}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '16px',
                    border: isSelected ? `1.5px solid ${g.color}` : '1px solid rgba(220, 226, 230, 0.4)',
                    backgroundColor: isSelected ? (theme === 'dark' ? '#1F2937' : '#F9FBFC') : 'var(--device-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: isSelected ? 800 : 600, color: 'var(--text-primary)' }}>
                    {g.label}
                  </span>
                  {isSelected && <CheckCircle2 size={16} color={g.color} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apply CTA Button */}
        <button
          onClick={handleApply}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '24px',
            backgroundColor: 'var(--accent-cyan)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '15px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(48, 164, 168, 0.35)',
            transition: 'transform 0.15s ease',
          }}
        >
          <CheckCircle2 size={18} />
          {t('calculateAndSave')}
        </button>
      </div>
    </div>
  );
};
