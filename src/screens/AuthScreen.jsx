import { useState } from 'react';

export default function AuthScreen({ navigate, updateState }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (isSignUp && !name) { setError('Please enter your name.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    updateState({ user: { email, name: name || email.split('@')[0] } });
    navigate('whoSetup');
  }

  function handleGoogle() {
    updateState({ user: { email: 'user@gmail.com', name: 'Google User' } });
    navigate('whoSetup');
  }

  const input = {
    width: '100%',
    padding: '14px 16px',
    border: '1.5px solid #e5e7eb',
    borderRadius: 12,
    fontSize: 16,
    outline: 'none',
    background: '#fafafa',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      {/* Header */}
      <div style={{ background: '#1D9E75', padding: '50px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🛡️</div>
        <h1 style={{ color: 'white', fontSize: 24, fontWeight: 800, margin: '0 0 4px' }}>FamilyVoice</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: 0 }}>{isSignUp ? 'Create your account' : 'Welcome back'}</p>
      </div>

      <div style={{ flex: 1, padding: '32px 24px' }}>
        {/* Toggle */}
        <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 12, padding: 4, marginBottom: 28 }}>
          {['Sign Up', 'Sign In'].map((label, i) => (
            <button
              key={label}
              onClick={() => { setIsSignUp(i === 0); setError(''); }}
              style={{ flex: 1, padding: '10px', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', background: (i === 0 ? isSignUp : !isSignUp) ? 'white' : 'transparent', color: (i === 0 ? isSignUp : !isSignUp) ? '#1D9E75' : '#6b7280', boxShadow: (i === 0 ? isSignUp : !isSignUp) ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {isSignUp && (
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Your Name</label>
              <input style={input} type="text" placeholder="Sarah Johnson" value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email Address</label>
            <input style={input} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Password</label>
            <input style={input} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          {error && <p style={{ color: '#ef4444', fontSize: 13, margin: '0', textAlign: 'center' }}>{error}</p>}

          <button
            type="submit"
            style={{ width: '100%', padding: '15px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 6 }}
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          <span style={{ color: '#9ca3af', fontSize: 13 }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
        </div>

        <button
          onClick={handleGoogle}
          style={{ width: '100%', padding: '14px', background: 'white', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, marginTop: 24 }}>
          By continuing you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
