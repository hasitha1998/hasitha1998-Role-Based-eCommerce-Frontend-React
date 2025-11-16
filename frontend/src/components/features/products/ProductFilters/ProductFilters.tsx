// src/components/features/products/ProductFilters/ProductFilters.tsx

import React from 'react';
import { Category } from '@/services';
import { Input, Select, Card, CardBody } from '@/components/ui';

interface ProductFiltersProps {
  categories: Category[];
  onFilterChange: (filters: ProductFilterValues) => void;
}

export interface ProductFilterValues {
  search: string;
  category: string;
  status: string;
  sortBy: string;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  onFilterChange,
}) => {
  const [filters, setFilters] = React.useState<ProductFilterValues>({
    search: '',
    category: '',
    status: '',
    sortBy: 'newest',
  });

  const handleChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(cat => ({ value: cat.id, label: cat.name })),
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ];

  return (
    <Card>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            leftIcon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />

          <Select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            options={categoryOptions}
          />

          <Select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            options={statusOptions}
          />

          <Select
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            options={sortOptions}
          />
        </div>
      </CardBody>
    </Card>
  );
};