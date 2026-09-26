const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

function adminHeaders() {
  const token = localStorage.getItem('bh_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ---- Public API ---- */
export const getProducts = () => request('/products');
export const getProduct = (id) => request(`/products/${id}`);
export const createOrder = (order) => request('/orders', { method: 'POST', body: JSON.stringify(order) });

/* ---- Admin API ---- */
export const adminLogin = (username, password) =>
  request('/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) });

export const adminListProducts = () => request('/admin/products', { headers: adminHeaders() });

export const adminCreateProduct = (formData) =>
  request('/admin/products', { method: 'POST', body: formData, headers: adminHeaders() });

export const adminUpdateProduct = (id, formData) =>
  request(`/admin/products/${id}`, { method: 'PUT', body: formData, headers: adminHeaders() });

export const adminDeleteProduct = (id) =>
  request(`/admin/products/${id}`, { method: 'DELETE', headers: adminHeaders() });

export const adminListOrders = () => request('/admin/orders', { headers: adminHeaders() });
export const adminGetOrder = (id) => request(`/admin/orders/${id}`, { headers: adminHeaders() });
