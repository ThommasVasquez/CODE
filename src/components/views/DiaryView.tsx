'use client';

import React, { useState } from 'react';
import { IOSHeader } from './IOSHeader';
import { useApp } from '@/context/AppContext';
import { BookOpen, Plus, Heart, Pill, Sparkles, CheckCircle2 } from 'lucide-react';

export const DiaryView: React.FC = () => {
  const { diaryEntries, addDiaryEntry } = useApp();
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
        backgroundColor: '#F4F6F8',
        overflowY: 'auto',
        paddingBottom: '90px',
      }}
    >
      <IOSHeader
        title="Bitácora de Salud"
        subtitle={`${diaryEntries.length} Registros`}
        rightAction={
          <button
            onClick={() => setIsAdding(!isAdding)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#12161C',
              color: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
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
                backgroundColor: filter === f ? '#12161C' : '#FFFFFF',
                color: filter === f ? '#FFFFFF' : '#4F5F70',
                border: 'none',
                borderRadius: '16px',
                padding: '6px 12px',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              }}
            >
              {f === 'all' ? 'Todas' : f === 'taken' ? 'Medicación' : 'Bienestar'}
            </button>
          ))}
        </div>

        {/* Add Entry Form Modal/Sheet */}
        {isAdding && (
          <form
            onSubmit={handleSave}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '22px',
              padding: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              border: '1px solid #DCE3E8',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#111822' }}>
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
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #D0D8DF',
                fontSize: '12.5px',
                fontFamily: 'inherit',
              }}
            />

            <input
              type="text"
              placeholder="Signo vital (ej. Presión 120/80)"
              value={newVital}
              onChange={(e) => setNewVital(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #D0D8DF',
                fontSize: '12.5px',
                fontFamily: 'inherit',
              }}
            />

            <textarea
              placeholder="Notas u observaciones adicionales..."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              rows={2}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #D0D8DF',
                fontSize: '12.5px',
                fontFamily: 'inherit',
                resize: 'none',
              }}
            />

            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  backgroundColor: '#73A932',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '9px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Guardar Nota
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                style={{
                  backgroundColor: '#F1F4F6',
                  color: '#495868',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '9px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancelar
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
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '14px 16px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                border: '1px solid rgba(220, 226, 230, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: entry.status === 'taken' ? '#DEF1F2' : '#EAF4DC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {entry.status === 'taken' ? (
                      <Pill size={14} color="#30A4A8" />
                    ) : (
                      <Heart size={14} color="#73A932" />
                    )}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#101820' }}>
                      {entry.title}
                    </h5>
                    <span style={{ fontSize: '10.5px', color: '#7E8E9E' }}>
                      {entry.date} • {entry.time}
                    </span>
                  </div>
                </div>

                {entry.vital && (
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      backgroundColor: '#F3F6F8',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      color: '#384858',
                    }}
                  >
                    {entry.vital}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '12px', color: '#526272', marginTop: '8px', lineHeight: 1.4 }}>
                {entry.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
