'use client';

import React, { useState } from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { BookOpen, Plus, Heart, Pill, Sparkles, CheckCircle2 } from 'lucide-react';

export const DiaryView: React.FC = () => {
  const { diaryEntries, addDiaryEntry, t, theme } = useApp();
  const [filter, setFilter] = useState<'all' | 'taken' | 'wellness'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newVital, setNewVital] = useState('');

  const filtered = diaryEntries.filter((entry) => {
    if (filter === 'all') return true;
    return entry.status === filter;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addDiaryEntry({
      date: 'Hoy',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: newTitle,
      notes: newNotes || 'Registro diario del paciente.',
      status: 'wellness',
      vital: newVital || 'Normal',
    });

    setNewTitle('');
    setNewNotes('');
    setNewVital('');
    setIsAdding(false);
  };

  return (
    <div
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
      <IOSHeader
        title={t('diaryTitle')}
        subtitle={`${diaryEntries.length} ${t('diarySub')}`}
        rightAction={
          <button
            onClick={() => setIsAdding(!isAdding)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--device-bezel)',
              color: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-subtle)',
            }}
            title="Añadir entrada"
          >
            <Plus size={16} />
          </button>
        }
      />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['all', 'taken', 'wellness'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                backgroundColor: filter === f ? 'var(--device-bezel)' : 'var(--card-white)',
                color: filter === f ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '16px',
                padding: '6px 12px',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              {f === 'all' ? (theme === 'dark' ? 'Todas' : 'Todas') : f === 'taken' ? t('medication') : t('wellness')}
            </button>
          ))}
        </div>

        {/* Add Entry Form Modal/Sheet */}
        {isAdding && (
          <form
            onSubmit={handleSave}
            style={{
              backgroundColor: 'var(--card-white)',
              borderRadius: '22px',
              padding: '16px',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid rgba(220, 226, 230, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Nueva Nota de Salud
            </span>

            <input
              type="text"
              placeholder="Título (ej. Sentí mareo leve)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '12px',
                border: theme === 'dark' ? '1px solid #2B3542' : '1px solid #D0D8DF',
                backgroundColor: theme === 'dark' ? '#141A22' : '#FFFFFF',
                color: 'var(--text-primary)',
                fontSize: '12.5px',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />

            <input
              type="text"
              placeholder="Signo vital (ej. Presión 120/80)"
              value={newVital}
              onChange={(e) => setNewVital(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '12px',
                border: theme === 'dark' ? '1px solid #2B3542' : '1px solid #D0D8DF',
                backgroundColor: theme === 'dark' ? '#141A22' : '#FFFFFF',
                color: 'var(--text-primary)',
                fontSize: '12.5px',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />

            <textarea
              placeholder="Notas u observaciones adicionales..."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              rows={2}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '12px',
                border: theme === 'dark' ? '1px solid #2B3542' : '1px solid #D0D8DF',
                backgroundColor: theme === 'dark' ? '#141A22' : '#FFFFFF',
                color: 'var(--text-primary)',
                fontSize: '12.5px',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
              }}
            />

            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  backgroundColor: 'var(--accent-green)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '10px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {t('saveChanges')}
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                style={{
                  backgroundColor: theme === 'dark' ? '#212A35' : '#F1F4F6',
                  color: 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        )}

        {/* Entries List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((entry) => (
            <div
              key={entry.id}
              style={{
                backgroundColor: 'var(--card-white)',
                borderRadius: '20px',
                padding: '14px 16px',
                boxShadow: 'var(--shadow-subtle)',
                border: '1px solid rgba(220, 226, 230, 0.3)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: entry.status === 'taken'
                        ? (theme === 'dark' ? '#182C2D' : '#DEF1F2')
                        : (theme === 'dark' ? '#1D2A1C' : '#EAF4DC'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {entry.status === 'taken' ? (
                      <Pill size={14} color="var(--accent-cyan)" />
                    ) : (
                      <Heart size={14} color="var(--accent-green)" />
                    )}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {entry.title}
                    </h5>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      {entry.date} • {entry.time}
                    </span>
                  </div>
                </div>

                {entry.vital && (
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      backgroundColor: theme === 'dark' ? '#19222C' : '#F3F6F8',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {entry.vital}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.4 }}>
                {entry.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
