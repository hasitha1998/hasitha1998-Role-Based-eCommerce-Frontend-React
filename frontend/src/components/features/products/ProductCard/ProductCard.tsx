// src/components/features/products/ProductCard/ProductCard.tsx

import React from 'react';
import { Card, CardBody, Badge, Button } from '@/components/ui';
import { Product } from '@/services';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  return (
    <Card hover>
      <CardBody>
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-48 w-full object-cover object-center"
            />
          ) : (
            <div className="h-48 w-full flex items-center justify-center bg-gray-100">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <Badge variant={product.isActive ? 'success' : 'danger'}>
              {product.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>
              {product.comparePrice && product.comparePrice > product.price && (
                <p className="text-sm text-gray-500 line-through">
                  ${product.comparePrice.toFixed(2)}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Stock</p>
              <p className={`font-semibold ${product.stock > 10 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock}
              </p>
            </div>
          </div>

          {product.sku && (
            <p className="text-xs text-gray-500">SKU: {product.sku}</p>
          )}

          {/* Actions */}
          {(onEdit || onDelete) && (
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              {onEdit && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEdit(product)}
                  fullWidth
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(product)}
                  fullWidth
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};