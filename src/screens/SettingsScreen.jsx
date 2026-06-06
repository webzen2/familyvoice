export default function SettingsScreen({ navigate, appState, updateState }) {
  const guardianName = appState.guardianSetup?.guardianName || 'Guardian';
  const isPro = appState.subscription === 'pro';
  const userName = appState.user?.name || 'User';
  const userEmail = appState.user?.email || '';

  function signOut() {
    updateState({ user: null, voiceId: null });
    localStorage.removeItem('familyvoice_state');
    navigate('splash');
  }

  const row = { display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f3f4f6', cursor: 'pointer' };
  const rowIcon = { fontSize: 20, marginRight: 14, width: 28, textAlign: 'center' };
  const rowLabel = { flex: 1, fontSize: 15, color: '#111827', fontWeight: 500 };
  const chevron = { color: '#d1d5db', fontSize: 16 };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
      {/* Header */}
      <div style={{ background: '#1D9E75', padding: '50px 24px 24px' }}>
        <button onClick={() => navigate('dashboard')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: 14, cursor: 'pointer', marginBottom: 8, padding: 0 }}>← Back</button>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>Settings</h1>
      </div>

      {/* Profile card */}
      <div style={{ margin: '16px 16px 0', background: 'white', borderRadius: 18, padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: '#e8f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🙋</div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 17, color: '#111827' }}>{userName}</p>
            <p style={{ margin: '2px 0 0', fontSize: 13, color: '#9ca3af' }}>{userEmail}</p>
            <span style={{ display: 'inline-block', marginTop: 4, background: isPro ? '#dcfce7' : '#f3f4f6', color: isPro ? '#16a34a' : '#6b7280', fontSize: 11, fontWeight: 700, borderRadius: 6, padding: '2px 8px' }}>
              {isPro ? '⭐ PRO PLAN' : 'FREE PLAN'}
            </span>
          </div>
        </div>
      </div>

      {/* Settings sections */}
      <div style={{ margin: '12px 16px 0', background: 'white', borderRadius: 18, padding: '0 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', padding: '14px 0 2px', margin: 0 }}>Guardian</p>

        <div style={row} onClick={() => navigate('guardianName')}>
          <span style={rowIcon}>✏️</span>
          <div style={rowLabel}>
            <div>Guardian Name</div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 1 }}>{guardianName}</div>
          </div>
          <span style={chevron}>›</span>
        </div>

        <div style={row} onClick={() => navigate('personalization')}>
          <span style={rowIcon}>🎭</span>
          <div style={rowLabel}>AI Personality</div>
          <span style={chevron}>›</span>
        </div>

        <div style={{ ...row, borderBottom: 'none' }} onClick={() => navigate('voiceRecord')}>
          <span style={rowIcon}>🎙️</span>
          <div style={rowLabel}>
            <div>Re-record Voice</div>
            <div style={{ fontSize: 13, color: appState.voiceId ? '#1D9E75' : '#ef4444', marginTop: 1 }}>
              {appState.voiceId ? '✓ Voice cloned' : '⚠ No voice recorded'}
            </div>
          </div>
          <span style={chevron}>›</span>
        </div>
      </div>

      <div style={{ margin: '12px 16px 0', background: 'white', borderRadius: 18, padding: '0 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', padding: '14px 0 2px', margin: 0 }}>Family</p>

        <div style={{ ...row, borderBottom: 'none' }} onClick={() => navigate('familyInvite')}>
          <span style={rowIcon}>👨‍👩‍👧‍👦</span>
          <div style={rowLabel}>
            <div>Manage Family Members</div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 1 }}>
              {isPro ? `${appState.familyMembers?.length || 0} members` : 'Pro feature'}
            </div>
          </div>
          <span style={chevron}>›</span>
        </div>
      </div>

      <div style={{ margin: '12px 16px 0', background: 'white', borderRadius: 18, padding: '0 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', padding: '14px 0 2px', margin: 0 }}>Account</p>

        {!isPro && (
          <div style={row} onClick={() => navigate('subscription')}>
            <span style={rowIcon}>⭐</span>
            <div style={rowLabel} style={{ flex: 1, fontSize: 15, color: '#d97706', fontWeight: 700 }}>Upgrade to Pro</div>
            <span style={chevron}>›</span>
          </div>
        )}

        <div style={{ ...row, borderBottom: 'none', cursor: 'pointer' }} onClick={signOut}>
          <span style={rowIcon}>🚪</span>
          <span style={{ ...rowLabel, color: '#ef4444' }}>Sign Out</span>
        </div>
      </div>

      <div style={{ padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#d1d5db', margin: 0 }}>FamilyVoice v1.0 · Your voice. Their protection.</p>
      </div>
    </div>
  );
}
