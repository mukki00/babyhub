const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const CACHE_PREFIX = 'babyhub:api-cache:';
const CACHE_TTL = 5 * 60 * 1000;
const inFlightRequests = new Map();

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

function readCache(key) {
  try {
    const cached = JSON.parse(sessionStorage.getItem(`${CACHE_PREFIX}${key}`));
    if (cached && cached.expiresAt > Date.now()) return { hit: true, data: cached.data };
    sessionStorage.removeItem(`${CACHE_PREFIX}${key}`);
  } catch {
    // Storage may be unavailable; fetch normally in that case.
  }
  return { hit: false, data: null };
}

function cachedRequest(key, path, options) {
  const cached = readCache(key);
  if (cached.hit) return Promise.resolve(cached.data);
  if (inFlightRequests.has(key)) return inFlightRequests.get(key);

  const pendingRequest = request(path, options)
    .then((data) => {
      try {
        sessionStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify({
          data,
          expiresAt: Date.now() + CACHE_TTL,
        }));
      } catch {
        // Cache failures should not prevent API responses from being used.
      }
      return data;
    })
    .finally(() => inFlightRequests.delete(key));

  inFlightRequests.set(key, pendingRequest);
  return pendingRequest;
}

function invalidateCache(...keyPrefixes) {
  try {
    for (let index = sessionStorage.length - 1; index >= 0; index -= 1) {
      const key = sessionStorage.key(index);
      if (keyPrefixes.some((prefix) => key?.startsWith(`${CACHE_PREFIX}${prefix}`))) {
        sessionStorage.removeItem(key);
      }
    }
  } catch {
    // Cache invalidation is best-effort when storage is unavailable.
  }
}

function adminHeaders() {
  const token = localStorage.getItem('bh_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ---- Public API ---- */
export const getProducts = () => cachedRequest('products', '/products');
export const getProduct = (id) => cachedRequest(`product-details:${id}`, `/products/${id}`);
export const getProductCategories = () => cachedRequest('product-categories', '/categories');
export const getProductSubCategories = (categoryId) =>
  cachedRequest(`product-subcategories:${categoryId}`, `/categories/${categoryId}/sub-categories`);
export const prefetchProductSubCategories = (categoryIds) =>
  Promise.allSettled(categoryIds.map((categoryId) => getProductSubCategories(categoryId)));
export const getWhatsAppNumber = () => cachedRequest('whatsapp-number', '/whatsapp-number');
export const createOrder = (order) => request('/orders', { method: 'POST', body: JSON.stringify(order) });

/* ---- Admin API ---- */
export const adminLogin = (username, password) =>
  request('/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) });
export const adminChangePassword = (currentPassword, newPassword) =>
  request('/admin/settings/password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
    headers: adminHeaders(),
  });

export const adminGetPhoneNumber = () =>
  cachedRequest('whatsapp-number', '/admin/settings/phone', { headers: adminHeaders() });
export const adminUpdatePhoneNumber = async (phoneNumber) => {
  const result = await request('/admin/settings/phone', {
    method: 'PUT',
    body: JSON.stringify({ phoneNumber }),
    headers: adminHeaders(),
  });
  invalidateCache('whatsapp-number');
  return result;
};

export const adminListProductCategories = () =>
  cachedRequest('product-categories', '/admin/categories', { headers: adminHeaders() });
export const adminListProductSubCategories = (categoryId) =>
  cachedRequest(`product-subcategories:${categoryId}`, `/admin/categories/${categoryId}/sub-categories`, {
    headers: adminHeaders(),
  });

export const adminListProducts = () =>
  cachedRequest('products', '/admin/products', { headers: adminHeaders() });

export const adminCreateProduct = async (formData) => {
  const result = await request('/admin/products', { method: 'POST', body: formData, headers: adminHeaders() });
  invalidateCache('products', 'product-details:');
  return result;
};

export const adminUpdateProduct = async (id, formData) => {
  const result = await request(`/admin/products/${id}`, { method: 'PUT', body: formData, headers: adminHeaders() });
  invalidateCache('products', 'product-details:');
  return result;
};

export const adminDeleteProduct = async (id) => {
  const result = await request(`/admin/products/${id}`, { method: 'DELETE', headers: adminHeaders() });
  invalidateCache('products', 'product-details:');
  return result;
};

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
