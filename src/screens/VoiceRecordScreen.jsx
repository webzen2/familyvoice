import { useState, useRef, useEffect } from 'react';
import { config } from '../config';

const TOTAL_SECONDS = 60;

export default function VoiceRecordScreen({ navigate, appState, updateState }) {
  const [phase, setPhase] = useState('idle'); // idle | recording | recorded | uploading | done
  const [elapsed, setElapsed] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState('');

  const mediaRef = useRef(null);
  const chunksRef = useRef([]);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => () => { clearInterval(intervalRef.current); }, []);

  async function startRecording() {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = e => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        setPhase('recorded');
        stream.getTracks().forEach(t => t.stop());
      };
      recorder.start(100);
      mediaRef.current = recorder;
      setPhase('recording');
      setElapsed(0);
      intervalRef.current = setInterval(() => {
        setElapsed(prev => {
          if (prev >= TOTAL_SECONDS) {
            stopRecording();
            return TOTAL_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);
    } catch {
      setError('Microphone access denied. Please allow microphone access to record your voice.');
    }
  }

  function stopRecording() {
    clearInterval(intervalRef.current);
    if (mediaRef.current && mediaRef.current.state !== 'inactive') {
      mediaRef.current.stop();
    }
  }

  async function confirmVoice() {
    if (!audioBlob) return;
    setPhase('uploading');
    setError('');

    // POST to ElevenLabs instant voice clone API
    try {
      const formData = new FormData();
      formData.append('name', `FamilyVoice_${appState.guardianSetup?.guardianName || 'Guardian'}`);
      formData.append('files', audioBlob, 'voice_sample.webm');
      formData.append('description', 'Guardian voice clone for FamilyVoice app');

      const response = await fetch(`${config.ELEVENLABS_BASE_URL}/v1/voices/add`, {
        method: 'POST',
        headers: { 'xi-api-key': config.ELEVENLABS_API_KEY },
        body: formData,
      });

      if (!response.ok) {
        // In demo mode (no real API key), simulate success
        if (config.ELEVENLABS_API_KEY === 'YOUR_ELEVENLABS_API_KEY_HERE') {
          updateState({ voiceId: 'demo_voice_' + Date.now() });
          setPhase('done');
          setTimeout(() => navigate('dashboard'), 1500);
          return;
        }
        throw new Error(`ElevenLabs error: ${response.status}`);
      }

      const data = await response.json();
      updateState({ voiceId: data.voice_id });
      setPhase('done');
      setTimeout(() => navigate('dashboard'), 1500);
    } catch (err) {
      // Demo mode fallback
      if (config.ELEVENLABS_API_KEY === 'YOUR_ELEVENLABS_API_KEY_HERE') {
        updateState({ voiceId: 'demo_voice_' + Date.now() });
        setPhase('done');
        setTimeout(() => navigate('dashboard'), 1500);
        return;
      }
      setError('Failed to upload voice. Please try again.');
      setPhase('recorded');
    }
  }

  const progress = elapsed / TOTAL_SECONDS;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference * (1 - progress);

  const guardianName = appState.guardianSetup?.guardianName || 'your voice';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      <div style={{ background: '#1D9E75', padding: '50px 24px 28px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px', fontWeight: 600 }}>Step 6 of 6</p>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>Clone Your Voice</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: '8px 0 0' }}>Hold the button and speak naturally for 60 seconds</p>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px' }}>
        {/* Script prompt */}
        <div style={{ background: '#f9fafb', borderRadius: 14, padding: '16px', marginBottom: 32, width: '100%' }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px' }}>📝 Read this out loud:</p>
          <p style={{ margin: 0, fontSize: 14, color: '#374151', lineHeight: 1.7, fontStyle: 'italic' }}>
            "Hey, it's {guardianName}! Just checking in to see how you're doing. I'm always here for you, no matter what. If you ever feel unsafe or uncomfortable, just call me and I'll be right there. I love you and I want you to know you're never alone. We're always going to get through things together."
          </p>
        </div>

        {/* Record button with SVG ring */}
        <div style={{ position: 'relative', width: 160, height: 160, marginBottom: 24 }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }} width="160" height="160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="#e5e7eb" strokeWidth="6" />
            <circle
              cx="80" cy="80" r="70"
              fill="none"
              stroke="#1D9E75"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={phase === 'recording' ? strokeDashoffset : circumference}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <button
            onMouseDown={startRecording}
            onTouchStart={startRecording}
            onMouseUp={stopRecording}
            onTouchEnd={stopRecording}
            onClick={phase === 'idle' ? startRecording : undefined}
            disabled={phase === 'uploading' || phase === 'done' || phase === 'recorded'}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: phase === 'recording' ? '#ef4444' : phase === 'recorded' ? '#1D9E75' : '#1D9E75',
              border: 'none',
              cursor: phase === 'recorded' ? 'default' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: phase === 'recording' ? '0 0 0 8px rgba(239,68,68,0.2)' : '0 4px 20px rgba(29,158,117,0.4)',
              transition: 'all 0.2s',
            }}
          >
            {phase === 'recording' ? (
              <>
                <span style={{ fontSize: 28 }}>⏹</span>
                <span style={{ fontSize: 12, color: 'white', fontWeight: 700, marginTop: 4 }}>{elapsed}s</span>
              </>
            ) : phase === 'recorded' ? (
              <span style={{ fontSize: 36 }}>✓</span>
            ) : (
              <>
                <span style={{ fontSize: 28 }}>🎙️</span>
                <span style={{ fontSize: 11, color: 'white', fontWeight: 700, marginTop: 4 }}>HOLD TO RECORD</span>
              </>
            )}
          </button>
        </div>

        {/* Waveform animation */}
        {phase === 'recording' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 40, marginBottom: 16 }}>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="wave-bar"
                style={{
                  width: 4,
                  borderRadius: 2,
                  background: '#1D9E75',
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>
        )}

        {phase === 'idle' && (
          <p style={{ fontSize: 14, color: '#9ca3af', textAlign: 'center', margin: 0 }}>Tap and hold the button to start recording</p>
        )}

        {phase === 'recording' && (
          <p style={{ fontSize: 14, color: '#ef4444', fontWeight: 600, textAlign: 'center', margin: 0 }}>
            Recording... {TOTAL_SECONDS - elapsed}s remaining
          </p>
        )}

        {error && <p style={{ color: '#ef4444', fontSize: 14, textAlign: 'center', marginTop: 12 }}>{error}</p>}

        {(phase === 'recorded' || phase === 'uploading') && audioUrl && (
          <div style={{ width: '100%', marginTop: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Preview your recording:</p>
            <audio ref={audioRef} src={audioUrl} controls style={{ width: '100%', borderRadius: 8 }} />
          </div>
        )}

        {phase === 'done' && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#1D9E75' }}>Voice cloned successfully!</p>
            <p style={{ fontSize: 14, color: '#6b7280' }}>Taking you to your dashboard...</p>
          </div>
        )}
      </div>

      {(phase === 'recorded') && (
        <div style={{ padding: '0 24px 40px', display: 'flex', gap: 12 }}>
          <button
            onClick={() => { setPhase('idle'); setElapsed(0); setAudioBlob(null); setAudioUrl(null); }}
            style={{ flex: 1, padding: '14px', background: 'white', color: '#6b7280', border: '1.5px solid #e5e7eb', borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
          >
            Re-record
          </button>
          <button
            onClick={confirmVoice}
            style={{ flex: 2, padding: '14px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
          >
            Confirm Voice ✓
          </button>
        </div>
      )}

      {phase === 'uploading' && (
        <div style={{ padding: '0 24px 40px' }}>
          <button disabled style={{ width: '100%', padding: '14px', background: '#d1d5db', color: 'white', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700 }}>
            Cloning voice...
          </button>
        </div>
      )}
    </div>
  );
}
