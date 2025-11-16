// src/pages/Categories/CreateCategoryPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { CategoryForm } from '@/components/features';
import { useCategories } from '@/hooks';
import { CategoryFormData } from '@/services';

export const CreateCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { createCategory } = useCategories();

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      await createCategory(data);
      navigate('/categories');
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-3xl font-bold">Create Category</h1>
        <CategoryForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/categories')}
        />
      </div>
    </MainLayout>
  );
};