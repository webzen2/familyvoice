import { useState } from 'react';

const STYLES = [
  { id: 'warm-calm', label: 'Warm & Calm', desc: 'Gentle, soothing, reassuring', icon: '☀️' },
  { id: 'protective-firm', label: 'Protective & Firm', desc: 'Strong, confident, no-nonsense', icon: '🛡️' },
  { id: 'playful', label: 'Playful & Loving', desc: 'Fun, lighthearted, affectionate', icon: '💛' },
];

export default function PersonalizationScreen({ navigate, appState, updateState }) {
  const setup = appState.guardianSetup;
  const [nickname, setNickname] = useState(setup.nickname || '');
  const [catchphrase, setCatchphrase] = useState(setup.catchphrase || '');
  const [style, setStyle] = useState(setup.talkingStyle || '');

  function handleContinue() {
    if (!style) return;
    updateState({ guardianSetup: { ...setup, nickname, catchphrase, talkingStyle: style } });
    navigate('concerns');
  }

  const label = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };
  const input = { width: '100%', padding: '13px 14px', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 15, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', background: '#fafafa' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      <div style={{ background: '#1D9E75', padding: '50px 24px 28px' }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px', fontWeight: 600 }}>Step 3 of 6</p>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>Make the AI sound like you</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: '8px 0 0' }}>These details are woven into every call</p>
      </div>

      <div style={{ flex: 1, padding: '24px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={label}>What nickname do you use for them?</label>
          <input style={input} type="text" placeholder="e.g., baby, sweetheart, buddy, princess" value={nickname} onChange={e => setNickname(e.target.value)} />
          <p style={{ fontSize: 12, color: '#9ca3af', margin: '6px 0 0' }}>The AI will call them by this name during the call</p>
        </div>

        <div>
          <label style={label}>What phrase do you say all the time?</label>
          <input style={input} type="text" placeholder="e.g., I'm on my way, we got you, I love you" value={catchphrase} onChange={e => setCatchphrase(e.target.value)} />
          <p style={{ fontSize: 12, color: '#9ca3af', margin: '6px 0 0' }}>The AI will naturally use this during conversation</p>
        </div>

        <div>
          <label style={label}>How do you talk?</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {STYLES.map(s => {
              const isSelected = style === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  style={{ padding: '14px 16px', border: `2px solid ${isSelected ? '#1D9E75' : '#e5e7eb'}`, borderRadius: 14, background: isSelected ? '#e8f7f2' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}
                >
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: isSelected ? '#1D9E75' : '#111827' }}>{s.label}</p>
                    <p style={{ margin: 0, fontSize: 13, color: '#6b7280', marginTop: 2 }}>{s.desc}</p>
                  </div>
                  {isSelected && <span style={{ marginLeft: 'auto', color: '#1D9E75', fontSize: 18 }}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 20px 40px' }}>
        <button
          onClick={handleContinue}
          disabled={!style}
          style={{ width: '100%', padding: '15px', background: style ? '#1D9E75' : '#d1d5db', color: 'white', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: style ? 'pointer' : 'not-allowed' }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
