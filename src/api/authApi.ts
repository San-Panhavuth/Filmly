// src/api/authApi.ts
// Handles authentication API calls for Filmly backend

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signup(email: string, password: string, username: string) {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || 'Signup failed');
  
  // Save tokens for session
  if (data.session?.access_token) {
    localStorage.setItem('access_token', data.session.access_token);
    localStorage.setItem('refresh_token', data.session.refresh_token || '');
  }
  
  // Also save user data
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || 'Login failed');
  
  // Save tokens for session
  if (data.session?.access_token) {
    localStorage.setItem('access_token', data.session.access_token);
    localStorage.setItem('refresh_token', data.session.refresh_token || '');
  }
  
  // Also save user data
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
}

export async function logout() {
  // Get token from localStorage
  const accessToken = localStorage.getItem('access_token');
  
  if (accessToken) {
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!res.ok) {
        console.warn('Logout request failed, but clearing local session anyway');
      }
    } catch (error) {
      console.warn('Logout request error, but clearing local session anyway', error);
    }
  }
  
  // Always clear local storage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  
  return true;
}

export async function getCurrentUser(accessToken?: string) {
  const token = accessToken || localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No access token available');
  }
  
  const res = await fetch(`${API_URL}/api/auth/currentUser`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || 'Get user failed');
  return data;
}

export async function updateProfile(profile: unknown, accessToken?: string) {
  const token = accessToken || localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No access token available');
  }
  
  const res = await fetch(`${API_URL}/api/user-profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || 'Update profile failed');
  return data;
}

// Helper to check if user is authenticated
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('access_token');
}

// Helper to get stored user
export function getStoredUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}
