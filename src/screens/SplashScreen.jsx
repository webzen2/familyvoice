export default function SplashScreen({ navigate }) {
  const scenarios = [
    {
      icon: '🚶‍♀️',
      title: 'Walking Alone at Night',
      desc: 'A fake call from Dad scares off anyone following her.',
    },
    {
      icon: '🏠',
      title: 'Home Alone',
      desc: "Mom calls to check in — even when she can't.",
    },
    {
      icon: '🎓',
      title: 'College Campus',
      desc: 'A quick call from home makes predators walk away.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #1D9E75 0%, #0f6b50 100%)', display: 'flex', flexDirection: 'column', padding: '0' }}>
      {/* Status bar */}
      <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '12px', fontWeight: '600' }}>
        <span>9:41</span>
        <span>●●● 📶 🔋</span>
      </div>

      {/* Logo */}
      <div style={{ padding: '40px 24px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 72, height: 72, background: 'rgba(255,255,255,0.2)', borderRadius: 20, marginBottom: 16, backdropFilter: 'blur(10px)' }}>
          <span style={{ fontSize: 36 }}>🛡️</span>
        </div>
        <h1 style={{ color: 'white', fontSize: 32, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.5px' }}>FamilyVoice</h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, margin: 0, fontStyle: 'italic' }}>Your voice. Their protection.</p>
      </div>

      {/* Scenario cards */}
      <div style={{ padding: '8px 20px', flex: 1 }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, textAlign: 'center', marginBottom: 16, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Real Protection. Real Scenarios.</p>
        {scenarios.map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', borderRadius: 16, padding: '16px', marginBottom: 12, border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <p style={{ color: 'white', fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>{s.title}</p>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0, lineHeight: '1.5' }}>{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 20px 40px' }}>
        <button
          onClick={() => navigate('auth')}
          style={{ width: '100%', padding: '16px', background: 'white', color: '#1D9E75', border: 'none', borderRadius: 14, fontSize: 17, fontWeight: 700, cursor: 'pointer', marginBottom: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
        >
          Get Started — It's Free
        </button>
        <p style={{ textAlign: 'center', margin: 0 }}>
          <button
            onClick={() => navigate('auth')}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.85)', fontSize: 15, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Already have an account? Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
