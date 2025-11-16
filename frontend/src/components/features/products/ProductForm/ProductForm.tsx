// src/components/features/products/ProductForm/ProductForm.tsx

import React, { useState, } from 'react';
import { Product, Category, ProductFormData } from '@/services';
import { Input, Select, Button, Card, CardBody } from '@/components/ui';

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    comparePrice: product?.comparePrice || undefined,
    costPrice: product?.costPrice || undefined,
    sku: product?.sku || '',
    stock: product?.stock || 0,
    categoryId: product?.categoryId || '',
    isActive: product?.isActive ?? true,
    isFeatured: product?.isFeatured ?? false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const categoryOptions = [
  { value: '', label: 'Select a category' },
  ...(categories || []).map(cat => ({ value: cat.id, label: cat.name })),
];

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <Input
                type="text"
                name="name"
                label="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                placeholder="Enter product name"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
              </div>

              <Input
                type="text"
                name="sku"
                label="SKU"
                value={formData.sku}
                onChange={handleChange}
                fullWidth
                placeholder="e.g., PROD-001"
              />
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="number"
                name="price"
                label="Price"
                value={formData.price}
                onChange={handleChange}
                required
                fullWidth
                placeholder="0.00"
                step="0.01"
              />

              <Input
                type="number"
                name="comparePrice"
                label="Compare at Price"
                value={formData.comparePrice || ''}
                onChange={handleChange}
                fullWidth
                placeholder="0.00"
                step="0.01"
                helperText="Optional"
              />

              <Input
                type="number"
                name="costPrice"
                label="Cost Price"
                value={formData.costPrice || ''}
                onChange={handleChange}
                fullWidth
                placeholder="0.00"
                step="0.01"
                helperText="Optional"
              />
            </div>
          </div>

          {/* Inventory */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Inventory & Category
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                name="stock"
                label="Stock Quantity"
                value={formData.stock}
                onChange={handleChange}
                required
                fullWidth
                placeholder="0"
              />

              <Select
                name="categoryId"
                label="Category"
                value={formData.categoryId}
                onChange={handleChange}
                options={categoryOptions}
                fullWidth
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Active (visible to customers)
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Featured product
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
            >
              {product ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};