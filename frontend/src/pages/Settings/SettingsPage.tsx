// src/pages/Settings/SettingsPage.tsx

import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout';
import { SettingItem } from '@/components/features';
import { settingsService, Setting } from '@/services';
import { Spinner, Alert, Button, Modal, ModalFooter, Input } from '@/components/ui';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newSetting, setNewSetting] = useState({ key: '', value: '', description: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await settingsService.getAll();
      setSettings(data);
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (key: string, value: string) => {
    try {
      setUpdating(true);
      await settingsService.update(key, { value });
      await fetchSettings();
    } catch (err) {
      setError('Failed to update setting');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (key: string) => {
    if (confirm('Delete this setting?')) {
      try {
        await settingsService.delete(key);
        await fetchSettings();
      } catch (err) {
        setError('Failed to delete setting');
      }
    }
  };

  const handleCreate = async () => {
    try {
      await settingsService.create(newSetting);
      setCreateModalOpen(false);
      setNewSetting({ key: '', value: '', description: '' });
      await fetchSettings();
    } catch (err) {
      setError('Failed to create setting');
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Button onClick={() => setCreateModalOpen(true)}>
            Add Setting
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <div className="space-y-4">
          {settings.map((setting) => (
            <SettingItem
              key={setting.id}
              setting={setting}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              isUpdating={updating}
            />
          ))}
        </div>

        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Create Setting"
        >
          <div className="space-y-4">
            <Input
              label="Key"
              value={newSetting.key}
              onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
              fullWidth
            />
            <Input
              label="Value"
              value={newSetting.value}
              onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
              fullWidth
            />
            <Input
              label="Description"
              value={newSetting.description}
              onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
              fullWidth
            />
          </div>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </ModalFooter>
        </Modal>
      </div>
    </MainLayout>
  );
};