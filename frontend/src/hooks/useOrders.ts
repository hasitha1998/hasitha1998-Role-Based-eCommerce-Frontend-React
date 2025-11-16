// src/hooks/useOrders.ts

import { useState, useEffect } from 'react';
import { orderService, Order, CreateOrderData, OrderStatus } from '@/services';

interface UseOrdersReturn {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchOrders: (page?: number, limit?: number) => Promise<void>;
  getOrder: (id: string) => Promise<Order>;
  createOrder: (data: CreateOrderData) => Promise<Order>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<Order>;
  clearError: () => void;
}

export const useOrders = (): UseOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchOrders = async (page: number = 1, limit: number = 10) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await orderService.getAll({ page, limit });
      setOrders(response.orders);
      setPagination(response.pagination);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch orders';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrder = async (id: string): Promise<Order> => {
    try {
      setIsLoading(true);
      setError(null);
      const order = await orderService.getById(id);
      return order;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch order';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (data: CreateOrderData): Promise<Order> => {
    try {
      setIsLoading(true);
      setError(null);
      const newOrder = await orderService.create(data);
      // Refresh orders list
      await fetchOrders(pagination.page, pagination.limit);
      return newOrder;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create order';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus): Promise<Order> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedOrder = await orderService.updateStatus(id, status);
      // Update orders list
      setOrders(orders.map(o => o.id === id ? updatedOrder : o));
      return updatedOrder;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update order status';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Auto-fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    isLoading,
    error,
    pagination,
    fetchOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    clearError,
  };
};