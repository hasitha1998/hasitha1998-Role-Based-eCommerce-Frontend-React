// src/routes/routes.config.ts

export const ROUTES = {
    // Auth
    LOGIN: '/login',
    REGISTER: '/register',
    AUTH_CALLBACK: '/auth/callback',

    // Dashboard
    DASHBOARD: '/dashboard',

    // Products
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/products/:id',
    PRODUCT_CREATE: '/products/new',
    PRODUCT_EDIT: '/products/:id/edit',

    // Orders
    ORDERS: '/orders',
    ORDER_DETAIL: '/orders/:id',

    // Settings
    SETTINGS: '/settings',

    // Profile
    PROFILE: '/profile',

    // Error
    NOT_FOUND: '*',

    // src/routes/routes.config.ts - Add:

    CATEGORIES: '/categories',
    CATEGORY_CREATE: '/categories/new',
    CATEGORY_EDIT: '/categories/:id/edit',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];