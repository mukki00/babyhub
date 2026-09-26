const TOKEN_KEY = 'bh_admin_token';

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY);
export const setAdminToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearAdminToken = () => localStorage.removeItem(TOKEN_KEY);
export const isAdminLoggedIn = () => Boolean(getAdminToken());
