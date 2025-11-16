// src/services/settings.service.ts

import api from './api';

export type SettingType = 'string' | 'number' | 'boolean' | 'json';

export interface Setting {
  id: string;
  key: string;
  value: string;
  description?: string;
  type: SettingType;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSettingData {
  key: string;
  value: string;
  description?: string;
  type?: SettingType;
  isPublic?: boolean;
}

export interface UpdateSettingData {
  value?: string;
  description?: string;
  isPublic?: boolean;
}

class SettingsService {
  /**
   * Get all settings (admin only)
   */
  async getAll(): Promise<Setting[]> {
    const response = await api.get<{ settings: Setting[] }>('/settings');
    return response.data.settings;
  }

  /**
   * Get public settings (no auth required)
   */
  async getPublic(): Promise<Record<string, string>> {
    const response = await api.get<{ settings: Record<string, string> }>('/settings/public');
    return response.data.settings;
  }

  /**
   * Get single setting by key (admin only)
   */
  async getByKey(key: string): Promise<Setting> {
    const response = await api.get<{ setting: Setting }>(`/settings/${key}`);
    return response.data.setting;
  }

  /**
   * Create new setting (admin only)
   */
  async create(data: CreateSettingData): Promise<Setting> {
    const response = await api.post<{ setting: Setting; message: string }>('/settings', data);
    return response.data.setting;
  }

  /**
   * Update setting (admin only)
   */
  async update(key: string, data: UpdateSettingData): Promise<Setting> {
    const response = await api.put<{ setting: Setting; message: string }>(`/settings/${key}`, data);
    return response.data.setting;
  }

  /**
   * Delete setting (admin only)
   */
  async delete(key: string): Promise<void> {
    await api.delete(`/settings/${key}`);
  }
}

export const settingsService = new SettingsService();
export default settingsService;