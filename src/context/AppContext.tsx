'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/utils/translations';

export type MainTab = 'home' | 'statistics' | 'options';
export type SubView = 
  | null 
  | 'medication-detail' 
  | 'wellness-detail' 
  | 'diary' 
  | 'settings' 
  | 'subscriptions' 
  | 'health-base' 
  | 'scan' 
  | 'edit-profile'
  | 'workout-detail'
  | 'diet-detail'
  | 'fasting-detail'
  | 'calorie-calc'
  | 'workout-reminders';

export interface PatientProfile {
  name: string;
  deviceId: string;
  patientId: string;
  age: number;
  email: string;
  phone: string;
  residence: string;
  avatarUrl: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  time: string;
  title: string;
  notes: string;
  status: 'taken' | 'missed' | 'wellness' | 'workout' | 'fasting';
  vital?: string;
}

export interface WorkoutExercise {
  name: string;
  sets: string;
  reps: string;
  restSec: number;
  target: string;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  category: string;
  level: string;
  durationMin: number;
  caloriesBurned: number;
  exercisesCount: number;
  muscleGroup: string;
  description: string;
  exercises: WorkoutExercise[];
}

export interface DietMeal {
  mealTime: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
}

export interface DietPlan {
  id: string;
  name: string;
  tagline: string;
  caloriesTarget: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  description: string;
  meals: DietMeal[];
}

export interface FastingState {
  plan: '16:8' | '18:6' | '20:4' | '14:10';
  isFasting: boolean;
  targetHours: number;
  elapsedHours: number;
  startTime: string;
}

export interface WorkoutSchedule {
  enabled: boolean;
  days: string[];
  time: string;
  weeklyTarget: number;
  completedThisWeek: number;
}

export interface CalorieMetrics {
  weightKg: number;
  heightCm: number;
  age: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active';
  goal: 'fat_loss' | 'maintenance' | 'muscle_gain';
  bmr: number;
  tdee: number;
  targetCalories: number;
  consumedCalories: number;
  burnedCalories: number;
  targetProtein: number;
  consumedProtein: number;
  targetCarbs: number;
  consumedCarbs: number;
  targetFat: number;
  consumedFat: number;
}

export type TranslationKey = keyof typeof translations['es'];

interface AppContextType {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  activeSubView: SubView;
  navigationStack: SubView[];
  pushView: (view: SubView) => void;
  popView: () => void;

  // Theme & Language
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  
  // Patient Profile
  profile: PatientProfile;
  updateProfile: (updated: Partial<PatientProfile>) => void;
  setAvatarUrl: (url: string) => void;

  // Workouts & Exercise
  workoutRoutines: WorkoutRoutine[];
  selectedRoutine: WorkoutRoutine;
  setSelectedRoutine: (r: WorkoutRoutine) => void;
  completedWorkoutsCount: number;
  logWorkoutSession: (routineTitle: string, durationMin: number, caloriesBurned: number) => void;

  // Diets & Nutrition
  dietPlans: DietPlan[];
  activeDietPlan: DietPlan;
  setActiveDietPlan: (plan: DietPlan) => void;
  logQuickMeal: (name: string, cal: number, prot: number, carbs: number, fat: number) => void;

  // Intermittent Fasting
  fastingState: FastingState;
  toggleFasting: () => void;
  setFastingPlan: (plan: '16:8' | '18:6' | '20:4' | '14:10') => void;

  // Workout Reminders & Schedule
  workoutSchedule: WorkoutSchedule;
  toggleWorkoutDay: (day: string) => void;
  setWorkoutTime: (time: string) => void;
  toggleWorkoutReminder: () => void;

  // Calorie Calculator
  calorieMetrics: CalorieMetrics;
  calculateAndSetCalorieMetrics: (
    weight: number,
    height: number,
    age: number,
    activity: CalorieMetrics['activityLevel'],
    goal: CalorieMetrics['goal']
  ) => void;

  // Compliance Reporting
  workoutComplianceRate: number;
  dietComplianceRate: number;
  fastingComplianceRate: number;

  // Medication State (Preserved secondary)
  adherenceRate: number;
  pillsRemain: number;
  totalPills: number;
  consumedToday: number;
  bottles: boolean[];
  toggleBottle: (index: number) => void;
  takeDose: (medName?: string) => void;

  // Diary
  diaryEntries: DiaryEntry[];
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id'>) => void;

  // Settings
  settings: {
    notifications: boolean;
    autoRefill: boolean;
    hapticFeedback: boolean;
    cloudSync: boolean;
  };
  toggleSetting: (key: 'notifications' | 'autoRefill' | 'hapticFeedback' | 'cloudSync') => void;

  // Toast / iOS Banner Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const initialWorkouts: WorkoutRoutine[] = [
  {
    id: 'w1',
    title: 'Fuerza & Hipertrofia: Torso Superior',
    category: 'Fuerza & Hipertrofia',
    level: 'Intermedio',
    durationMin: 45,
    caloriesBurned: 440,
    exercisesCount: 5,
    muscleGroup: 'Pecho, Deltoides & Tríceps',
    description: 'Protocolo de hipertrofia miofibrilar con tensión mecánica óptima y sobrecarga progresiva.',
    exercises: [
      { name: 'Press banca inclinado con mancuernas', sets: '4 series', reps: '8-10 reps', restSec: 90, target: 'Pectoral clavicular' },
      { name: 'Fondos en paralelas lastrados', sets: '3 series', reps: '10-12 reps', restSec: 90, target: 'Pectoral & Tríceps' },
      { name: 'Press militar estricto con barra', sets: '4 series', reps: '8 reps', restSec: 120, target: 'Deltoides anterior/medio' },
      { name: 'Elevaciones laterales en polea', sets: '4 series', reps: '15 reps', restSec: 60, target: 'Deltoides lateral' },
      { name: 'Extensión de tríceps tras nuca', sets: '3 series', reps: '12 reps', restSec: 60, target: 'Cabeza larga del tríceps' },
    ],
  },
  {
    id: 'w2',
    title: 'HIIT Metabólico Quema Grasa',
    category: 'Cardio & Quema',
    level: 'Avanzado',
    durationMin: 30,
    caloriesBurned: 520,
    exercisesCount: 6,
    muscleGroup: 'Full Body & Cardiovascular',
    description: 'Ráfagas anaeróbicas de alta intensidad para maximizar el consumo de oxígeno post-ejercicio (EPOC).',
    exercises: [
      { name: 'Burpees reactivos explosivos', sets: '4 series', reps: '40s activo / 20s pausa', restSec: 20, target: 'Full Body & VO2 Max' },
      { name: 'Mountain Climbers dinámicos', sets: '4 series', reps: '45s continuo', restSec: 15, target: 'Core anterior & Hombros' },
      { name: 'Kettlebell Swings a dos manos', sets: '4 series', reps: '20 reps explosivas', restSec: 30, target: 'Cadena posterior & Glúteos' },
      { name: 'Box Jumps con aterrizaje suave', sets: '4 series', reps: '12 reps', restSec: 40, target: 'Potencia de piernas' },
      { name: 'Battle Ropes ondulaciones dobles', sets: '4 series', reps: '30s al 100%', restSec: 30, target: 'Tren superior & Grip' },
      { name: 'Plancha dinámica hollow rock', sets: '3 series', reps: '45s isométrico', restSec: 30, target: 'Core profundo' },
    ],
  },
  {
    id: 'w3',
    title: 'Movilidad & Longevidad CODE®',
    category: 'Movilidad & Longevidad',
    level: 'Todos los niveles',
    durationMin: 25,
    caloriesBurned: 180,
    exercisesCount: 5,
    muscleGroup: 'Caderas, Columna & Manguito Rotador',
    description: 'Descompresión articular, apertura fascial y reeducación postural para una longevidad funcional óptima.',
    exercises: [
      { name: 'Cat-Cow con respiración diafragmática', sets: '3 series', reps: '12 ciclos lentos', restSec: 30, target: 'Columna vertebral' },
      { name: '90/90 Hip Mobility con rotación', sets: '3 series', reps: '8 reps por lado', restSec: 30, target: 'Cápsula de cadera' },
      { name: 'World\'s Greatest Stretch dinámico', sets: '3 series', reps: '6 reps por pierna', restSec: 45, target: 'Flexores & Torácica' },
      { name: 'Dislocaciones de hombro con banda', sets: '3 series', reps: '15 reps controladas', restSec: 30, target: 'Manguito rotador' },
      { name: 'Dead Hang en barra de dominadas', sets: '3 series', reps: '45s descompresión', restSec: 60, target: 'Descompresión espinal' },
    ],
  },
  {
    id: 'w4',
    title: 'Piernas & Glúteos de Potencia',
    category: 'Fuerza Inferior',
    level: 'Avanzado',
    durationMin: 50,
    caloriesBurned: 580,
    exercisesCount: 5,
    muscleGroup: 'Cuádriceps, Isquios & Glúteos',
    description: 'Estímulo de fuerza neuromuscular para tren inferior denso, rodillas blindadas y potencia atlética.',
    exercises: [
      { name: 'Sentadilla trasera profunda con barra', sets: '4 series', reps: '6-8 reps pesadas', restSec: 120, target: 'Cuádriceps & Cadera' },
      { name: 'Hip Thrust con pausa isométrica', sets: '4 series', reps: '10 reps (2s pausa)', restSec: 90, target: 'Glúteo mayor' },
      { name: 'Peso muerto rumano con mancuernas', sets: '4 series', reps: '10-12 reps', restSec: 90, target: 'Isquiotibiales' },
      { name: 'Zancadas búlgaras en déficit', sets: '3 series', reps: '10 por pierna', restSec: 60, target: 'Estabilidad unilateral' },
      { name: 'Elevación de talones de pie', sets: '4 series', reps: '15 reps lentas', restSec: 45, target: 'Gemelos & Sóleo' },
    ],
  },
];

const initialDietPlans: DietPlan[] = [
  {
    id: 'd1',
    name: 'Alta en Proteína & Recomposición',
    tagline: 'Ideal para ganar músculo y quemar grasa simultáneamente',
    caloriesTarget: 2150,
    proteinGrams: 165,
    carbsGrams: 200,
    fatGrams: 60,
    description: 'Enfoque de 2g de proteína por kilo de peso corporal, con carbohidratos complejos peri-entreno para recarga de glucógeno.',
    meals: [
      { mealTime: '08:30 AM', name: 'Desayuno Anabólico', calories: 510, protein: 42, carbs: 48, fat: 14, description: 'Omelette de 3 huevos + claras con espinacas y avena integral con frutos rojos silvestres.' },
      { mealTime: '01:30 PM', name: 'Almuerzo Fuerza', calories: 680, protein: 55, carbs: 65, fat: 18, description: 'Pechuga de pollo de pastoreo a la plancha, quinoa perlada, medio aguacate y brócoli al vapor.' },
      { mealTime: '05:00 PM', name: 'Pre/Post Entreno', calories: 360, protein: 32, carbs: 45, fat: 6, description: 'Batido de proteína Whey Isolate con plátano maduro, canela de Ceilán y leche de almendras sin azúcar.' },
      { mealTime: '08:30 PM', name: 'Cena Longevidad', calories: 600, protein: 36, carbs: 42, fat: 22, description: 'Lomo de salmón salvaje al horno con espárragos trigueros y batata asada con aceite de oliva virgen extra.' },
    ],
  },
  {
    id: 'd2',
    name: 'Mediterránea Longevidad CODE®',
    tagline: 'Enfocada en autofagia, salud cardiovascular y polifenoles',
    caloriesTarget: 2050,
    proteinGrams: 140,
    carbsGrams: 215,
    fatGrams: 72,
    description: 'Rica en grasas monoinsaturadas (AOVE), omega-3 de peces azules, legumbres ricas en almidón resistente y vegetales crucíferos.',
    meals: [
      { mealTime: '09:00 AM', name: 'Tostada Griega & Nueces', calories: 460, protein: 26, carbs: 48, fat: 18, description: 'Pan de masa madre con tomate rallado, AOVE virgen extra, queso feta y puñado de nueces.' },
      { mealTime: '02:00 PM', name: 'Pescado Azul & Legumbres', calories: 640, protein: 48, carbs: 62, fat: 22, description: 'Filete de lubina al horno con lentejas estofadas con verduras y ensalada mixta de rúcula.' },
      { mealTime: '05:30 PM', name: 'Snack Antioxidante', calories: 280, protein: 18, carbs: 32, fat: 10, description: 'Yogur griego natural con arándanos frescos, semillas de chía y chocolate negro 85% cacao.' },
      { mealTime: '08:30 PM', name: 'Cena Ligera Mediterránea', calories: 570, protein: 40, carbs: 55, fat: 20, description: 'Pollo salteado al limón con alcachofas, pimientos asados y arroz salvaje integral.' },
    ],
  },
  {
    id: 'd3',
    name: 'Cetogénica Limpia (Clean Keto)',
    tagline: 'Quema de grasa acelerada mediante cetosis metabólica',
    caloriesTarget: 1950,
    proteinGrams: 130,
    carbsGrams: 28,
    fatGrams: 145,
    description: 'Carbohidratos netos por debajo de 30g diarios para mantener al cuerpo en producción constante de cuerpos cetónicos.',
    meals: [
      { mealTime: '09:30 AM', name: 'Huevos Revueltos & Aguacate', calories: 480, protein: 28, carbs: 6, fat: 38, description: 'Huevos camperos con mantequilla ghee, aguacate entero hass y semillas de calabaza.' },
      { mealTime: '02:00 PM', name: 'Ribeye Steak & Espinacas', calories: 720, protein: 52, carbs: 5, fat: 55, description: 'Corte de carne de pasto a la sartén con espinacas salteadas en aceite de oliva y piñones.' },
      { mealTime: '08:00 PM', name: 'Salmón Cremoso con Espárragos', calories: 650, protein: 44, carbs: 8, fat: 48, description: 'Salmón con salsa de queso crema, eneldo fresco y espárragos verdes a la parrilla.' },
    ],
  },
];

const defaultProfile: PatientProfile = {
  name: 'Shohan',
  deviceId: '4564856',
  patientId: 'Pat_43546',
  age: 34,
  email: 'hannah@email.com',
  phone: '+ 971 4234 4112',
  residence: 'California',
  avatarUrl: '/avatar.jpg',
};

const initialDiary: DiaryEntry[] = [
  {
    id: '1',
    date: 'Hoy',
    time: '07:45 AM',
    title: 'Entrenamiento Completado: Fuerza & Hipertrofia',
    notes: '45 min de Torso Superior. 440 kcal quemadas. Excelente activación en press inclinado.',
    status: 'workout',
    vital: 'Pulso Máx: 154 bpm',
  },
  {
    id: '2',
    date: 'Hoy',
    time: '08:45 AM',
    title: 'Dosis Matutina Registrada',
    notes: 'Multivitamínico + Omega 3 ingerido con desayuno.',
    status: 'taken',
    vital: 'PA 118/78 mmHg',
  },
  {
    id: '3',
    date: 'Hoy',
    time: '12:00 PM',
    title: 'Fin de Ventana de Ayuno 16:8',
    notes: '16 horas completadas exitosamente en estado de autofagia.',
    status: 'fasting',
    vital: 'Glucosa basal: 84 mg/dL',
  },
  {
    id: '4',
    date: 'Ayer',
    time: '06:30 PM',
    title: 'Sesión HIIT Quemagrasa',
    notes: '30 min de intervalos anaeróbicos. 520 kcal quemadas.',
    status: 'workout',
    vital: 'VO2 máx estimado: 48 ml/kg',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<MainTab>('home');
  const [navigationStack, setNavigationStack] = useState<SubView[]>([]);
  const [profile, setProfile] = useState<PatientProfile>(defaultProfile);
  const [adherenceRate, setAdherenceRate] = useState<number>(65);
  const [pillsRemain, setPillsRemain] = useState<number>(40);
  const totalPills = 120;

  // Fitness Workouts State
  const [workoutRoutines] = useState<WorkoutRoutine[]>(initialWorkouts);
  const [selectedRoutine, setSelectedRoutine] = useState<WorkoutRoutine>(initialWorkouts[0]);
  const [completedWorkoutsCount, setCompletedWorkoutsCount] = useState<number>(18);
  const [workoutComplianceRate, setWorkoutComplianceRate] = useState<number>(85);

  // Nutrition & Diets State
  const [dietPlans] = useState<DietPlan[]>(initialDietPlans);
  const [activeDietPlan, setActiveDietPlanState] = useState<DietPlan>(initialDietPlans[0]);
  const [dietComplianceRate, setDietComplianceRate] = useState<number>(90);

  // Intermittent Fasting State
  const [fastingState, setFastingState] = useState<FastingState>({
    plan: '16:8',
    isFasting: true,
    targetHours: 16,
    elapsedHours: 13.5,
    startTime: '20:00',
  });
  const [fastingComplianceRate] = useState<number>(92);

  // Workout Reminders Schedule
  const [workoutSchedule, setWorkoutSchedule] = useState<WorkoutSchedule>({
    enabled: true,
    days: ['Lunes', 'Miércoles', 'Viernes', 'Sábado'],
    time: '07:30',
    weeklyTarget: 5,
    completedThisWeek: 4,
  });

  // Calorie & Macro Metrics
  const [calorieMetrics, setCalorieMetrics] = useState<CalorieMetrics>({
    weightKg: 76,
    heightCm: 178,
    age: 34,
    activityLevel: 'moderate',
    goal: 'fat_loss',
    bmr: 1740,
    tdee: 2420,
    targetCalories: 2150,
    consumedCalories: 1540,
    burnedCalories: 580,
    targetProtein: 165,
    consumedProtein: 122,
    targetCarbs: 200,
    consumedCarbs: 140,
    targetFat: 60,
    consumedFat: 42,
  });

  // Theme & Language
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguageState] = useState<Language>('es');

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      showToast(next === 'dark' ? 'Modo Oscuro activado' : 'Modo Claro activado');
      return next;
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    showToast(lang === 'es' ? 'Idioma: Español' : 'Language: English');
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] ?? translations['es'][key] ?? key;
  };
  
  const [bottles, setBottles] = useState<boolean[]>([
    true, true, true, true,
    true, true, true, true,
    false, false, false, false,
  ]);
  const [consumedToday, setConsumedToday] = useState<number>(8);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(initialDiary);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    notifications: true,
    autoRefill: true,
    hapticFeedback: true,
    cloudSync: true,
  });

  const activeSubView = navigationStack.length > 0 ? navigationStack[navigationStack.length - 1] : null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const pushView = (view: SubView) => {
    if (!view) return;
    setNavigationStack((prev) => [...prev, view]);
  };

  const popView = () => {
    setNavigationStack((prev) => prev.slice(0, prev.length - 1));
  };

  const setActiveTab = (tab: MainTab) => {
    // If we're inside a subview, clear it to return to main tab screen
    if (navigationStack.length > 0) {
      setNavigationStack([]);
    }
    setActiveTabState(tab);
  };

  const updateProfile = (updated: Partial<PatientProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      if (!next.avatarUrl || next.avatarUrl.trim() === '') {
        next.avatarUrl = '/avatar.jpg';
      }
      return next;
    });
    showToast('Perfil actualizado correctamente');
  };

  const setAvatarUrl = (url: string) => {
    const validUrl = url && url.trim() !== '' ? url : '/avatar.jpg';
    setProfile((prev) => ({ ...prev, avatarUrl: validUrl }));
    showToast('Foto de perfil actualizada');
  };

  const toggleBottle = (index: number) => {
    const updated = [...bottles];
    const willBeConsumed = !updated[index];
    updated[index] = willBeConsumed;
    setBottles(updated);

    const newConsumed = updated.filter(Boolean).length;
    setConsumedToday(newConsumed);

    if (willBeConsumed) {
      setPillsRemain((prev) => Math.max(0, prev - 1));
      setAdherenceRate((prev) => Math.min(100, prev + 2));
      showToast(`Pastilla #${index + 1} registrada`);
    } else {
      setPillsRemain((prev) => Math.min(totalPills, prev + 1));
      setAdherenceRate((prev) => Math.max(0, prev - 2));
      showToast(`Pastilla #${index + 1} desmarcada`);
    }
  };

  const takeDose = (medName = 'Cardiovit 50mg') => {
    setPillsRemain((prev) => Math.max(0, prev - 1));
    setAdherenceRate((prev) => Math.min(100, prev + 1));
    setConsumedToday((prev) => prev + 1);

    // Also mark next unconsumed bottle
    const nextIdx = bottles.findIndex((b) => !b);
    if (nextIdx !== -1) {
      const updated = [...bottles];
      updated[nextIdx] = true;
      setBottles(updated);
    }

    // Add to diary
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: 'Hoy',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: `Dosis Tomada: ${medName}`,
      notes: `Registrado automáticamente desde Dynamic Island.`,
      status: 'taken',
      vital: 'Pulso regular',
    };
    setDiaryEntries((prev) => [newEntry, ...prev]);

    showToast(`Dosis registrada: ${medName}`);
  };

  const addDiaryEntry = (entry: Omit<DiaryEntry, 'id'>) => {
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      ...entry,
    };
    setDiaryEntries((prev) => [newEntry, ...prev]);
    showToast('Nota añadida a la bitácora');
  };

  const toggleSetting = (key: 'notifications' | 'autoRefill' | 'hapticFeedback' | 'cloudSync') => {
    setSettings((prev) => {
      const nextVal = !prev[key];
      showToast(`${key}: ${nextVal ? 'Activado' : 'Desactivado'}`);
      return { ...prev, [key]: nextVal };
    });
  };

  const logWorkoutSession = (routineTitle: string, durationMin: number, caloriesBurned: number) => {
    setCompletedWorkoutsCount((prev) => prev + 1);
    setWorkoutSchedule((prev) => ({
      ...prev,
      completedThisWeek: Math.min(prev.weeklyTarget, prev.completedThisWeek + 1),
    }));
    setCalorieMetrics((prev) => ({
      ...prev,
      burnedCalories: prev.burnedCalories + caloriesBurned,
    }));
    setWorkoutComplianceRate((prev) => Math.min(100, prev + 3));

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: 'Hoy',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: `Entrenamiento Completado: ${routineTitle}`,
      notes: `${durationMin} minutos de sesión intensa. +${caloriesBurned} kcal quemadas.`,
      status: 'workout',
      vital: `Quemadas: ${caloriesBurned} kcal`,
    };
    setDiaryEntries((prev) => [newEntry, ...prev]);
    showToast(`¡Entrenamiento registrado! +${caloriesBurned} kcal quemadas`);
  };

  const setActiveDietPlan = (plan: DietPlan) => {
    setActiveDietPlanState(plan);
    setCalorieMetrics((prev) => ({
      ...prev,
      targetCalories: plan.caloriesTarget,
      targetProtein: plan.proteinGrams,
      targetCarbs: plan.carbsGrams,
      targetFat: plan.fatGrams,
    }));
    showToast(`Plan activado: ${plan.name}`);
  };

  const logQuickMeal = (name: string, cal: number, prot: number, carbs: number, fat: number) => {
    setCalorieMetrics((prev) => ({
      ...prev,
      consumedCalories: prev.consumedCalories + cal,
      consumedProtein: prev.consumedProtein + prot,
      consumedCarbs: prev.consumedCarbs + carbs,
      consumedFat: prev.consumedFat + fat,
    }));
    setDietComplianceRate((prev) => Math.min(100, prev + 2));

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: 'Hoy',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: `Comida Registrada: ${name}`,
      notes: `${cal} kcal | P: ${prot}g | C: ${carbs}g | G: ${fat}g`,
      status: 'wellness',
      vital: `+${cal} kcal`,
    };
    setDiaryEntries((prev) => [newEntry, ...prev]);
    showToast(`Comida registrada: ${name} (+${cal} kcal)`);
  };

  const toggleFasting = () => {
    setFastingState((prev) => {
      const nextState = !prev.isFasting;
      showToast(nextState ? 'Ayuno intermitente iniciado ⏱️' : 'Ventana de alimentación abierta');
      return {
        ...prev,
        isFasting: nextState,
        elapsedHours: nextState ? 0.1 : prev.elapsedHours,
      };
    });
  };

  const setFastingPlan = (plan: '16:8' | '18:6' | '20:4' | '14:10') => {
    const hoursMap: Record<string, number> = {
      '14:10': 14,
      '16:8': 16,
      '18:6': 18,
      '20:4': 20,
    };
    setFastingState((prev) => ({
      ...prev,
      plan,
      targetHours: hoursMap[plan] || 16,
    }));
    showToast(`Protocolo de ayuno: ${plan}`);
  };

  const toggleWorkoutDay = (day: string) => {
    setWorkoutSchedule((prev) => {
      const exists = prev.days.includes(day);
      const updatedDays = exists
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return {
        ...prev,
        days: updatedDays,
        weeklyTarget: updatedDays.length,
      };
    });
  };

  const setWorkoutTime = (time: string) => {
    setWorkoutSchedule((prev) => ({ ...prev, time }));
    showToast(`Hora de recordatorio: ${time}`);
  };

  const toggleWorkoutReminder = () => {
    setWorkoutSchedule((prev) => {
      const nextVal = !prev.enabled;
      showToast(nextVal ? 'Recordatorios de ejercicio activados 🔔' : 'Recordatorios desactivados');
      return { ...prev, enabled: nextVal };
    });
  };

  const calculateAndSetCalorieMetrics = (
    weight: number,
    height: number,
    age: number,
    activity: CalorieMetrics['activityLevel'],
    goal: CalorieMetrics['goal']
  ) => {
    // Mifflin-St Jeor Formula
    const bmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    const activityMultipliers: Record<CalorieMetrics['activityLevel'], number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very_active: 1.725,
    };
    const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.55));
    
    let targetCalories = tdee;
    if (goal === 'fat_loss') targetCalories -= 450;
    if (goal === 'muscle_gain') targetCalories += 350;

    // Macro calculation: 2g protein/kg, 0.9g fat/kg, rest carbs
    const targetProtein = Math.round(weight * 2.1);
    const targetFat = Math.round(weight * 0.9);
    const remainingCalories = Math.max(0, targetCalories - (targetProtein * 4 + targetFat * 9));
    const targetCarbs = Math.round(remainingCalories / 4);

    setCalorieMetrics((prev) => ({
      ...prev,
      weightKg: weight,
      heightCm: height,
      age,
      activityLevel: activity,
      goal,
      bmr,
      tdee,
      targetCalories,
      targetProtein,
      targetCarbs,
      targetFat,
    }));

    showToast('¡Metas calóricas y macros actualizados!');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeSubView,
        navigationStack,
        pushView,
        popView,
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        t,
        profile,
        updateProfile,
        setAvatarUrl,
        workoutRoutines,
        selectedRoutine,
        setSelectedRoutine,
        completedWorkoutsCount,
        logWorkoutSession,
        dietPlans,
        activeDietPlan,
        setActiveDietPlan,
        logQuickMeal,
        fastingState,
        toggleFasting,
        setFastingPlan,
        workoutSchedule,
        toggleWorkoutDay,
        setWorkoutTime,
        toggleWorkoutReminder,
        calorieMetrics,
        calculateAndSetCalorieMetrics,
        workoutComplianceRate,
        dietComplianceRate,
        fastingComplianceRate,
        adherenceRate,
        pillsRemain,
        totalPills,
        consumedToday,
        bottles,
        toggleBottle,
        takeDose,
        diaryEntries,
        addDiaryEntry,
        settings,
        toggleSetting,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
