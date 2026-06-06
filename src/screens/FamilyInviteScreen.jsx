import { useState } from 'react';

const RELATIONSHIPS = ['child', 'spouse', 'sibling', 'parent', 'friend', 'other'];

export default function FamilyInviteScreen({ navigate, appState, updateState }) {
  const isPro = appState.subscription === 'pro';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [error, setError] = useState('');
  const members = appState.familyMembers || [];

  function addMember() {
    if (!name || !relationship) { setError('Please fill in name and relationship.'); return; }
    if (members.length >= 6) { setError('Pro plan supports up to 6 family members.'); return; }
    const inviteCode = Math.random().toString(36).slice(2, 8).toUpperCase();
    const newMember = { name, phone, relationship, inviteCode, inviteLink: `https://familyvoice.app/join/${inviteCode}` };
    updateState({ familyMembers: [...members, newMember] });
    setName(''); setPhone(''); setRelationship(''); setError('');
  }

  function removeMember(index) {
    updateState({ familyMembers: members.filter((_, i) => i !== index) });
  }

  const input = { width: '100%', padding: '12px 14px', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 15, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', background: '#fafafa' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      <div style={{ background: '#1D9E75', padding: '50px 24px 24px' }}>
        <button onClick={() => navigate('dashboard')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: 14, cursor: 'pointer', marginBottom: 8, padding: 0 }}>← Back</button>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>Family Members</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: '6px 0 0' }}>Invite loved ones — they get their own Call button</p>
      </div>

      {!isPro && (
        <div style={{ margin: '16px 20px 0', background: '#fef3c7', borderRadius: 14, padding: '14px 16px', border: '1px solid #fcd34d' }}>
          <p style={{ margin: 0, fontSize: 14, color: '#92400e', fontWeight: 600 }}>⭐ Pro feature</p>
          <p style={{ margin: '4px 0 8px', fontSize: 13, color: '#78350f' }}>Upgrade to Pro to add family members and share your protective voice.</p>
          <button onClick={() => navigate('subscription')} style={{ background: '#d97706', color: 'white', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Upgrade to Pro
          </button>
        </div>
      )}

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {isPro && (
          <div style={{ background: '#f9fafb', borderRadius: 16, padding: '18px', marginBottom: 20 }}>
            <h3 style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 700, color: '#111827' }}>Add Family Member</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input style={input} type="text" placeholder="Their name" value={name} onChange={e => setName(e.target.value)} />
              <input style={input} type="tel" placeholder="Phone number (optional)" value={phone} onChange={e => setPhone(e.target.value)} />
              <select style={{ ...input, color: relationship ? '#111827' : '#9ca3af' }} value={relationship} onChange={e => setRelationship(e.target.value)}>
                <option value="">Select relationship...</option>
                {RELATIONSHIPS.map(r => <option key={r} value={r} style={{ color: '#111827', textTransform: 'capitalize' }}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
              </select>
              {error && <p style={{ color: '#ef4444', fontSize: 13, margin: 0 }}>{error}</p>}
              <button onClick={addMember} style={{ padding: '13px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                + Send Invite
              </button>
            </div>
          </div>
        )}

        {members.length > 0 && (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>Invited Members ({members.length}/6)</h3>
            {members.map((m, i) => (
              <div key={i} style={{ background: 'white', border: '1.5px solid #e5e7eb', borderRadius: 16, padding: '16px', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: '#111827' }}>{m.name}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 13, color: '#6b7280', textTransform: 'capitalize' }}>{m.relationship}{m.phone ? ` · ${m.phone}` : ''}</p>
                  </div>
                  <button onClick={() => removeMember(i)} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Remove</button>
                </div>
                <div style={{ background: '#f3f4f6', borderRadius: 10, padding: '10px 12px' }}>
                  <p style={{ margin: '0 0 4px', fontSize: 12, color: '#6b7280', fontWeight: 600 }}>🔗 Invite Link</p>
                  <p style={{ margin: 0, fontSize: 12, color: '#1D9E75', wordBreak: 'break-all', fontFamily: 'monospace' }}>{m.inviteLink}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {members.length === 0 && isPro && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>👨‍👩‍👧‍👦</div>
            <p style={{ color: '#9ca3af', fontSize: 15 }}>Add family members above to share your protective voice</p>
          </div>
        )}
      </div>
    </div>
  );
}
