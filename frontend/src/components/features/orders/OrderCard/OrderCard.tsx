// src/components/features/orders/OrderCard/OrderCard.tsx

import React from 'react';
import { Card, CardBody, Badge } from '@/components/ui';
import { Order } from '@/services';

interface OrderCardProps {
  order: Order;
  onClick?: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
  const getStatusVariant = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
      delivered: 'success',
      shipped: 'info',
      processing: 'warning',
      pending: 'warning',
      cancelled: 'danger',
    };
    return variants[status] || 'info';
  };

  const getPaymentStatusVariant = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger'> = {
      paid: 'success',
      pending: 'warning',
      failed: 'danger',
      refunded: 'warning',
    };
    return variants[status] || 'warning';
  };

  // Helper function to safely format amount
  const formatAmount = (amount: any): string => {
    if (typeof amount === 'number') {
      return amount.toFixed(2);
    }
    if (typeof amount === 'string') {
      const parsed = parseFloat(amount);
      return isNaN(parsed) ? '0.00' : parsed.toFixed(2);
    }
    return '0.00';
  };

  return (
    <Card hover onClick={() => onClick?.(order)} className="cursor-pointer">
      <CardBody>
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-lg text-gray-900">
                {order.orderNumber}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Badge variant={getStatusVariant(order.status)}>
              {order.status}
            </Badge>
          </div>

          {/* Customer */}
          <div>
            <p className="text-sm text-gray-600">Customer</p>
            <p className="font-medium text-gray-900">{order.user?.email || 'N/A'}</p>
          </div>

          {/* Amount & Payment */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-xl font-bold text-blue-600">
                ${formatAmount(order.totalAmount)}
              </p>
            </div>
            <Badge variant={getPaymentStatusVariant(order.paymentStatus)}>
              {order.paymentStatus}
            </Badge>
          </div>

          {/* Items Count */}
          {order.items && (
            <p className="text-sm text-gray-500">
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
};