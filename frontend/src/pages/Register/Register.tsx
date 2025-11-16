// src/pages/Register/Register.tsx

import React from 'react';
import { AuthLayout } from '@/components/layout';
import { RegisterForm } from '@/components/features';

export const Register: React.FC = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};