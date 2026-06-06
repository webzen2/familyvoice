import { useState } from 'react';

const STEPS = [
  {
    icon: '🎙️',
    title: 'Clone Your Voice',
    desc: 'Record just 60 seconds of your voice. Our AI captures every nuance — your tone, your warmth, your unique sound.',
    color: '#e8f7f2',
  },
  {
    icon: '🛡️',
    title: 'Always Protected',
    desc: 'Your family can trigger a realistic call from you anytime. One tap and your voice is there — even when you\'re not.',
    color: '#eff6ff',
  },
  {
    icon: '💨',
    title: 'Danger Disappears',
    desc: 'Predators hear a parent or spouse checking in. They walk away. Your loved one stays safe. It really works.',
    color: '#fef9ec',
  },
];

export default function OnboardingScreen({ navigate }) {
  const [step, setStep] = useState(0);

  function handleNext() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else navigate('subscription');
  }

  const s = STEPS[step];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      {/* Progress bar */}
      <div style={{ padding: '50px 24px 0' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? '#1D9E75' : '#e5e7eb', transition: 'background 0.3s' }} />
          ))}
        </div>
        <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 8 }}>Step {step + 1} of {STEPS.length}</p>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 32px', textAlign: 'center' }}>
        <div style={{ width: 120, height: 120, borderRadius: 30, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, marginBottom: 32, transition: 'all 0.3s' }}>
          {s.icon}
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#111827', margin: '0 0 16px', lineHeight: 1.2 }}>{s.title}</h2>
        <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
      </div>

      <div style={{ padding: '0 24px 50px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={handleNext}
          style={{ width: '100%', padding: '15px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
        >
          {step < STEPS.length - 1 ? 'Next →' : 'Get Started →'}
        </button>
        {step < STEPS.length - 1 && (
          <button
            onClick={() => navigate('subscription')}
            style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 14, cursor: 'pointer' }}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
