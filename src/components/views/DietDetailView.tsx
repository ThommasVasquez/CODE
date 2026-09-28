'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IOSHeader } from './IOSHeader';
import { useApp, DietPlan } from '@/context/AppContext';
import { Utensils, Flame, Plus, CheckCircle, Calculator, ChevronRight, Apple, Sparkles } from 'lucide-react';

export const DietDetailView: React.FC = () => {
  const {
    dietPlans,
    activeDietPlan,
    setActiveDietPlan,
    calorieMetrics,
    logQuickMeal,
    pushView,
    t,
    theme,
  } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<DietPlan>(activeDietPlan || dietPlans[0]);
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [customMealName, setCustomMealName] = useState<string>('');
  const [customCalories, setCustomCalories] = useState<string>('450');
  const [customProtein, setCustomProtein] = useState<string>('30');
  const [customCarbs, setCustomCarbs] = useState<string>('40');
  const [customFat, setCustomFat] = useState<string>('12');

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.diet-card', {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    },
    { scope: containerRef, dependencies: [selectedPlan.id] }
  );

  const handleSelectPlan = (plan: DietPlan) => {
    setSelectedPlan(plan);
    setActiveDietPlan(plan);
  };

  const handleLogMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMealName.trim()) return;
    logQuickMeal(
      customMealName,
      Number(customCalories) || 0,
      Number(customProtein) || 0,
      Number(customCarbs) || 0,
      Number(customFat) || 0
    );
    setShowLogModal(false);
    setCustomMealName('');
  };

  const proteinPct = Math.min(100, Math.round((calorieMetrics.consumedProtein / calorieMetrics.targetProtein) * 100));
  const carbsPct = Math.min(100, Math.round((calorieMetrics.consumedCarbs / calorieMetrics.targetCarbs) * 100));
  const fatPct = Math.min(100, Math.round((calorieMetrics.consumedFat / calorieMetrics.targetFat) * 100));
  const caloriesPct = Math.min(100, Math.round((calorieMetrics.consumedCalories / calorieMetrics.targetCalories) * 100));

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
      <IOSHeader title={t('dietTitle')} subtitle={selectedPlan.name} />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Diet Plan Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {dietPlans.map((plan) => {
            const isSelected = plan.id === selectedPlan.id;
            return (
              <button
                key={plan.id}
                onClick={() => handleSelectPlan(plan)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: isSelected ? '1px solid var(--accent-orange)' : '1px solid rgba(220, 226, 230, 0.4)',
                  backgroundColor: isSelected ? 'var(--accent-orange)' : 'var(--card-white)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 3px 10px rgba(255, 106, 67, 0.3)' : 'var(--shadow-subtle)',
                }}
              >
                {plan.name.split(' ')[0]} {plan.name.includes('Proteína') ? 'Proteína' : plan.name.includes('Keto') ? 'Keto' : 'Longevidad'}
              </button>
            );
          })}
        </div>

        {/* Daily Macros Card */}
        <div
          className="diet-card"
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '28px',
            padding: '20px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(230, 235, 240, 0.35)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-orange)', textTransform: 'uppercase' }}>
                {t('todayNutrition')}
              </span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                {calorieMetrics.consumedCalories}{' '}
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  / {calorieMetrics.targetCalories} kcal
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowLogModal(true)}
              style={{
                backgroundColor: 'var(--card-peach)',
                border: '1px solid rgba(255, 106, 67, 0.3)',
                color: 'var(--accent-orange)',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '11.5px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
              }}
            >
              <Plus size={14} /> {t('logMeal')}
            </button>
          </div>

          {/* Macro Progress Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
            {/* Protein */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>
                <span style={{ color: 'var(--accent-orange)' }}>{t('protein')}</span>
                <span>{calorieMetrics.consumedProtein}g / {calorieMetrics.targetProtein}g ({proteinPct}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: theme === 'dark' ? '#1F2937' : '#F2F4F7', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${proteinPct}%`, height: '100%', backgroundColor: 'var(--accent-orange)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Carbs */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>{t('carbs')}</span>
                <span>{calorieMetrics.consumedCarbs}g / {calorieMetrics.targetCarbs}g ({carbsPct}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: theme === 'dark' ? '#1F2937' : '#F2F4F7', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${carbsPct}%`, height: '100%', backgroundColor: 'var(--accent-cyan)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Fat */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>
                <span style={{ color: 'var(--accent-green)' }}>{t('fats')}</span>
                <span>{calorieMetrics.consumedFat}g / {calorieMetrics.targetFat}g ({fatPct}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: theme === 'dark' ? '#1F2937' : '#F2F4F7', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${fatPct}%`, height: '100%', backgroundColor: 'var(--accent-green)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Selected Plan Details */}
        <div
          className="diet-card"
          style={{
            backgroundColor: 'var(--card-peach)',
            borderRadius: '24px',
            padding: '18px 20px',
            border: '1px solid rgba(255, 106, 67, 0.25)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--accent-orange)" />
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-orange)' }}>
              {selectedPlan.name}
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
            {selectedPlan.description}
          </p>
        </div>

        {/* Recommended Daily Meals */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            {t('meals')} ({selectedPlan.meals.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {selectedPlan.meals.map((meal, idx) => (
              <div
                key={idx}
                className="diet-card"
                style={{
                  backgroundColor: 'var(--card-white)',
                  borderRadius: '20px',
                  padding: '15px 16px',
                  boxShadow: 'var(--shadow-subtle)',
                  border: '1px solid rgba(220, 226, 230, 0.35)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--accent-orange)' }}>
                      {meal.mealTime}
                    </span>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1px' }}>
                      {meal.name}
                    </h4>
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: 'var(--accent-orange)',
                      backgroundColor: 'var(--card-peach)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                    }}
                  >
                    {meal.calories} kcal
                  </span>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                  {meal.description}
                </p>

                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  <span>P: <strong style={{ color: 'var(--text-primary)' }}>{meal.protein}g</strong></span>
                  <span>•</span>
                  <span>C: <strong style={{ color: 'var(--text-primary)' }}>{meal.carbs}g</strong></span>
                  <span>•</span>
                  <span>G: <strong style={{ color: 'var(--text-primary)' }}>{meal.fat}g</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shortcut to Calorie Calculator */}
        <div
          onClick={() => pushView('calorie-calc')}
          style={{
            backgroundColor: 'var(--card-white)',
            borderRadius: '22px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(220, 226, 230, 0.4)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--card-peach)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Calculator size={18} color="var(--accent-orange)" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('calorieCalcTitle')}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                {t('tdee')}: {calorieMetrics.tdee} kcal • Ajusta según tus metas
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="var(--text-muted)" />
        </div>
      </div>

      {/* Log Meal Modal */}
      {showLogModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--card-white)',
              borderRadius: '26px',
              padding: '24px 20px',
              width: '100%',
              maxWidth: '340px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
              color: 'var(--text-primary)',
            }}
          >
            <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '14px' }}>
              {t('logMeal')}
            </h3>

            <form onSubmit={handleLogMeal} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Nombre del Alimento / Plato
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Pechuga con arroz"
                  value={customMealName}
                  onChange={(e) => setCustomMealName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1px solid rgba(220, 226, 230, 0.6)',
                    backgroundColor: 'var(--device-bg)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    marginTop: '4px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Calorías (kcal)
                  </label>
                  <input
                    type="number"
                    value={customCalories}
                    onChange={(e) => setCustomCalories(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      border: '1px solid rgba(220, 226, 230, 0.6)',
                      backgroundColor: 'var(--device-bg)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      marginTop: '4px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Proteína (g)
                  </label>
                  <input
                    type="number"
                    value={customProtein}
                    onChange={(e) => setCustomProtein(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      border: '1px solid rgba(220, 226, 230, 0.6)',
                      backgroundColor: 'var(--device-bg)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      marginTop: '4px',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '18px',
                    backgroundColor: 'var(--device-bg)',
                    color: 'var(--text-secondary)',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '18px',
                    backgroundColor: 'var(--accent-orange)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
