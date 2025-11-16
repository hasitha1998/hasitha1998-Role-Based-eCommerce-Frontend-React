// src/pages/AuthCallback/AuthCallback.tsx

import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();

  useEffect(() => {
    const handleCallback = () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        console.error('OAuth error:', error);
        navigate('/login?error=oauth_failed');
        return;
      }

      if (token) {
        localStorage.setItem('token', token);

        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const user = {
            id: payload.userId,
            email: payload.email,
            role: payload.role,
            firstName: payload.firstName || '',
            lastName: payload.lastName || '',
            profilePicture: payload.profilePicture || null,
            isActive: true,
            createdAt: payload.iat ? new Date(payload.iat * 1000).toISOString() : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          navigate('/dashboard');
        } catch (err) {
          console.error('Failed to parse token:', err);
          navigate('/login?error=invalid_token');
        }
      } else {
        navigate('/login?error=no_token');
      }
    };

    handleCallback();
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4">
          <svg className="animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Signing you in...</h2>
        <p className="text-gray-600 mt-2">Please wait</p>
      </div>
    </div>
  );
};