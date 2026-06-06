export default function SubscriptionScreen({ navigate, updateState }) {
  function choosePro() {
    updateState({ subscription: 'pro' });
    navigate('voiceRecord');
  }

  function chooseFree() {
    updateState({ subscription: 'free' });
    navigate('voiceRecord');
  }

  const checkStyle = { color: '#1D9E75', fontWeight: 700, marginRight: 8 };
  const xStyle = { color: '#d1d5db', marginRight: 8 };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa' }}>
      <div style={{ background: '#1D9E75', padding: '50px 24px 32px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: 26, fontWeight: 800, margin: '0 0 8px' }}>Choose Your Plan</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, margin: 0 }}>Start free — upgrade anytime</p>
      </div>

      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Free plan */}
        <div style={{ background: 'white', borderRadius: 20, padding: '24px', border: '2px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#111827' }}>Free</h3>
              <p style={{ margin: '4px 0 0', fontSize: 14, color: '#6b7280' }}>Basic protection</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#111827' }}>$0</span>
              <p style={{ margin: 0, fontSize: 13, color: '#9ca3af' }}>forever</p>
            </div>
          </div>
          {[
            { ok: true, text: '1 voice clone' },
            { ok: true, text: '5 calls per month' },
            { ok: true, text: 'One-tap emergency call' },
            { ok: false, text: 'Multiple family members' },
            { ok: false, text: 'Unlimited calls' },
            { ok: false, text: 'Custom scenarios' },
          ].map((f, i) => (
            <p key={i} style={{ margin: '8px 0', fontSize: 14, color: f.ok ? '#374151' : '#9ca3af' }}>
              <span style={f.ok ? checkStyle : xStyle}>{f.ok ? '✓' : '✗'}</span>{f.text}
            </p>
          ))}
          <button
            onClick={chooseFree}
            style={{ width: '100%', padding: '13px', background: 'white', color: '#1D9E75', border: '2px solid #1D9E75', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 16 }}
          >
            Continue Free
          </button>
        </div>

        {/* Pro plan */}
        <div style={{ background: '#1D9E75', borderRadius: 20, padding: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 24px rgba(29,158,117,0.3)' }}>
          <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.25)', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 700, color: 'white' }}>
            MOST POPULAR
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'white' }}>Pro</h3>
              <p style={{ margin: '4px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Full family protection</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: 'white' }}>$9.99</span>
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>/month</p>
            </div>
          </div>
          {[
            '1 voice clone',
            'Unlimited calls',
            'One-tap emergency call',
            'Up to 6 family members',
            'Custom scenarios & scripts',
            'Priority AI voice quality',
          ].map((f, i) => (
            <p key={i} style={{ margin: '8px 0', fontSize: 14, color: 'white' }}>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, marginRight: 8 }}>✓</span>{f}
            </p>
          ))}
          <button
            onClick={choosePro}
            style={{ width: '100%', padding: '13px', background: 'white', color: '#1D9E75', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 16 }}
          >
            Start Free Trial — 7 Days Free
          </button>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textAlign: 'center', marginTop: 10 }}>Cancel anytime. No credit card required for trial.</p>
        </div>
      </div>
    </div>
  );
}
