// src/routes/index.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';
import { ROUTES } from './routes.config';
import {
    Login,
    Register,
    Dashboard,
    ProductsPage,
    ProductDetailPage,
    CreateProductPage,
    OrdersPage,
    OrderDetailPage,
    SettingsPage,
    ProfilePage,
    CategoriesPage,
    CreateCategoryPage,
    NotFound,
} from '@/pages';
import { AuthCallback } from '@/pages/AuthCallback';

export const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallback />} />

                {/* Protected Routes */}
                <Route
                    path={ROUTES.DASHBOARD}
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Products Routes */}
                <Route
                    path={ROUTES.PRODUCTS}
                    element={
                        <ProtectedRoute>
                            <ProductsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.PRODUCT_CREATE}
                    element={
                        <ProtectedRoute requireAdmin>
                            <CreateProductPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.PRODUCT_DETAIL}
                    element={
                        <ProtectedRoute>
                            <ProductDetailPage />
                        </ProtectedRoute>
                    }
                />

                {/* Orders Routes */}
                <Route
                    path={ROUTES.ORDERS}
                    element={
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.ORDER_DETAIL}
                    element={
                        <ProtectedRoute>
                            <OrderDetailPage />
                        </ProtectedRoute>
                    }
                />

                {/* Settings (Admin Only) */}
                <Route
                    path={ROUTES.SETTINGS}
                    element={
                        <AdminRoute>
                            <SettingsPage />
                        </AdminRoute>
                    }
                />

                {/* Profile */}
                <Route
                    path={ROUTES.PROFILE}
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.CATEGORIES}
                    element={
                        <AdminRoute>
                            <CategoriesPage />
                        </AdminRoute>
                    }
                />
                <Route
                    path={ROUTES.CATEGORY_CREATE}
                    element={
                        <AdminRoute>
                            <CreateCategoryPage />
                        </AdminRoute>
                    }
                />

                {/* Default & 404 */}
                <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};