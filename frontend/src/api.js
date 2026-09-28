const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = typeof data.detail === 'string' ? data.detail : 'Request failed.';
    throw new ApiError(response.status, detail);
  }
  return data;
}

export async function login(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('current_user', JSON.stringify(data.user));
  return data;
}

export async function register(user) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('current_user');
}

export function getEvents() {
  return request('/events?limit=50');
}

export function getAlerts() {
  return request('/alerts');
}

export function markAlertRead(id) {
  return request(`/alerts/${id}/read`, { method: 'PATCH' });
}