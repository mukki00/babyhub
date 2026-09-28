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
export const adminUpdateOrder = (id, payload) =>
  request(`/admin/orders/${id}`, { method: 'PUT', body: JSON.stringify(payload), headers: adminHeaders() });
export const adminDeleteOrder = (id) =>
  request(`/admin/orders/${id}`, { method: 'DELETE', headers: adminHeaders() });
export const adminMarkOrderShipped = (id) =>
  request(`/admin/orders/${id}/shipped`, { method: 'PATCH', headers: adminHeaders() });
export const adminSetOrderDelivered = (id, delivered) =>
  request(`/admin/orders/${id}/delivered`, {
    method: 'PATCH',
    body: JSON.stringify({ delivered }),
    headers: adminHeaders(),
  });
export const adminSetOrderPaid = (id, paid) =>
  request(`/admin/orders/${id}/paid`, {
    method: 'PATCH',
    body: JSON.stringify({ paid }),
    headers: adminHeaders(),
  });
export const adminMarkOrderReturned = (id) =>
  request(`/admin/orders/${id}/returned`, { method: 'PATCH', headers: adminHeaders() });
export const adminSetOrderReceived = (id, received) =>
  request(`/admin/orders/${id}/received`, {
    method: 'PATCH',
    body: JSON.stringify({ received }),
    headers: adminHeaders(),
  });
export const adminReshipReturnedOrder = (id) =>
  request(`/admin/orders/${id}/reship`, { method: 'PATCH', headers: adminHeaders() });
export const adminRefundReturnedOrder = (id) =>
  request(`/admin/orders/${id}/refund`, { method: 'PATCH', headers: adminHeaders() });
