import { useState, useEffect, useCallback } from 'react';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUser(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError(err.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user data');
      }

      setUser(data);
      return data;
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    fetchUser,
    updateUser
  };
}; 