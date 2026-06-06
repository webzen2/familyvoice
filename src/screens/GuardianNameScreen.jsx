import { useState } from 'react';

const NAMES = [
  { id: 'dad', label: 'Dad', icon: '👨' },
  { id: 'mom', label: 'Mom', icon: '👩' },
  { id: 'husband', label: 'Husband', icon: '🤵' },
  { id: 'wife', label: 'Wife', icon: '👰' },
  { id: 'grandpa', label: 'Grandpa', icon: '👴' },
  { id: 'grandma', label: 'Grandma', icon: '👵' },
];

export default function GuardianNameScreen({ navigate, appState, updateState }) {
  const [selected, setSelected] = useState(appState.guardianSetup.relationship || '');
  const [custom, setCustom] = useState(appState.guardianSetup.customName || '');
  const [showCustom, setShowCustom] = useState(false);

  function select(id) {
    setSelected(id);
    setShowCustom(id === 'custom');
  }

  function handleContinue() {
    if (!selected) return;
    const name = selected === 'custom' ? custom : NAMES.find(n => n.id === selected)?.label || selected;
    updateState({ guardianSetup: { ...appState.guardianSetup, relationship: selected, customName: custom, guardianName: name } });
    navigate('personalization');
  }

  const canContinue = selected && (selected !== 'custom' || custom.trim());

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      <div style={{ background: '#1D9E75', padding: '50px 24px 28px' }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px', fontWeight: 600 }}>Step 2 of 6</p>
        <h1 style={{ color: 'white', fontSize: 24, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>What should they call you?</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: '8px 0 0' }}>This name appears on the fake call screen</p>
      </div>

      <div style={{ flex: 1, padding: '24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
          {NAMES.map(n => {
            const isSelected = selected === n.id;
            return (
              <button
                key={n.id}
                onClick={() => select(n.id)}
                style={{ padding: '18px 8px', border: `2px solid ${isSelected ? '#1D9E75' : '#e5e7eb'}`, borderRadius: 16, background: isSelected ? '#e8f7f2' : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              >
                <span style={{ fontSize: 28 }}>{n.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: isSelected ? '#1D9E75' : '#374151' }}>{n.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => select('custom')}
          style={{ width: '100%', padding: '14px', border: `2px solid ${selected === 'custom' ? '#1D9E75' : '#e5e7eb'}`, borderRadius: 14, background: selected === 'custom' ? '#e8f7f2' : 'white', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: selected === 'custom' ? '#1D9E75' : '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <span>✏️</span> Custom Name
        </button>

        {showCustom && (
          <input
            style={{ marginTop: 12, width: '100%', padding: '14px 16px', border: '1.5px solid #1D9E75', borderRadius: 12, fontSize: 16, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
            type="text"
            placeholder="Enter a name (e.g., Uncle Mark)"
            value={custom}
            onChange={e => setCustom(e.target.value)}
            autoFocus
          />
        )}
      </div>

      <div style={{ padding: '0 20px 40px' }}>
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          style={{ width: '100%', padding: '15px', background: canContinue ? '#1D9E75' : '#d1d5db', color: 'white', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: canContinue ? 'pointer' : 'not-allowed' }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
