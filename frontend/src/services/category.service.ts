// src/services/category.service.ts

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

export interface CategoryFormData {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

class CategoryService {
  async getAll(): Promise<Category[]> {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  }

  async getById(id: string): Promise<Category> {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  }

  async create(data: CategoryFormData): Promise<Category> {
    const response = await api.post<Category>('/categories', data);
    return response.data;
  }

  async update(id: string, data: Partial<CategoryFormData>): Promise<Category> {
    const response = await api.put<Category>(`/categories/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  }
}

export const categoryService = new CategoryService();
export default categoryService;