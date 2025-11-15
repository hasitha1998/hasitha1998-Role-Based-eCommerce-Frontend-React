// src/services/order.service.ts

import api from './api';
import { User } from './auth.service';
import { Product } from './product.service';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user?: User;
  status: OrderStatus;
  totalAmount: number;
  shippingAddress?: ShippingAddress;
  billingAddress?: ShippingAddress;
  paymentMethod?: string;
  paymentStatus: PaymentStatus;
  notes?: string;
  items?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderData {
  items: CreateOrderItem[];
  shippingAddress?: ShippingAddress;
  paymentMethod?: string;
  notes?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface OrdersResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class OrderService {
  /**
   * Get all orders (filtered by role on backend)
   * Admin sees all orders, users see only their own
   */
  async getAll(params?: PaginationParams): Promise<OrdersResponse> {
    const response = await api.get<OrdersResponse>('/orders', { params });
    return response.data;
  }

  /**
   * Get single order by ID
   */
  async getById(id: string): Promise<Order> {
    const response = await api.get<{ order: Order }>(`/orders/${id}`);
    return response.data.order;
  }

  /**
   * Create new order
   */
  async create(data: CreateOrderData): Promise<Order> {
    const response = await api.post<{ order: Order; message: string }>('/orders', data);
    return response.data.order;
  }

  /**
   * Update order status (admin only)
   */
  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const response = await api.put<{ order: Order; message: string }>(`/orders/${id}/status`, { status });
    return response.data.order;
  }
}

export const orderService = new OrderService();
export default orderService;