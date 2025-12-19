// src/lib/auth/AuthProvider.tsx
// Auth Provider component that initializes authentication on mount

'use client';

import { useEffect } from 'react';
import { initializeAuth } from './authHelpers';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize auth on mount
    initializeAuth().finally(() => {
      // Initialization complete
    });
  }, []);

  // You can show a loading state while initializing if needed
  // For now, we'll render children immediately
  return <>{children}</>;
}
