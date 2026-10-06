'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp, WorkoutExercise } from '@/context/AppContext';
import {
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  Flame,
  Volume2,
  VolumeX,
  Compass,
} from 'lucide-react';

// Predefined exercise kinematics configurations
interface ExerciseKinematicConfig {
  id: string;
  name: string;
  category: string;
  targetMuscles: string[];
  secondaryMuscles: string[];
  primaryActivation: number; // percentage
  secondaryActivation: number;
  coreActivation: number;
  tempo: string; // e.g. "3-1-1-0"
  cues: string[];
  mistakes: string[];
  kneeIdealAngle: number;
  hipIdealAngle: number;
}

const KINEMATIC_DATABASE: Record<string, ExerciseKinematicConfig> = {
  squat: {
    id: 'squat',
    name: 'Sentadilla Profunda Biomecánica',
    category: 'Tren Inferior & Fuerza',
    targetMuscles: ['Cuádriceps', 'Glúteo Mayor'],
    secondaryMuscles: ['Isquiotibiales', 'Erectores Espinales'],
    primaryActivation: 96,
    secondaryActivation: 84,
    coreActivation: 78,
    tempo: '3-1-1-0 (3s bajada • 1s pausa • 1s subida)',
    cues: [
      'Inicia el movimiento retrasando la cadera como sentándote en una silla.',
      'Mantén el pecho erguido y la columna en posición neutra durante todo el recorrido.',
      'Rompe el paralelo: la cadera debe descender ligeramente por debajo de la rótula.',
      'Empuja el suelo con toda la planta del pie, haciendo foco en los talones al subir.',
    ],
    mistakes: [
      'Colapso de rodillas hacia adentro (valgo dinámico).',
      'Despegar los talones del suelo al descender.',
      'Flexionar excesivamente la zona lumbar (guiño de glúteo prematuro).',
    ],
    kneeIdealAngle: 90,
    hipIdealAngle: 45,
  },
  bench: {
    id: 'bench',
    name: 'Press de Pecho / Fondos Estrictos',
    category: 'Torso & Hipertrofia',
    targetMuscles: ['Pectoral Mayor', 'Pectoral Clavicular'],
    secondaryMuscles: ['Deltoides Anterior', 'Tríceps Braquial'],
    primaryActivation: 94,
    secondaryActivation: 82,
    coreActivation: 70,
    tempo: '2-1-1-0 (2s descenso • 1s contracción)',
    cues: [
      'Retrae y deprime activamente las escápulas fijándolas contra el respaldo.',
      'Mantén los codos en ángulo de 45° con respecto al torso (no a 90° para cuidar el hombro).',
      'Baja hasta rozar suavemente la línea inferior del pecho.',
      'Empuja explosivamente apretando los pectorales en el punto más alto.',
    ],
    mistakes: [
      'Apertura excesiva de codos en cruz a 90° lesionando el manguito rotador.',
      'Rebotar el peso o despegar la espalda de la superficie.',
      'No bloquear las muñecas en posición neutra.',
    ],
    kneeIdealAngle: 90,
    hipIdealAngle: 180,
  },
  shoulder: {
    id: 'shoulder',
    name: 'Press Militar de Hombros',
    category: 'Deltoides & Empuje Vertical',
    targetMuscles: ['Deltoides Anterior', 'Deltoides Medio'],
    secondaryMuscles: ['Tríceps', 'Trapecio Superior'],
    primaryActivation: 95,
    secondaryActivation: 78,
    coreActivation: 85,
    tempo: '2-1-1-0 (Control total de bajada)',
    cues: [
      'Glúteos y abdomen fuertemente apretados para blindar la zona lumbar.',
      'Comienza con las mancuernas a la altura de la clavícula y codos ligeramente hacia adelante.',
      'Empuja en línea vertical recta pasando justo por delante del rostro.',
      'Bloquea los codos arriba con la cabeza ligeramente adelantada bajo el peso.',
    ],
    mistakes: [
      'Arquear la espalda baja hacia atrás en exceso para compensar el peso.',
      'Descender sólo un cuarto de recorrido sin tocar el rango clavicular.',
      'Empujar los pesos hacia adelante en lugar de directamente hacia arriba.',
    ],
    kneeIdealAngle: 180,
    hipIdealAngle: 180,
  },
  lateral: {
    id: 'lateral',
    name: 'Elevaciones Laterales de Hombro',
    category: 'Aislamiento & Definición',
    targetMuscles: ['Deltoides Lateral (Cabeza Media)'],
    secondaryMuscles: ['Trapecio', 'Antebrazo'],
    primaryActivation: 98,
    secondaryActivation: 45,
    coreActivation: 60,
    tempo: '2-2-1-0 (2s subida • 2s pausa isométrica)',
    cues: [
      'Ligera inclinación del torso hacia adelante (10°) para alinear el plano escapular.',
      'Codos con flexión fija de 15°, elevando como si vertieras agua de una jarra.',
      'Detén la subida exactamente a la altura de los hombros (90°).',
      'Frena la bajada resistiendo activamente la gravedad en 2 a 3 segundos.',
    ],
    mistakes: [
      'Usar impulso de cadera y rodillas balanceando el cuerpo.',
      'Elevar los brazos por encima de las orejas activando sólo el trapecio.',
      'Dejar caer los brazos sin control en la fase negativa.',
    ],
    kneeIdealAngle: 175,
    hipIdealAngle: 170,
  },
  burpee: {
    id: 'burpee',
    name: 'Burpee Reactivo Dinámico',
    category: 'HIIT & Potencia Metabólica',
    targetMuscles: ['Full Body', 'Cadena Posterior'],
    secondaryMuscles: ['Pectorales', 'Cuádriceps', 'Core'],
    primaryActivation: 92,
    secondaryActivation: 90,
    coreActivation: 95,
    tempo: '1-0-1-0 (Máxima velocidad explosiva)',
    cues: [
      'Baja a sentadilla rápida y apoya ambas palmas firmemente en el suelo.',
      'Lanza los pies hacia atrás en un salto fluido hasta posición de plancha.',
      'Roza el pecho con el suelo y empuja de inmediato hacia arriba.',
      'Recoge los pies de un salto bajo la cadera y salta verticalmente batiendo palmas.',
    ],
    mistakes: [
      'Dejar caer la cadera hacia el suelo en la plancha arqueando la cintura.',
      'Aterrizar con las piernas rígidas en vez de amortiguar flexionando las rodillas.',
      'Descuidar la respiración perdiendo ritmo en la tercera repetición.',
    ],
    kneeIdealAngle: 120,
    hipIdealAngle: 110,
  },
  plank: {
    id: 'plank',
    name: 'Plancha Dinámica Isométrica',
    category: 'Core Profundo & Estabilidad',
    targetMuscles: ['Transverso Abdominal', 'Recto Abdominal'],
    secondaryMuscles: ['Glúteos', 'Deltoides', 'Serratos'],
    primaryActivation: 98,
    secondaryActivation: 75,
    coreActivation: 100,
    tempo: 'Isométrico continuo (Tensión constante)',
    cues: [
      'Codos apoyados justo debajo de los hombros a 90°.',
      'Cuerpo en línea recta perfecta desde la coronilla hasta los talones.',
      'Retroversión pélvica activa: mete el ombligo hacia la columna y aprieta glúteos.',
      'Respira de forma fluida y rítmica sin aguantar el aire.',
    ],
    mistakes: [
      'Cadera hundida hacia el suelo cargando presión en las lumbares.',
      'Elevar los glúteos en forma de pirámide perdiendo tensión en el abdomen.',
      'Colapsar los omóplatos dejando caer el pecho.',
    ],
    kneeIdealAngle: 180,
    hipIdealAngle: 180,
  },
};

function matchExerciseToConfig(exerciseName: string): ExerciseKinematicConfig {
  const lower = exerciseName.toLowerCase();
  if (lower.includes('sentadilla') || lower.includes('squat') || lower.includes('pierna') || lower.includes('glúteo') || lower.includes('búlgar')) {
    return KINEMATIC_DATABASE.squat;
  }
  if (lower.includes('press banca') || lower.includes('pecho') || lower.includes('fondo') || lower.includes('flexi') || lower.includes('push')) {
    return KINEMATIC_DATABASE.bench;
  }
  if (lower.includes('militar') || lower.includes('overhead') || lower.includes('hombro')) {
    return KINEMATIC_DATABASE.shoulder;
  }
  if (lower.includes('lateral') || lower.includes('elevaci') || lower.includes('vuelos')) {
    return KINEMATIC_DATABASE.lateral;
  }
  if (lower.includes('burpee') || lower.includes('hiit') || lower.includes('salto') || lower.includes('jump') || lower.includes('climb')) {
    return KINEMATIC_DATABASE.burpee;
  }
  if (lower.includes('plancha') || lower.includes('core') || lower.includes('hollow') || lower.includes('abdom')) {
    return KINEMATIC_DATABASE.plank;
  }
  return KINEMATIC_DATABASE.squat;
}

export const ExerciseCoachAvatarView: React.FC = () => {
  const {
    popView,
    selectedRoutine,
    workoutRoutines,
    exerciseCoachTarget,
    setExerciseCoachTarget,
    showToast,
    theme,
  } = useApp();

  const routine = selectedRoutine || workoutRoutines[0];
  const routineExercises = routine?.exercises || [];

  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0); // 0.5x, 1.0x, 1.5x
  const [viewAngle, setViewAngle] = useState<'profile' | 'front'>('profile');
  const [audioCue, setAudioCue] = useState<boolean>(true);
  const [repsCount, setRepsCount] = useState<number>(0);

  // Animation cycle progress: 0.0 to 1.0
  const [cycleProgress, setCycleProgress] = useState<number>(0);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Determine current active exercise
  useEffect(() => {
    if (exerciseCoachTarget) {
      const idx = routineExercises.findIndex((e) => e.name === exerciseCoachTarget.name);
      if (idx !== -1) setActiveExerciseIndex(idx);
    }
  }, [exerciseCoachTarget, routineExercises]);

  const currentExercise = routineExercises[activeExerciseIndex] || {
    name: 'Sentadillas Profundas con Sobrecarga',
    sets: '4 series',
    reps: '10-12 reps',
    restSec: 90,
    target: 'Cuádriceps & Cadena Posterior',
  };

  const config = matchExerciseToConfig(currentExercise.name);

  // Animation loop running at configurable speed
  useEffect(() => {
    let currentP = 0;
    let localReps = 0;

    const animate = (time: number) => {
      if (lastTimeRef.current !== null && isPlaying) {
        const delta = (time - lastTimeRef.current) / 1000;
        // Base cycle time is 3.5 seconds
        const cycleDuration = 3.5 / speedMultiplier;
        const progressIncrement = delta / cycleDuration;
        currentP = (currentP + progressIncrement) % 1.0;

        if (currentP < progressIncrement) {
          localReps += 1;
          setRepsCount((r) => r + 1);
        }

        setCycleProgress(currentP);
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = null;
    };
  }, [isPlaying, speedMultiplier]);

  // Exercise Phase calculation
  // 0 -> 0.45: Descenso Excéntrico (Inhala)
  // 0.45 -> 0.55: Punto de Tensión Máxima (Pausa 1s)
  // 0.55 -> 1.0: Ascenso Concéntrico (Exhala)
  const isEccentric = cycleProgress < 0.45;
  const isPeak = cycleProgress >= 0.45 && cycleProgress < 0.55;
  const isConcentric = cycleProgress >= 0.55;

  const phaseTitle = isEccentric
    ? 'Fase 1: Descenso Excéntrico'
    : isPeak
    ? 'Tensión Pico (Isometría)'
    : 'Fase 2: Ascenso Concéntrico';

  const breathCue = isEccentric ? 'Inhala Profundo 🌬️' : isPeak ? 'Mantén Tensión 🔒' : 'Exhala con Fuerza 💨';
  const phaseColor = isEccentric ? '#38BDF8' : isPeak ? '#FACC15' : '#22C55E';

  // Biomechanical Angle calculations based on cycleProgress
  // We use smooth sine interpolation
  const sineVal = Math.sin(cycleProgress * Math.PI); // 0 at top, 1 at bottom, 0 at top
  const kneeLiveAngle = Math.round(180 - sineVal * (180 - config.kneeIdealAngle));
  const hipLiveAngle = Math.round(180 - sineVal * (180 - config.hipIdealAngle));

  const handleSelectExercise = (idx: number, ex: WorkoutExercise) => {
    setActiveExerciseIndex(idx);
    setExerciseCoachTarget(ex);
    setRepsCount(0);
    showToast(`Mostrando técnica: ${ex.name}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#090C11',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Top Header Navigation */}
      <div
        style={{
          padding: '16px 18px 12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(9, 12, 17, 0.85)',
          backdropFilter: 'blur(20px)',
          zIndex: 30,
        }}
      >
        <button
          onClick={popView}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
          }}
          title="Volver"
        >
          <ChevronLeft size={20} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              color: '#38BDF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <Sparkles size={11} /> AVATAR COACH 3D • GUÍA DE TÉCNICA
          </div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', marginTop: '1px' }}>
            {routine.title}
          </div>
        </div>

        <button
          onClick={() => setAudioCue(!audioCue)}
          style={{
            background: audioCue ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.08)',
            border: audioCue ? '1px solid rgba(56, 189, 248, 0.4)' : 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: audioCue ? '#38BDF8' : '#94A3B8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title={audioCue ? 'Guía sonora activa' : 'Sonido silenciado'}
        >
          {audioCue ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* Routine Exercises Horizontal Carousel */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '10px 16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          backgroundColor: '#0E131C',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          flexShrink: 0,
        }}
      >
        {routineExercises.map((ex, idx) => {
          const isActive = idx === activeExerciseIndex;
          return (
            <button
              key={idx}
              onClick={() => handleSelectExercise(idx, ex)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '16px',
                border: isActive ? '1.5px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: isActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                fontSize: '11px',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? '#38BDF8' : 'rgba(255, 255, 255, 0.12)',
                  color: isActive ? '#090C11' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9.5px',
                  fontWeight: 900,
                }}
              >
                {idx + 1}
              </span>
              <span>{ex.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area: Avatar Simulation + Biomechanical HUD */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 16px 20px 16px',
          gap: '14px',
        }}
      >
        {/* Animated Avatar Stage Card */}
        <div
          style={{
            marginTop: '12px',
            borderRadius: '26px',
            background: 'linear-gradient(180deg, #131824 0%, #0B0E15 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '270px',
            flexShrink: 0,
          }}
        >
          {/* Subtle Cyber Grid Background in stage */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 65%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 20px 20px, 20px 20px',
              pointerEvents: 'none',
            }}
          />

          {/* Floating HUD Badges on Stage */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '14px',
              right: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            {/* Phase pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '14px',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${phaseColor}`,
                fontSize: '10.5px',
                fontWeight: 800,
                color: phaseColor,
                boxShadow: `0 0 12px ${phaseColor}33`,
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: phaseColor,
                  animation: 'pulse 1.5s infinite',
                }}
              />
              {phaseTitle}
            </div>

            {/* Rep Counter Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '14px',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontSize: '11px',
                fontWeight: 800,
                color: '#FFFFFF',
              }}
            >
              <Zap size={12} color="#FACC15" /> Reps: <span style={{ color: '#FACC15' }}>{repsCount}</span>
            </div>
          </div>

          {/* SVG Animated Biomechanical Coach Avatar Canvas */}
          <div
            style={{
              width: '100%',
              height: '210px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 2,
              marginTop: '10px',
            }}
          >
            <CoachAvatarSVG
              exerciseId={config.id}
              cycleProgress={cycleProgress}
              viewAngle={viewAngle}
              phaseColor={phaseColor}
            />

            {/* Floor Stage Spotlight Oval */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                width: '140px',
                height: '14px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.25) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 80%)',
                filter: 'blur(3px)',
                zIndex: 1,
              }}
            />
          </div>

          {/* Stage Bottom Floating Controls Bar */}
          <div
            style={{
              width: '100%',
              padding: '8px 14px 12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              backgroundColor: 'rgba(10, 14, 22, 0.7)',
              zIndex: 10,
            }}
          >
            {/* Speed Multiplier */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0.5, 1.0, 1.5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSpeedMultiplier(spd)}
                  style={{
                    padding: '3px 7px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: speedMultiplier === spd ? '#38BDF8' : 'rgba(255, 255, 255, 0.08)',
                    color: speedMultiplier === spd ? '#090C11' : '#94A3B8',
                    fontSize: '9.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                  title={`Velocidad ${spd}x`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Play / Pause Primary Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 14px',
                borderRadius: '18px',
                border: 'none',
                backgroundColor: isPlaying ? 'rgba(255, 255, 255, 0.12)' : '#22C55E',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: isPlaying ? 'none' : '0 4px 14px rgba(34, 197, 94, 0.4)',
                transition: 'all 0.2s ease',
              }}
            >
              {isPlaying ? (
                <>
                  <Pause size={12} fill="currentColor" /> Pausar
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" /> Reanudar
                </>
              )}
            </button>

            {/* View Angle Switcher: Profile vs Frontal */}
            <button
              onClick={() => setViewAngle(viewAngle === 'profile' ? 'front' : 'profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 9px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#CBD5E1',
                fontSize: '10px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              title="Cambiar perspectiva de cámara"
            >
              <Compass size={11} color="#38BDF8" /> {viewAngle === 'profile' ? 'Perfil' : 'Frente'}
            </button>
          </div>
        </div>

        {/* Dynamic Breath & Cadence Card */}
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
              Respiración y Ritmo de Ejecución
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: phaseColor, marginTop: '2px' }}>
              {breathCue}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
              Tempo Recomendado
            </div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
              {config.tempo}
            </div>
          </div>
        </div>

        {/* Live Biomechanical Joint Angles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: '10px',
              borderRadius: '18px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '9.5px', color: '#94A3B8', fontWeight: 700 }}>Ángulo Rodilla</div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: '#38BDF8', marginTop: '2px' }}>
              {kneeLiveAngle}°
            </div>
            <div style={{ fontSize: '9px', color: '#64748B' }}>Meta: {config.kneeIdealAngle}°</div>
          </div>

          <div
            style={{
              padding: '10px',
              borderRadius: '18px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '9.5px', color: '#94A3B8', fontWeight: 700 }}>Ángulo Cadera</div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: '#FACC15', marginTop: '2px' }}>
              {hipLiveAngle}°
            </div>
            <div style={{ fontSize: '9px', color: '#64748B' }}>Meta: {config.hipIdealAngle}°</div>
          </div>

          <div
            style={{
              padding: '10px',
              borderRadius: '18px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '9.5px', color: '#94A3B8', fontWeight: 700 }}>Columna Espinal</div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: '#22C55E', marginTop: '2px' }}>
              Neutra
            </div>
            <div style={{ fontSize: '9px', color: '#64748B' }}>Alineada 100%</div>
          </div>
        </div>

        {/* Real-time Muscle Activation Heatmap */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '22px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: '11.5px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Flame size={14} color="#F43F5E" /> Activación Muscular en Tiempo Real
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Primary Muscle */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', marginBottom: '3px' }}>
                <span style={{ color: '#E2E8F0', fontWeight: 700 }}>
                  Primario: {config.targetMuscles.join(' • ')}
                </span>
                <span style={{ color: '#F43F5E', fontWeight: 800 }}>{config.primaryActivation}%</span>
              </div>
              <div style={{ width: '100%', height: '5px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '3px' }}>
                <div
                  style={{
                    width: `${config.primaryActivation}%`,
                    height: '100%',
                    backgroundColor: '#F43F5E',
                    borderRadius: '3px',
                    boxShadow: '0 0 8px rgba(244, 63, 94, 0.6)',
                  }}
                />
              </div>
            </div>

            {/* Secondary Muscle */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', marginBottom: '3px' }}>
                <span style={{ color: '#CBD5E1', fontWeight: 600 }}>
                  Secundario: {config.secondaryMuscles.join(' • ')}
                </span>
                <span style={{ color: '#38BDF8', fontWeight: 800 }}>{config.secondaryActivation}%</span>
              </div>
              <div style={{ width: '100%', height: '5px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '3px' }}>
                <div
                  style={{
                    width: `${config.secondaryActivation}%`,
                    height: '100%',
                    backgroundColor: '#38BDF8',
                    borderRadius: '3px',
                  }}
                />
              </div>
            </div>

            {/* Core Stability */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', marginBottom: '3px' }}>
                <span style={{ color: '#94A3B8', fontWeight: 600 }}>Core Estabilizador</span>
                <span style={{ color: '#22C55E', fontWeight: 800 }}>{config.coreActivation}%</span>
              </div>
              <div style={{ width: '100%', height: '5px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '3px' }}>
                <div
                  style={{
                    width: `${config.coreActivation}%`,
                    height: '100%',
                    backgroundColor: '#22C55E',
                    borderRadius: '3px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coach Instructions Checklist (Checkpoints de Técnica) */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '22px',
            backgroundColor: 'rgba(34, 197, 94, 0.05)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: '11.5px',
              fontWeight: 800,
              color: '#22C55E',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CheckCircle2 size={14} /> Puntos Clave de Ejecución Correcta
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {config.cues.map((cue, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11px', color: '#E2E8F0' }}>
                <span style={{ color: '#22C55E', fontWeight: 800, marginTop: '1px' }}>✓</span>
                <span style={{ lineHeight: '1.4' }}>{cue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes to Avoid */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '22px',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: '11.5px',
              fontWeight: 800,
              color: '#EF4444',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <AlertCircle size={14} /> Errores Comunes a Evitar
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {config.mistakes.map((err, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11px', color: '#E2E8F0' }}>
                <span style={{ color: '#EF4444', fontWeight: 800, marginTop: '1px' }}>✕</span>
                <span style={{ lineHeight: '1.4' }}>{err}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Continue Workout */}
        <button
          onClick={() => {
            showToast('¡Técnica aprendida! Volviendo a la rutina');
            popView();
          }}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(56, 189, 248, 0.35)',
            marginTop: '4px',
            flexShrink: 0,
          }}
        >
          <CheckCircle2 size={16} /> Entendido • Continuar Rutina ({activeExerciseIndex + 1}/{routineExercises.length})
        </button>
      </div>
    </div>
  );
};

// ==========================================
// KINEMATIC SVG ATHLETIC AVATAR RENDERER
// ==========================================

interface CoachAvatarSVGProps {
  exerciseId: string;
  cycleProgress: number; // 0.0 to 1.0
  viewAngle: 'profile' | 'front';
  phaseColor: string;
}

const CoachAvatarSVG: React.FC<CoachAvatarSVGProps> = ({
  exerciseId,
  cycleProgress,
  viewAngle,
  phaseColor,
}) => {
  // Sine curve: 0 at start, 1 at peak, 0 at end
  const s = Math.sin(cycleProgress * Math.PI);

  if (exerciseId === 'squat') {
    // SQUAT KINEMATICS
    // In profile view:
    // Pelvis moves down by s * 52px and backward by s * 16px
    const hipY = 100 + s * 50;
    const hipX = 130 - s * 14;
    // Torso tilts forward: angle increases with s
    const headX = 130 + s * 16;
    const headY = 45 + s * 45;
    // Knee moves slightly forward:
    const kneeX = 158 + s * 6;
    const kneeY = 145 + s * 10;
    // Feet remain planted on floor at (150, 195)
    const footX = 148;
    const footY = 195;
    // Arms extend forward to balance:
    const handX = 175 + s * 18;
    const handY = 85 + s * 30;

    return (
      <svg width="240" height="210" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid floor reference line */}
        <line x1="60" y1="200" x2="210" y2="200" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Ghost reference skeleton at top position */}
        <path
          d="M 130 50 L 130 100 L 158 145 L 148 195"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Athletic Pelvis & Shorts */}
        <circle cx={hipX} cy={hipY} r="14" fill="#1E293B" stroke={phaseColor} strokeWidth="2" filter="url(#glow)" />

        {/* Thigh (Cuádriceps) with active neon biomechanics */}
        <line
          x1={hipX}
          y1={hipY}
          x2={kneeX}
          y2={kneeY}
          stroke="#F43F5E"
          strokeWidth="12"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        {/* Core highlight stripe inside thigh */}
        <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

        {/* Knee Joint */}
        <circle cx={kneeX} cy={kneeY} r="7" fill="#38BDF8" />

        {/* Calf (Pierna baja / Gemelos) */}
        <line
          x1={kneeX}
          y1={kneeY}
          x2={footX}
          y2={footY}
          stroke="#38BDF8"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Athletic Sneaker planted firmly on ground */}
        <path d={`M ${footX - 14} ${footY} L ${footX + 16} ${footY} L ${footX + 10} ${footY - 6} Z`} fill="#F8FAFC" />

        {/* Torso & Spine */}
        <line
          x1={hipX}
          y1={hipY}
          x2={headX - 6}
          y2={headY + 22}
          stroke="#0EA5E9"
          strokeWidth="14"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Arms counter-balancing */}
        <line
          x1={headX - 4}
          y1={headY + 24}
          x2={handX}
          y2={handY}
          stroke="#94A3B8"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Clenched Hands */}
        <circle cx={handX} cy={handY} r="6" fill="#FACC15" />

        {/* Athletic Head & Jawline */}
        <circle cx={headX} cy={headY} r="13" fill="#F1F5F9" />
        {/* Athletic Visor / Eye band */}
        <rect x={headX} y={headY - 4} width="14" height="6" rx="2" fill="#38BDF8" />

        {/* Dynamic Joint Angle Indicator Ring at Knee */}
        <circle
          cx={kneeX}
          cy={kneeY}
          r="16"
          stroke={phaseColor}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
        />
      </svg>
    );
  }

  if (exerciseId === 'bench') {
    // INCLINE BENCH PRESS KINEMATICS
    // Barbell / Dumbbell height: presses from chest (130) up to lockout (85)
    // s = 0 at start/top, s = 1 at chest bottom
    const barY = 88 + s * 42; // at top: 88, at chest: 130
    const elbowX = 142 + s * 16;
    const elbowY = 125 + s * 14;

    return (
      <svg width="250" height="210" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glowBench" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Floor reference */}
        <line x1="30" y1="200" x2="230" y2="200" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Incline Gym Bench Structure */}
        {/* Support legs */}
        <line x1="80" y1="186" x2="80" y2="200" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        <line x1="150" y1="152" x2="150" y2="200" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        {/* Bench base frame */}
        <line x1="70" y1="200" x2="165" y2="200" stroke="#334155" strokeWidth="3" />
        {/* Incline Padded Backrest */}
        <line x1="78" y1="188" x2="175" y2="136" stroke="#1E293B" strokeWidth="12" strokeLinecap="round" />
        <line x1="78" y1="188" x2="175" y2="136" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />

        {/* Athlete Legs: Hips at (90, 180) -> Knee at (70, 160) -> Foot at (55, 200) */}
        <line x1="90" y1="180" x2="72" y2="165" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />
        <line x1="72" y1="165" x2="60" y2="200" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />
        {/* Sneaker */}
        <path d="M 48 200 L 68 200 L 64 195 Z" fill="#F8FAFC" />

        {/* Athlete Torso resting on incline pad */}
        <line x1="92" y1="180" x2="150" y2="148" stroke="#0EA5E9" strokeWidth="14" strokeLinecap="round" filter="url(#glowBench)" />

        {/* Athlete Head resting back */}
        <circle cx="166" cy="138" r="12" fill="#F1F5F9" />
        <rect x="160" y="134" width="12" height="5" rx="2" fill="#38BDF8" />

        {/* Pectoral Muscle Activation Glow */}
        <circle cx="138" cy="148" r="10" fill="#F43F5E" opacity={0.5 + s * 0.5} filter="url(#glowBench)" />

        {/* Arms Articulating: Shoulder (142, 146) -> Elbow (elbowX, elbowY) -> Hand (140, barY) */}
        <line x1="142" y1="146" x2={elbowX} y2={elbowY} stroke="#F43F5E" strokeWidth="8" strokeLinecap="round" filter="url(#glowBench)" />
        <line x1={elbowX} y1={elbowY} x2="140" y2={barY} stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />

        {/* Hands Gripping Bar */}
        <circle cx="140" cy={barY} r="6" fill="#FACC15" />

        {/* Dumbbell / Barbell Bar with Weights */}
        <line x1="108" y1={barY} x2="172" y2={barY} stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
        {/* Left Weight Plate */}
        <rect x="104" y={barY - 14} width="8" height="28" rx="3" fill="#F43F5E" filter="url(#glowBench)" />
        <rect x="99" y={barY - 10} width="5" height="20" rx="2" fill="#EF4444" />
        {/* Right Weight Plate */}
        <rect x="168" y={barY - 14} width="8" height="28" rx="3" fill="#F43F5E" filter="url(#glowBench)" />
        <rect x="176" y={barY - 10} width="5" height="20" rx="2" fill="#EF4444" />

        {/* Trajectory Guide Dots */}
        <line x1="140" y1="88" x2="140" y2="130" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" strokeDasharray="2 3" />
      </svg>
    );
  }

  if (exerciseId === 'shoulder' || exerciseId === 'lateral') {
    // OVERHEAD PRESS OR LATERAL DELTOID RAISES
    const isLateral = exerciseId === 'lateral';
    // Arms sweep from sides (down) to overhead or to 90 degrees
    const armAngle = isLateral ? s * 80 : s * 140; // in degrees
    const rad = (armAngle * Math.PI) / 180;

    // Shoulder anchor at (105, 80) and (155, 80)
    // Left hand
    const lHandX = 105 - Math.sin(rad) * (isLateral ? 55 : 65);
    const lHandY = 80 - (isLateral ? Math.cos(rad) * 15 - s * 35 : Math.cos(rad) * 65);
    // Right hand
    const rHandX = 155 + Math.sin(rad) * (isLateral ? 55 : 65);
    const rHandY = 80 - (isLateral ? Math.cos(rad) * 15 - s * 35 : Math.cos(rad) * 65);

    return (
      <svg width="240" height="210" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glowShoulder" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Floor */}
        <line x1="60" y1="195" x2="200" y2="195" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Legs upright */}
        <line x1="118" y1="125" x2="114" y2="195" stroke="#38BDF8" strokeWidth="10" strokeLinecap="round" />
        <line x1="142" y1="125" x2="146" y2="195" stroke="#38BDF8" strokeWidth="10" strokeLinecap="round" />

        {/* Pelvis & Shorts */}
        <rect x="110" y="115" width="40" height="22" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />

        {/* Torso */}
        <line x1="130" y1="80" x2="130" y2="120" stroke="#0EA5E9" strokeWidth="18" strokeLinecap="round" />

        {/* Head */}
        <circle cx="130" cy="50" r="14" fill="#F1F5F9" />
        <rect x="122" y="46" width="16" height="5" rx="2" fill="#38BDF8" />

        {/* Left Arm with Dumbbell */}
        <line x1="110" y1="78" x2={lHandX} y2={lHandY} stroke="#F43F5E" strokeWidth="8" strokeLinecap="round" filter="url(#glowShoulder)" />
        {/* Dumbbell Left */}
        <rect x={lHandX - 8} y={lHandY - 6} width="16" height="12" rx="3" fill="#FACC15" />

        {/* Right Arm with Dumbbell */}
        <line x1="150" y1="78" x2={rHandX} y2={rHandY} stroke="#F43F5E" strokeWidth="8" strokeLinecap="round" filter="url(#glowShoulder)" />
        {/* Dumbbell Right */}
        <rect x={rHandX - 8} y={rHandY - 6} width="16" height="12" rx="3" fill="#FACC15" />

        {/* Deltoid muscle glowing pads */}
        <circle cx="106" cy="78" r="8" fill="#F43F5E" opacity={0.6 + s * 0.4} filter="url(#glowShoulder)" />
        <circle cx="154" cy="78" r="8" fill="#F43F5E" opacity={0.6 + s * 0.4} filter="url(#glowShoulder)" />
      </svg>
    );
  }

  // DEFAULT / HIIT BURPEE / PLANK
  // Dynamic animated human stick biomechanics
  const plankDrop = s * 40;
  return (
    <svg width="240" height="210" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glowPlank" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <line x1="40" y1="180" x2="220" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Rigid horizontal spine */}
      <line x1="65" y1="160" x2="165" y2={160 + plankDrop * 0.3} stroke="#22C55E" strokeWidth="12" strokeLinecap="round" filter="url(#glowPlank)" />

      {/* Head */}
      <circle cx="185" cy={155 + plankDrop * 0.3} r="12" fill="#F1F5F9" />

      {/* Elbow support */}
      <line x1="160" y1={160 + plankDrop * 0.3} x2="160" y2="180" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />

      {/* Feet */}
      <line x1="65" y1="160" x2="55" y2="180" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />

      {/* Core Energy Pulse Ring */}
      <circle
        cx="115"
        cy={160 + plankDrop * 0.3}
        r={14 + s * 6}
        stroke="#22C55E"
        strokeWidth="2"
        fill="rgba(34, 197, 94, 0.2)"
        filter="url(#glowPlank)"
      />
    </svg>
  );
};
