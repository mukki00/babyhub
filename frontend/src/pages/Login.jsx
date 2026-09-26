import { useState } from 'react';
import { showToast } from '../legacyMain.js';

export default function Login() {
  const [tab, setTab] = useState('login');

  function handleLogin(e) {
    e.preventDefault();
    showToast('Login functionality coming soon!', 'ok');
  }
  function handleRegister(e) {
    e.preventDefault();
    showToast('Account created! Welcome to Baby Hub.', 'ok');
  }

  return (
    <div style={{ minHeight: '80vh', background: '#faf6f1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 8px 40px rgba(26,35,64,0.10)', width: '100%', maxWidth: 440, overflow: 'hidden' }}>

        <div style={{ display: 'flex', borderBottom: '1px solid #e4ddd5' }}>
          <button
            onClick={() => setTab('login')}
            style={{ flex: 1, padding: 18, background: 'none', border: 'none', fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer', color: tab === 'login' ? '#1a2340' : '#888', borderBottom: tab === 'login' ? '2px solid #1a2340' : 'none', marginBottom: -1 }}
          >Sign In</button>
          <button
            onClick={() => setTab('register')}
            style={{ flex: 1, padding: 18, background: 'none', border: 'none', fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer', color: tab === 'register' ? '#1a2340' : '#888', borderBottom: tab === 'register' ? '2px solid #1a2340' : 'none', marginBottom: -1 }}
          >Create Account</button>
        </div>

        {tab === 'login' && (
          <div style={{ padding: 36 }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <span className="logo-script" style={{ fontSize: 32, color: '#1a2340' }}>Baby Hub</span>
              <p style={{ fontSize: 13, color: '#888', marginTop: 6 }}>Welcome back, mama &amp; papa!</p>
            </div>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>Email</label>
                <input type="email" name="email" placeholder="your@email.com" required style={{ width: '100%', padding: '12px 14px', border: '1px solid #e4ddd5', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}/>
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>Password</label>
                <input type="password" name="password" placeholder="••••••••" required style={{ width: '100%', padding: '12px 14px', border: '1px solid #e4ddd5', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}/>
              </div>
              <div style={{ textAlign: 'right', marginBottom: 22 }}>
                <a href="#" style={{ fontSize: 13, color: '#1a2340' }}>Forgot password?</a>
              </div>
              <button type="submit" style={{ width: '100%', padding: 14, background: '#1a2340', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Sign In</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#888' }}>Don't have an account? <button onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: '#1a2340', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Create one</button></p>
          </div>
        )}

        {tab === 'register' && (
          <div style={{ padding: 36 }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <span className="logo-script" style={{ fontSize: 32, color: '#1a2340' }}>Baby Hub</span>
              <p style={{ fontSize: 13, color: '#888', marginTop: 6 }}>Join the Baby Hub family today!</p>
            </div>
            <form onSubmit={handleRegister}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>First Name</label>
                  <input type="text" name="first_name" placeholder="Sarah" required style={{ width: '100%', padding: '12px 14px', border: '1px solid #e4ddd5', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}/>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>Last Name</label>
                  <input type="text" name="last_name" placeholder="Silva" required style={{ width: '100%', padding: '12px 14px', border: '1px solid #e4ddd5', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}/>
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>Email</label>
                <input type="email" name="email" placeholder="your@email.com" required style={{ width: '100%', padding: '12px 14px', border: '1px solid #e4ddd5', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}/>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>Phone</label>
                <input type="tel" name="phone" placeholder="+94 77 XXX XXXX" style={{ width: '100%', padding: '12px 14px', border: '1px solid #e4ddd5', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}/>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>Password</label>
                <input type="password" name="password" placeholder="At least 8 characters" required minLength={8} style={{ width: '100%', padding: '12px 14px', border: '1px solid #e4ddd5', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}/>
              </div>
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: 'flex', gap: 10, fontSize: 13, color: '#4a4a6a', cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input type="checkbox" name="newsletter" style={{ marginTop: 2, flexShrink: 0 }}/>
                  <span>Subscribe to our newsletter for exclusive offers and new arrivals</span>
                </label>
              </div>
              <button type="submit" style={{ width: '100%', padding: 14, background: '#1a2340', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Create Account</button>
              <p style={{ fontSize: 11.5, color: '#aaa', textAlign: 'center', marginTop: 12 }}>By creating an account you agree to our <a href="/pages/returns" style={{ color: '#888' }}>Terms &amp; Privacy Policy</a>.</p>
            </form>
            <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#888' }}>Already have an account? <button onClick={() => setTab('login')} style={{ background: 'none', border: 'none', color: '#1a2340', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Sign in</button></p>
          </div>
        )}
      </div>
    </div>
  );
}
