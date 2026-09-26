import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../api.js';
import { setAdminToken } from '../../adminAuth.js';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await adminLogin(username, password);
      setAdminToken(token);
      navigate('/admin');
    } catch {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Admin Login</h2>
        <p className="auth-sub">Manage Baby Hub products</p>
        <form onSubmit={handleSubmit}>
          <div className="form-grp">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          </div>
          <div className="form-grp">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
        </form>
      </div>
    </div>
  );
}
