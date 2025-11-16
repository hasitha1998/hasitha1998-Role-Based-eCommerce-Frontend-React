// src/components/features/orders/OrderDetails/OrderDetails.tsx

import React from 'react';
import { Order, OrderStatus } from '@/services';
import { Card, CardHeader, CardTitle, CardBody, Badge, Select, Button } from '@/components/ui';

interface OrderDetailsProps {
  order: Order;
  onStatusChange?: (orderId: string, status: OrderStatus) => Promise<void>;
  isUpdating?: boolean;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  onStatusChange,
  isUpdating,
}) => {
  const [selectedStatus, setSelectedStatus] = React.useState<OrderStatus>(order.status);

  const calculateTotal = () => {
    if (!order.items || order.items.length === 0) return 0;
    return order.items.reduce((sum, item) => sum + Number(item.subtotal), 0);
  };

  const calculatedTotal = calculateTotal();

  const handleStatusChange = async () => {
    if (selectedStatus !== order.status && onStatusChange) {
      await onStatusChange(order.id, selectedStatus);
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

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

  return (
    <div className="space-y-6">
      {/* Order Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Order {order.orderNumber}</CardTitle>
            <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer</p>
              <p className="font-medium">{order.user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Status</p>
              <p className="font-medium capitalize">{order.paymentStatus}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-medium">{order.paymentMethod || 'N/A'}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardBody>
          {order.items && order.items.length > 0 ? (
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {item.product?.name || 'Product'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity} × ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${Number(item.subtotal).toFixed(2)}
                  </p>
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">
                    ${Number(order.totalAmount).toFixed(2)}
                    {calculatedTotal !== Number(order.totalAmount) && (
                      <span className="text-sm text-red-600 ml-2">
                        (Calculated: ${calculatedTotal.toFixed(2)})
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No items in this order</p>
          )}
        </CardBody>
      </Card>

      {/* Shipping Address */}
      {order.shippingAddress && (
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="text-gray-700">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Update Status */}
      {onStatusChange && (
        <Card>
          <CardHeader>
            <CardTitle>Update Order Status</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex gap-4">
              <div className="flex-1">
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                  options={statusOptions}
                  fullWidth
                />
              </div>
              <Button
                onClick={handleStatusChange}
                isLoading={isUpdating}
                disabled={selectedStatus === order.status}
              >
                Update Status
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Notes */}
      {order.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Order Notes</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-gray-700">{order.notes}</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};