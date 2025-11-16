// src/pages/Categories/CategoriesPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { useCategories } from '@/hooks';
import { Category } from '@/services';
import { Button, Card, CardBody, Modal, ModalFooter, Badge, Alert } from '@/components/ui';

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { categories, isLoading, error, deleteCategory } = useCategories();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCategory) {
      await deleteCategory(selectedCategory.id);
      setDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Categories</h1>
          <Button onClick={() => navigate('/categories/new')}>
            Add Category
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardBody>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <Badge variant={category.isActive ? 'success' : 'danger'}>
                      {category.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  {category.description && (
                    <p className="text-gray-600 mb-4">{category.description}</p>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/categories/${category.id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteClick(category)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Category"
        >
          <p>Are you sure you want to delete "{selectedCategory?.name}"?</p>
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