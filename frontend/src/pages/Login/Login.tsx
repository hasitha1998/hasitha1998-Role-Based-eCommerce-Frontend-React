// src/pages/Login/Login.tsx

import React from 'react';
import { AuthLayout } from '@/components/layout';
import { LoginForm } from '@/components/features';

export const Login: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};