import { useState } from 'react';

const CONCERNS = [
  { id: 'walking-home', label: 'Child walking home', icon: '🚶‍♀️' },
  { id: 'home-alone', label: 'Child home alone', icon: '🏠' },
  { id: 'woman-walking', label: 'Woman walking alone', icon: '👩' },
  { id: 'late-travel', label: 'Late night travel', icon: '🌙' },
  { id: 'college', label: 'College student safety', icon: '🎓' },
  { id: 'trafficking', label: 'Human trafficking risk', icon: '🚨' },
  { id: 'other', label: 'Other', icon: '➕' },
];

export default function ConcernsScreen({ navigate, appState, updateState }) {
  const [selected, setSelected] = useState(appState.guardianSetup.concerns || []);

  function toggle(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function handleContinue() {
    if (!selected.length) return;
    updateState({ guardianSetup: { ...appState.guardianSetup, concerns: selected } });
    navigate('onboarding');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      <div style={{ background: '#1D9E75', padding: '50px 24px 28px' }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px', fontWeight: 600 }}>Step 4 of 6</p>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>What worries you most?</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: '8px 0 0' }}>Select all that apply — we'll tailor the AI responses</p>
      </div>

      <div style={{ flex: 1, padding: '24px 20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CONCERNS.map(c => {
            const isSelected = selected.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                style={{ padding: '14px 16px', border: `2px solid ${isSelected ? '#1D9E75' : '#e5e7eb'}`, borderRadius: 14, background: isSelected ? '#e8f7f2' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}
              >
                <span style={{ fontSize: 22, flexShrink: 0, width: 32, textAlign: 'center' }}>{c.icon}</span>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: isSelected ? '#1D9E75' : '#374151' }}>{c.label}</span>
                <span style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${isSelected ? '#1D9E75' : '#d1d5db'}`, background: isSelected ? '#1D9E75' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'white', fontSize: 14 }}>
                  {isSelected ? '✓' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '12px 20px 40px' }}>
        <button
          onClick={handleContinue}
          disabled={!selected.length}
          style={{ width: '100%', padding: '15px', background: selected.length ? '#1D9E75' : '#d1d5db', color: 'white', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: selected.length ? 'pointer' : 'not-allowed' }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
