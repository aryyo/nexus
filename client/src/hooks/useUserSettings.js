import { useState, useEffect, useCallback } from 'react';

export const useUserSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/settings', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user settings');
      }

      const data = await response.json();
      setSettings(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError(err.message || 'Failed to fetch user settings');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (newSettings) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch('http://localhost:3000/settings', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSettings)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update settings');
      }

      const updatedSettings = await response.json();
      setSettings(updatedSettings);
      console.log('Updated settings:', updatedSettings);
      return updatedSettings;
    } catch (err) {
      console.error('Error updating settings:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings
  };
}; 