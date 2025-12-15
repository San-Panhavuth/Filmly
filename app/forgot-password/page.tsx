import { Suspense } from 'react';
import ForgotPasswordForm from '@/features/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl items-start justify-center px-6 pt-10">
      <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordForm />
      </Suspense>
    </main>
  );
}