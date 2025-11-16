// src/components/layout/AuthLayout/AuthLayout.tsx

import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with Logo */}
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              eCommerce Admin
            </span>
          </div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} eCommerce Admin. All rights reserved.
        </div>
      </div>
    </div>
  );
};