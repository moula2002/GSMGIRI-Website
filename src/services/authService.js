const API_BASE = 'https://gsmgiri-website-backend.onrender.com/api/auth';

export const register = async (username, email, mobile, password, currency, company) => {
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, mobile, password, currency, company })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Registration failed');
  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Login failed');
  return data;
};

export const updateProfile = async (email, profileData) => {
  const response = await fetch(`https://gsmgiri-website-backend.onrender.com/api/users/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, ...profileData })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Profile update failed');
  return data;
};
