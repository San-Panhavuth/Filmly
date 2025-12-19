// src/api/userApi.ts
// Helper to fetch user profile by user ID (returns email)
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserProfileById(userId: string, accessToken?: string) {
  const token = accessToken || (typeof window !== 'undefined' ? localStorage.getItem('access_token') : null);
  if (!token) throw new Error('No access token available');
  const res = await fetch(`${API_URL}/api/user-profile?id=${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || 'Failed to fetch user profile');
  // If the response is { profile: {...} }, return profile
  if (data && data.profile) return data.profile;
  // If the response is an array, return the first item
  if (Array.isArray(data) && data.length > 0) return data[0];
  return null;
}
