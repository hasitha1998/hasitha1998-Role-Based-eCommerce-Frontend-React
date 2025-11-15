// src/services/product.service.ts

import api from './api';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  sku?: string;
  stock: number;
  images: string[];
  categoryId?: string;
  category?: Category;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  sku?: string;
  stock: number;
  images?: string[];
  categoryId?: string;
  isActive?: boolean;
  isFeatured?: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class ProductService {
  /**
   * Get all products with pagination
   */
  async getAll(params?: PaginationParams): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>('/products', { params });
    return response.data;
  }

  /**
   * Get single product by ID
   */
  async getById(id: string): Promise<Product> {
    const response = await api.get<{ product: Product }>(`/products/${id}`);
    return response.data.product;
  }

  /**
   * Create new product (admin only)
   */
  async create(data: ProductFormData): Promise<Product> {
    const response = await api.post<{ product: Product; message: string }>('/products', data);
    return response.data.product;
  }

  /**
   * Update product (admin only)
   */
  async update(id: string, data: Partial<ProductFormData>): Promise<Product> {
    const response = await api.put<{ product: Product; message: string }>(`/products/${id}`, data);
    return response.data.product;
  }

  /**
   * Delete product (admin only)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    const response = await api.get<{ categories: Category[] }>('/categories');
    return response.data.categories;
  }
}

export const productService = new ProductService();
export default productService;