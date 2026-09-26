import { NavLink, useNavigate } from 'react-router-dom';
import { clearAdminToken } from '../adminAuth.js';

export default function AdminNav() {
  const navigate = useNavigate();

  function handleLogout() {
    clearAdminToken();
    navigate('/admin/login');
  }

  return (
    <div className="admin-nav">
      <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>Products</NavLink>
      <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>Orders</NavLink>
      <button className="btn-secondary" onClick={handleLogout}>Log Out</button>
    </div>
  );
}
