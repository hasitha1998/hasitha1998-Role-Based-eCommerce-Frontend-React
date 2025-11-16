// src/pages/Orders/OrdersPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { OrderList } from '@/components/features';
import { useOrders } from '@/hooks';
import { Order } from '@/services';
import { Alert } from '@/components/ui';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders, isLoading, error } = useOrders();

  const handleOrderClick = (order: Order) => {
    navigate(`/orders/${order.id}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Orders</h1>

        {error && <Alert variant="danger">{error}</Alert>}

        <OrderList
          orders={orders}
          isLoading={isLoading}
          onOrderClick={handleOrderClick}
        />
      </div>
    </MainLayout>
  );
};