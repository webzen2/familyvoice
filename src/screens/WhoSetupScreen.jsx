import { useState } from 'react';

const OPTIONS = [
  { id: 'child', label: 'A Child', icon: '👧' },
  { id: 'spouse', label: 'My Spouse', icon: '💑' },
  { id: 'myself', label: 'Myself', icon: '🙋' },
  { id: 'elderly', label: 'An Elderly Parent', icon: '👴' },
  { id: 'college', label: 'A College Student', icon: '🎓' },
  { id: 'all', label: 'All of the Above', icon: '👨‍👩‍👧‍👦' },
];

export default function WhoSetupScreen({ navigate, appState, updateState }) {
  const [selected, setSelected] = useState(appState.guardianSetup.whoFor || []);

  function toggle(id) {
    if (id === 'all') { setSelected(['all']); return; }
    setSelected(prev => {
      const without = prev.filter(x => x !== 'all');
      return without.includes(id) ? without.filter(x => x !== id) : [...without, id];
    });
  }

  function handleContinue() {
    if (!selected.length) return;
    updateState({ guardianSetup: { ...appState.guardianSetup, whoFor: selected } });
    navigate('guardianName');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      <div style={{ background: '#1D9E75', padding: '50px 24px 28px' }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px', fontWeight: 600 }}>Step 1 of 6</p>
        <h1 style={{ color: 'white', fontSize: 24, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>Who are you setting this up for?</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: '8px 0 0' }}>Select all that apply</p>
      </div>

      <div style={{ flex: 1, padding: '24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {OPTIONS.map(opt => {
            const isSelected = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                style={{
                  padding: '20px 12px',
                  border: `2px solid ${isSelected ? '#1D9E75' : '#e5e7eb'}`,
                  borderRadius: 16,
                  background: isSelected ? '#e8f7f2' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 32 }}>{opt.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: isSelected ? '#1D9E75' : '#374151', textAlign: 'center', lineHeight: 1.3 }}>{opt.label}</span>
                {isSelected && <span style={{ fontSize: 16 }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '0 20px 40px' }}>
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
