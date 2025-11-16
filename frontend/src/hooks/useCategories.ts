// src/hooks/useCategories.ts

import { useState, useEffect } from 'react';
import { categoryService, Category, CategoryFormData } from '@/services';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔵 useCategories mounted');
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log('🔵 Fetching categories...');
      setIsLoading(true);
      const data = await categoryService.getAll();
      console.log('✅ Categories fetched:', data);
      setCategories(data);
    } catch (err: any) {
      console.error('❌ Failed to fetch categories:', err);
      console.error('Error response:', err.response?.data);
      setError('Failed to fetch categories');
    } finally {
      setIsLoading(false);
      console.log('🔵 Fetch complete');
    }
  };

  const createCategory = async (data: CategoryFormData) => {
    console.log('🔵 Creating category:', data);
    const newCategory = await categoryService.create(data);
    console.log('✅ Category created:', newCategory);
    setCategories([...categories, newCategory]);
    return newCategory;
  };

  const updateCategory = async (id: string, data: Partial<CategoryFormData>) => {
    const updated = await categoryService.update(id, data);
    setCategories(categories.map(c => c.id === id ? updated : c));
    return updated;
  };

  const deleteCategory = async (id: string) => {
    await categoryService.delete(id);
    setCategories(categories.filter(c => c.id !== id));
  };

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};