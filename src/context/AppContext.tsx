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
  | 'edit-profile';

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
  status: 'taken' | 'missed' | 'wellness';
  vital?: string;
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

  // Medication State
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

const defaultProfile: PatientProfile = {
  name: 'Shohan',
  deviceId: '4564856',
  patientId: 'Pat_43546',
  age: 56,
  email: 'hannah@email.com',
  phone: '+ 971 4234 4112',
  residence: 'California',
  avatarUrl: '/avatar.jpg',
};

const initialDiary: DiaryEntry[] = [
  {
    id: '1',
    date: 'Hoy',
    time: '08:30 AM',
    title: 'Dosis Matutina Completada',
    notes: 'Cardiovit 50mg ingerido con alimentos.',
    status: 'taken',
    vital: 'PA 120/80 mmHg',
  },
  {
    id: '2',
    date: 'Hoy',
    time: '11:15 AM',
    title: 'Chequeo de Presión Arterial',
    notes: 'Lectura dentro de rango óptimo.',
    status: 'wellness',
    vital: 'Pulso 72 bpm',
  },
  {
    id: '3',
    date: 'Ayer',
    time: '09:00 PM',
    title: 'Sesión de Relajación Nocturna',
    notes: 'Historias para dormir y monitoreo de sueño.',
    status: 'wellness',
    vital: 'Sueño 7h 45m',
  },
  {
    id: '4',
    date: 'Ayer',
    time: '02:00 PM',
    title: 'Dosis Mediodía Registrada',
    notes: 'Multivitamínico y Omega 3.',
    status: 'taken',
    vital: 'Glucosa 95 mg/dL',
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
