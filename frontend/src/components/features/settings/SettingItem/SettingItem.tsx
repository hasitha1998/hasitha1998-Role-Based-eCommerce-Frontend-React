// src/components/features/settings/SettingItem/SettingItem.tsx

import React from 'react';
import { Setting } from '@/services';
import { Input, Button, Card, CardBody } from '@/components/ui';

interface SettingItemProps {
  setting: Setting;
  onUpdate: (key: string, value: string) => Promise<void>;
  onDelete?: (key: string) => Promise<void>;
  isUpdating?: boolean;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  setting,
  onUpdate,
  onDelete,
  isUpdating,
}) => {
  const [value, setValue] = React.useState(setting.value);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSave = async () => {
    if (value !== setting.value) {
      await onUpdate(setting.key, value);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(setting.value);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardBody>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{setting.key}</h3>
              {setting.description && (
                <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                {setting.type}
              </span>
              {setting.isPublic && (
                <span className="text-xs text-green-600 px-2 py-1 bg-green-100 rounded">
                  Public
                </span>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <Input
                type={setting.type === 'number' ? 'number' : 'text'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                fullWidth
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  size="sm"
                  isLoading={isUpdating}
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="ghost"
                  size="sm"
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded flex-1">
                {setting.value}
              </p>
              <div className="flex gap-2 ml-4">
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="secondary"
                  size="sm"
                >
                  Edit
                </Button>
                {onDelete && (
                  <Button
                    onClick={() => onDelete(setting.key)}
                    variant="danger"
                    size="sm"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};