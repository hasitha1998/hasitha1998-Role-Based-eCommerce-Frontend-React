// src/services/user.service.ts

import api from './api';
import { User } from './auth.service';

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class UserService {
  /**
   * Get all users (admin only)
   */
  async getAll(params?: PaginationParams): Promise<UsersResponse> {
    const response = await api.get<UsersResponse>('/users', { params });
    return response.data;
  }

  /**
   * Get single user by ID
   * Admin can view any user, regular users can only view themselves
   */
  async getById(id: string): Promise<User> {
    const response = await api.get<{ user: User }>(`/users/${id}`);
    return response.data.user;
  }

  /**
   * Update user
   * Admin can update any user, regular users can only update themselves
   */
  async update(id: string, data: UpdateUserData): Promise<User> {
    const response = await api.put<{ user: User; message: string }>(`/users/${id}`, data);
    return response.data.user;
  }

  /**
   * Delete user (admin only)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }
}

export const userService = new UserService();
export default userService;