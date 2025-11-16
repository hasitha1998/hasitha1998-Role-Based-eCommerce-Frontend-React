// src/hooks/useProducts.ts

import { useState, useEffect } from 'react';
import { productService, categoryService, Product, ProductFormData, Category } from '@/services';

interface UseProductsReturn {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchProducts: (page?: number, limit?: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  getProduct: (id: string) => Promise<Product>;
  createProduct: (data: ProductFormData) => Promise<Product>;
  updateProduct: (id: string, data: Partial<ProductFormData>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchProducts = async (page: number = 1, limit: number = 10) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productService.getAll({ page, limit });
      setProducts(response.products);
      setPagination(response.pagination);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch products';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      console.log('🔵 useProducts - Fetching categories...');
      setError(null);
      const categoriesData = await categoryService.getAll();  // ← Changed from productService
      console.log('✅ useProducts - Categories:', categoriesData);
      setCategories(categoriesData);
    } catch (err: any) {
      console.error('❌ useProducts - Category fetch error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch categories';
      setError(errorMessage);
    }
  };

  const getProduct = async (id: string): Promise<Product> => {
    try {
      setIsLoading(true);
      setError(null);
      const product = await productService.getById(id);
      return product;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch product';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (data: ProductFormData): Promise<Product> => {
    try {
      setIsLoading(true);
      setError(null);
      const newProduct = await productService.create(data);
      await fetchProducts(pagination.page, pagination.limit);
      return newProduct;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create product';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: string, data: Partial<ProductFormData>): Promise<Product> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedProduct = await productService.update(id, data);
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update product';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await productService.delete(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to delete product';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    console.log('🔵 useProducts mounted');
    fetchProducts();
    fetchCategories();
  }, []);

  return {
    products,
    categories,
    isLoading,
    error,
    pagination,
    fetchProducts,
    fetchCategories,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    clearError,
  };
};