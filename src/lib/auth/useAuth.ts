// src/lib/auth/useAuth.ts
// Custom React hook for authentication

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../shared/store/authStore';
import { initializeAuth } from './authHelpers';

export function useAuth(requireAuth: boolean = false) {
  const router = useRouter();
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Check if auth is initialized
      const hasToken = checkAuth();
      
      if (hasToken && !user) {
        // Token exists but user data not loaded, initialize
        await initializeAuth();
      }
      
      setLoading(false);
      
      // Redirect if auth is required but user is not authenticated
      if (requireAuth && !hasToken) {
        router.push('/login');
      }
    };

    init();
  }, [requireAuth, router, user, checkAuth]);

  return {
    user,
    isAuthenticated,
    loading,
  };
}

/**
 * Hook that redirects to login if user is not authenticated
 */
export function useRequireAuth() {
  return useAuth(true);
}

/**
 * Hook that redirects authenticated users away from auth pages
 */
export function useRedirectIfAuthenticated(redirectTo: string = '/choose-role') {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasAuth = checkAuth();
    
    if (hasAuth) {
      router.push(redirectTo);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router, redirectTo, checkAuth]);

  return { loading };
}
