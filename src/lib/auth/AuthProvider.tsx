// src/lib/auth/AuthProvider.tsx
// Auth Provider component that initializes authentication on mount

'use client';

import { useEffect, useState } from 'react';
import { initializeAuth } from './authHelpers';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize auth on mount
    initializeAuth().finally(() => {
      setInitialized(true);
    });
  }, []);

  // You can show a loading state while initializing if needed
  // For now, we'll render children immediately
  return <>{children}</>;
}
