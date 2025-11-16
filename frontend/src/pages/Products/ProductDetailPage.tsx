// src/pages/Products/ProductDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { useProducts } from '@/hooks';
import { Product } from '@/services';
import { Card, CardBody, Badge, Button, Spinner } from '@/components/ui';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      if (id) {
        const data = await getProduct(id);
        setProduct(data);
      }
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
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

  if (!product) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Button onClick={() => navigate('/products')} className="mt-4">
            Back to Products
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate('/products')}>
              Back
            </Button>
            <Button onClick={() => navigate(`/products/${id}/edit`)}>
              Edit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardBody>
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded flex items-center justify-center">
                  No Image
                </div>
              )}
            </CardBody>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardBody>
                <h3 className="font-bold text-lg mb-4">Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-600">Price</dt>
                    <dd className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Stock</dt>
                    <dd className="font-medium">{product.stock} units</dd>
                  </div>
                  {product.sku && (
                    <div>
                      <dt className="text-sm text-gray-600">SKU</dt>
                      <dd>{product.sku}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm text-gray-600">Status</dt>
                    <dd>
                      <Badge variant={product.isActive ? 'success' : 'danger'}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </dd>
                  </div>
                </dl>
              </CardBody>
            </Card>

            {product.description && (
              <Card>
                <CardBody>
                  <h3 className="font-bold text-lg mb-4">Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};