// src/services/index.ts

export { default as api } from './api';
export { authService } from './auth.service';
export { productService } from './product.service';
export { orderService } from './order.service';
export { dashboardService } from './dashboard.service';
export { settingsService } from './settings.service';
export { userService } from './user.service';
export { categoryService } from './category.service';


// Export types
export type { LoginCredentials, RegisterData, User, AuthResponse } from './auth.service';
export type { Product, Category, ProductFormData, ProductsResponse } from './product.service';
export type { Order, OrderItem, CreateOrderData, OrdersResponse, OrderStatus, PaymentStatus } from './order.service';
export type { DashboardStats } from './dashboard.service';
export type { Setting, CreateSettingData, UpdateSettingData, SettingType } from './settings.service';
export type { UpdateUserData, UsersResponse } from './user.service';
export type { PaginationParams } from './product.service';
export type { Category as CategoryType, CategoryFormData } from './category.service';  