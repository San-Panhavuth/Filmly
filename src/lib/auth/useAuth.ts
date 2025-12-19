// src/lib/auth/useAuth.ts
// Custom React hook for authentication

'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../shared/store/authStore';
import { initializeAuth } from './authHelpers';

export function useAuth(requireAuth: boolean = false) {
  const router = useRouter();
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const didInit = useRef(false);

  useEffect(() => {
    let ignore = false;
    const init = async () => {
      // Check if auth is initialized
      const hasToken = checkAuth();
      if (hasToken && !user && !didInit.current) {
        didInit.current = true;
        await initializeAuth();
      }
      if (!ignore) setLoading(false);
      // Redirect if auth is required but user is not authenticated
      if (requireAuth && !hasToken) {
        router.push('/login');
      }
    };
    init();
    return () => { ignore = true; };
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

  useEffect(() => {
    const hasAuth = checkAuth();
    if (hasAuth) {
      router.push(redirectTo);
    }
    // No setState needed; if not authenticated, just stay on page
  }, [isAuthenticated, router, redirectTo, checkAuth]);

  // No loading state needed for this redirect logic
  return {};
}
