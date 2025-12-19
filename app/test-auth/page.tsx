// Test page to verify auth integration
'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/useAuth';
import { signOut } from '@/lib/auth/authHelpers';
import * as authApi from '@/api/authApi';

export default function AuthTestPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const [testResult, setTestResult] = useState<string>('');
  const [testLoading, setTestLoading] = useState(false);

  const testGetCurrentUser = async () => {
    setTestLoading(true);
    setTestResult('');
    try {
      const data = await authApi.getCurrentUser();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setTestResult(`Error: ${error.message}`);
      } else {
        setTestResult('Unknown error');
      }
    }
    setTestLoading(false);
  };

  const handleLogout = async () => {
    setTestLoading(true);
    try {
      await signOut();
      setTestResult('Logged out successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setTestResult(`Logout error: ${error.message}`);
      } else {
        setTestResult('Unknown error');
      }
    }
    setTestLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading auth state...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Auth Integration Test Page</h1>

        {/* Auth State */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
          <div className="space-y-2">
            <p>
              <strong>Authenticated:</strong>{' '}
              <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
                {isAuthenticated ? 'Yes' : 'No'}
              </span>
            </p>
            {user && (
              <>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User ID:</strong> {user.id}</p>
                <p><strong>Email Verified:</strong> {user.email_verified ? 'Yes' : 'No'}</p>
              </>
            )}
          </div>
        </div>

        {/* LocalStorage Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">LocalStorage Tokens</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Access Token:</strong>{' '}
              {typeof window !== 'undefined' && localStorage.getItem('access_token')
                ? `${localStorage.getItem('access_token')?.substring(0, 50)}...`
                : 'None'}
            </p>
            <p>
              <strong>Refresh Token:</strong>{' '}
              {typeof window !== 'undefined' && localStorage.getItem('refresh_token')
                ? 'Present'
                : 'None'}
            </p>
          </div>
        </div>

        {/* Test Actions */}
        {isAuthenticated ? (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
            <div className="space-y-4">
              <button
                onClick={testGetCurrentUser}
                disabled={testLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Test GET /api/auth/currentUser
              </button>
              <button
                onClick={handleLogout}
                disabled={testLoading}
                className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                Logout
              </button>
            </div>
            {testResult && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Test Result:</h3>
                <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                  {testResult}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-800">
              You are not authenticated. Please{' '}
              <a href="/login" className="text-blue-600 underline">
                login
              </a>{' '}
              or{' '}
              <a href="/signup" className="text-blue-600 underline">
                signup
              </a>
              .
            </p>
          </div>
        )}

        {/* API Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Backend API Configuration</h2>
          <p className="text-sm">
            <strong>API URL:</strong>{' '}
            {process.env.NEXT_PUBLIC_API_URL || 'Not configured'}
          </p>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Available Endpoints:</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
              <li>POST /api/auth/signup</li>
              <li>POST /api/auth/login</li>
              <li>POST /api/auth/logout</li>
              <li>GET /api/auth/currentUser</li>
              <li>POST /api/auth/forgetPassword</li>
              <li>POST /api/auth/resetPassword</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
