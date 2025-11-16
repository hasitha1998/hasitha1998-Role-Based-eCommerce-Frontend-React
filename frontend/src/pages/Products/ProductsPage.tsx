// src/pages/Products/ProductsPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { ProductList, ProductFilters, ProductFilterValues } from '@/components/features';
import { useProducts } from '@/hooks';
import { Button, Modal, ModalFooter, Alert } from '@/components/ui';
import { Product } from '@/services';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { products, categories, isLoading, error, deleteProduct } = useProducts();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  React.useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = (filters: ProductFilterValues) => {
    let filtered = [...products];

    if (filters.search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(p => p.categoryId === filters.category);
    }

    if (filters.status) {
      filtered = filtered.filter(p =>
        filters.status === 'active' ? p.isActive : !p.isActive
      );
    }

    setFilteredProducts(filtered);
  };

  const handleEdit = (product: Product) => {
    navigate(`/products/${product.id}/edit`);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id);
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Products</h1>
          <Button onClick={() => navigate('/products/new')}>
            Add Product
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <ProductFilters categories={categories} onFilterChange={handleFilterChange} />

        <ProductList
          products={filteredProducts}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Product"
        >
          <p>Are you sure you want to delete "{selectedProduct?.name}"?</p>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </MainLayout>
  );
};