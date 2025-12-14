'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Component that redirects password reset links to the correct page
 * This handles cases where Supabase redirects to / with recovery tokens in the hash
 */
export default function PasswordResetRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run on the home page
    if (pathname !== '/') return;

    // Check if this is a password reset redirect
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const type = hashParams.get('type');
      const accessToken = hashParams.get('access_token');

      // If this is a recovery type with an access token, redirect to reset password page
      if (type === 'recovery' && accessToken) {
        console.log('[PasswordResetRedirect] Detected password reset, redirecting...');
        // Preserve the hash parameters
        router.push(`/reset-password${window.location.hash}`);
      }
    }
  }, [pathname, router]);

  return null; // This component doesn't render anything
}
