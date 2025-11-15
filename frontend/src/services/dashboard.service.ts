// src/services/dashboard.service.ts

import api from './api';

export interface DashboardStats {
  users: number;
  orders: number;
  products: number;
  revenue: number;
}

class DashboardService {
  /**
   * Get dashboard statistics
   * Admin sees all stats, users see limited stats
   */
  async getStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;