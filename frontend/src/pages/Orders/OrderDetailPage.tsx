// src/pages/Orders/OrderDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { OrderDetails } from '@/components/features';
import { useOrders } from '@/hooks';
import { Order, OrderStatus } from '@/services';
import { Button, Spinner, Alert } from '@/components/ui';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrder, updateOrderStatus } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  const loadOrder = async () => {
    try {
      if (id) {
        const data = await getOrder(id);
        setOrder(data);
      }
    } catch (err) {
      setError('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      setUpdating(true);
      const updatedOrder = await updateOrderStatus(orderId, status);
      setOrder(updatedOrder);
    } catch (err) {
      setError('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (!order) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Order not found</h2>
          <Button onClick={() => navigate('/orders')} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <Button variant="secondary" onClick={() => navigate('/orders')}>
            Back to Orders
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <OrderDetails
          order={order}
          onStatusChange={handleStatusChange}
          isUpdating={updating}
        />
      </div>
    </MainLayout>
  );
};