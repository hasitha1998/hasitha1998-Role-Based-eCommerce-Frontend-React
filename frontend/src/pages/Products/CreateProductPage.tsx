// src/pages/Products/CreateProductPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { ProductForm } from '@/components/features';
import { useProducts } from '@/hooks';
import { ProductFormData } from '@/services';
import { Spinner } from '@/components/ui';

export const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { categories, createProduct, isLoading } = useProducts();

  console.log('📦 CreateProductPage - categories:', categories);
  console.log('📦 CreateProductPage - isLoading:', isLoading);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await createProduct(data);
      navigate('/products');
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (!categories || categories.length === 0) {
    console.log('⏳ Waiting for categories...');
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <Spinner size="lg" />
          <span className="ml-3 text-gray-600">Loading categories...</span>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Create Product</h1>
        <ProductForm
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  );
};