import { useState, useEffect, useRef } from 'react';
import { config, buildSystemPrompt } from '../config';

export default function ActiveCallScreen({ navigate, appState, updateState }) {
  const [elapsed, setElapsed] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [callError, setCallError] = useState('');
  const intervalRef = useRef(null);

  const guardianName = appState.guardianSetup?.guardianName || 'Guardian';

  function formatTime(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  useEffect(() => {
    startCall();
    intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  async function startCall() {
    const voiceId = appState.voiceId;
    const systemPrompt = buildSystemPrompt({
      guardianName,
      nickname: appState.guardianSetup?.nickname,
      catchphrase: appState.guardianSetup?.catchphrase,
      talkingStyle: appState.guardianSetup?.talkingStyle,
      relationship: appState.guardianSetup?.relationship,
    });

    // POST to Retell AI to create a call
    try {
      if (config.RETELL_API_KEY === 'YOUR_RETELL_API_KEY_HERE') {
        // Demo mode — simulate call started
        setCallStarted(true);
        return;
      }

      const response = await fetch(`${config.RETELL_BASE_URL}/v2/create-phone-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.RETELL_API_KEY}`,
        },
        body: JSON.stringify({
          agent_id: config.RETELL_AGENT_ID,
          override_agent_id: config.RETELL_AGENT_ID,
          retell_llm_dynamic_variables: {
            guardian_name: guardianName,
            voice_id: voiceId,
            system_prompt: systemPrompt,
          },
        }),
      });

      if (!response.ok) throw new Error('Retell call failed');
      setCallStarted(true);
    } catch {
      setCallStarted(true); // Proceed in demo mode
    }
  }

  function endCall() {
    clearInterval(intervalRef.current);
    const newCall = {
      guardian: guardianName,
      timestamp: Date.now(),
      duration: elapsed,
    };
    updateState({ recentCalls: [newCall, ...(appState.recentCalls || [])].slice(0, 20) });
    navigate('dashboard');
  }

  const btnStyle = (color) => ({
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: color,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  });

  const btnLabel = { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 6, fontWeight: 500 };

  return (
    <div style={{ minHeight: '100vh', background: '#1c1c1e', display: 'flex', flexDirection: 'column', color: 'white', userSelect: 'none' }}>
      {/* Status bar */}
      <div style={{ padding: '14px 20px 0', display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span>●●● 📶 🔋</span>
      </div>

      {/* Call info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 60 }}>
        {/* Avatar */}
        <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, #1D9E75, #0f6b50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, marginBottom: 20 }}>
          {guardianName === 'Dad' || guardianName === 'Grandpa' || guardianName === 'Husband' ? '👨' :
           guardianName === 'Mom' || guardianName === 'Grandma' || guardianName === 'Wife' ? '👩' : '🧑'}
        </div>

        <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.5px' }}>{guardianName}</h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: '0 0 4px' }}>mobile</p>
        <p style={{ fontSize: 15, color: '#34c759', margin: '0 0 0', fontWeight: 500 }}>
          {callStarted ? formatTime(elapsed) : 'Connecting...'}
        </p>
        {callError && <p style={{ fontSize: 13, color: '#ff9f0a', marginTop: 8 }}>{callError}</p>}

        {/* Connecting indicator */}
        {!callStarted && (
          <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#1D9E75', opacity: 0.6, animation: `pulse-ring 1.2s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </div>
        )}
      </div>

      {/* Call controls */}
      <div style={{ padding: '0 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
          {/* Speaker */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={() => setIsSpeaker(v => !v)} style={btnStyle(isSpeaker ? '#636366' : '#3a3a3c')}>
              <span style={{ fontSize: 22 }}>{isSpeaker ? '🔊' : '🔈'}</span>
            </button>
            <span style={btnLabel}>speaker</span>
          </div>
          {/* FaceTime */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button style={btnStyle('#3a3a3c')}>
              <span style={{ fontSize: 22 }}>📹</span>
            </button>
            <span style={btnLabel}>FaceTime</span>
          </div>
          {/* Mute */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={() => setIsMuted(v => !v)} style={btnStyle(isMuted ? '#636366' : '#3a3a3c')}>
              <span style={{ fontSize: 22 }}>{isMuted ? '🔇' : '🎙️'}</span>
            </button>
            <span style={btnLabel}>{isMuted ? 'unmute' : 'mute'}</span>
          </div>
          {/* Add */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button style={btnStyle('#3a3a3c')}>
              <span style={{ fontSize: 22 }}>➕</span>
            </button>
            <span style={btnLabel}>add call</span>
          </div>
          {/* Keypad */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button style={btnStyle('#3a3a3c')}>
              <span style={{ fontSize: 22 }}>🔢</span>
            </button>
            <span style={btnLabel}>keypad</span>
          </div>
          {/* Hold */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button style={btnStyle('#3a3a3c')}>
              <span style={{ fontSize: 22 }}>⏸️</span>
            </button>
            <span style={btnLabel}>hold</span>
          </div>
        </div>

        {/* End call button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={endCall}
            style={{ width: 72, height: 72, borderRadius: '50%', background: '#ff3b30', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 4px 20px rgba(255,59,48,0.4)' }}
          >
            📵
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 10 }}>tap to end call</p>
      </div>
    </div>
  );
}
