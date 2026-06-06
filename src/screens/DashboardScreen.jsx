export default function DashboardScreen({ navigate, appState }) {
  const guardianName = appState.guardianSetup?.guardianName || 'Guardian';
  const userName = appState.user?.name || 'there';
  const isPro = appState.subscription === 'pro';
  const recentCalls = appState.recentCalls || [];

  function formatTime(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000 / 60);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return d.toLocaleDateString();
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#1D9E75', padding: '50px 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: '0 0 4px' }}>Hi, {userName} 👋</p>
            <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>FamilyVoice</h1>
            {!isPro && (
              <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: 11, fontWeight: 700, borderRadius: 6, padding: '2px 8px', marginTop: 6, letterSpacing: '0.5px' }}>FREE PLAN</span>
            )}
            {isPro && (
              <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.25)', color: 'white', fontSize: 11, fontWeight: 700, borderRadius: 6, padding: '2px 8px', marginTop: 6, letterSpacing: '0.5px' }}>⭐ PRO</span>
            )}
          </div>
          <button
            onClick={() => navigate('settings')}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: 40, height: 40, borderRadius: 12, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ⚙️
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px 20px', overflowY: 'auto' }}>
        {/* Main call button */}
        <div style={{ background: 'white', borderRadius: 24, padding: '32px 20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <p style={{ fontSize: 15, color: '#6b7280', margin: '0 0 20px' }}>Tap to trigger a call from</p>

          {/* Pulsing call button */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
            <div
              className="pulse-ring"
              style={{ position: 'absolute', inset: -16, borderRadius: '50%', background: 'rgba(29,158,117,0.12)', pointerEvents: 'none' }}
            />
            <button
              onClick={() => navigate('activeCall')}
              style={{ width: 140, height: 140, borderRadius: '50%', background: '#1D9E75', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(29,158,117,0.35)', position: 'relative', zIndex: 1 }}
            >
              <span style={{ fontSize: 36 }}>📞</span>
              <span style={{ color: 'white', fontWeight: 800, fontSize: 16, marginTop: 6 }}>Call {guardianName}</span>
            </button>
          </div>

          <p style={{ fontSize: 13, color: '#9ca3af', margin: 0 }}>Initiates a realistic AI call using your cloned voice</p>
        </div>

        {/* Family members (Pro) */}
        <div style={{ background: 'white', borderRadius: 20, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>Family Members</h3>
            {isPro ? (
              <button
                onClick={() => navigate('familyInvite')}
                style={{ background: '#e8f7f2', color: '#1D9E75', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                + Add
              </button>
            ) : (
              <button
                onClick={() => navigate('subscription')}
                style={{ background: '#fef3c7', color: '#d97706', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              >
                ⭐ Pro
              </button>
            )}
          </div>
          {isPro && appState.familyMembers?.length > 0 ? (
            appState.familyMembers.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f3f4f6' : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#e8f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  {m.relationship === 'child' ? '👧' : m.relationship === 'spouse' ? '💑' : '👤'}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: '#111827' }}>{m.name}</p>
                  <p style={{ margin: 0, fontSize: 12, color: '#9ca3af', textTransform: 'capitalize' }}>{m.relationship}</p>
                </div>
                <span style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: '#1D9E75' }} />
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <p style={{ fontSize: 14, color: '#9ca3af', margin: 0 }}>
                {isPro ? 'No family members yet. Add one!' : 'Upgrade to Pro to add family members'}
              </p>
            </div>
          )}
        </div>

        {/* Recent calls */}
        <div style={{ background: 'white', borderRadius: 20, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#111827' }}>Recent Calls</h3>
          {recentCalls.length > 0 ? (
            recentCalls.slice(0, 5).map((call, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f3f4f6' : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#e8f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📞</div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: '#111827' }}>Call to {call.guardian}</p>
                  <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>{formatTime(call.timestamp)} · {call.duration}s</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontSize: 14, color: '#9ca3af', margin: 0, textAlign: 'center', padding: '8px 0' }}>
              No calls yet. Tap the button above to start!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
