// src/lib/auth/authHelpers.ts
// Helper utilities for authentication

import { useAuthStore } from '../../shared/store/authStore';
import * as authApi from '../../api/authApi';

/**
 * Get the current access token from localStorage
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

/**
 * Get the current refresh token from localStorage
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refresh_token');
}

/**
 * Check if user is currently authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

/**
 * Initialize auth state on app load
 * Checks localStorage for tokens and updates the store
 */
export async function initializeAuth() {
  const token = getAccessToken();
  
  if (!token) {
    useAuthStore.getState().signOut();
    return false;
  }
  
  try {
    // Verify token is still valid by fetching current user
    const data = await authApi.getCurrentUser(token);
    
    if (data.user) {
      useAuthStore.getState().setUser(
        data.user.email,
        [],
        undefined,
        data.user
      );
      return true;
    }
  } catch (error) {
    // Token is invalid, clear auth state
    console.error('Token validation failed:', error);
    useAuthStore.getState().signOut();
    return false;
  }
  
  return false;
}

/**
 * Sign out and clear all auth state
 */
export async function signOut() {
  await authApi.logout();
  useAuthStore.getState().signOut();
}
