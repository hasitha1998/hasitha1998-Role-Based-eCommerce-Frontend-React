// src/pages/NotFound/NotFound.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">Page not found</h2>
        <p className="text-gray-600 mt-2">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button onClick={() => navigate(-1)} variant="ghost">
            Go Back
          </Button>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};