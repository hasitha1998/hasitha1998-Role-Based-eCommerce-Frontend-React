// src/pages/Profile/ProfilePage.tsx

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { useAuth } from '@/hooks';
import { Card, CardBody, Input, Button, Alert } from '@/components/ui';
import { userService } from '@/services';

export const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const updatedUser = await userService.update(user.id, formData);
      setUser(updatedUser);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Profile</h1>

        {success && <Alert variant="success">Profile updated successfully!</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
              />

              <Input
                type="text"
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
              />

              <Input
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />

              <div className="pt-4">
                <Button type="submit" isLoading={loading}>
                  Update Profile
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="font-bold text-lg mb-4">Account Information</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-600">Role</dt>
                <dd className="font-medium capitalize">{user?.role}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Account Status</dt>
                <dd className="font-medium">{user?.isActive ? 'Active' : 'Inactive'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Member Since</dt>
                <dd className="font-medium">
                  {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};