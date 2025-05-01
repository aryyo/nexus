import { useState, useEffect, useCallback } from 'react';
import { endpoints } from '../config/api';

export const useInvoices = (shouldFetch = false) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInvoices = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(endpoints.invoices.base, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }

      const data = await response.json();
      setInvoices(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching invoices:', err);
      setError(err.message || 'Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteInvoice = useCallback(async (invoiceId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(endpoints.invoices.byId(invoiceId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete invoice');
      }

      setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice._id !== invoiceId));
      return true;
    } catch (err) {
      console.error('Error deleting invoice:', err);
      throw err;
    }
  }, []);

  const bulkDeleteInvoices = useCallback(async (invoiceIds) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(endpoints.invoices.bulkDelete, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ invoiceIds })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete invoices');
      }

      setInvoices(prevInvoices => 
        prevInvoices.filter(invoice => !invoiceIds.includes(invoice._id))
      );
      return true;
    } catch (err) {
      console.error('Error deleting invoices:', err);
      throw err;
    }
  }, []);

  const addInvoice = useCallback(async (invoiceData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const requiredFields = ['orderId', 'customerName', 'type', 'status', 'item', 'subtotal', 'tax', 'shipping', 'total', 'datePlaced'];
    const missingFields = requiredFields.filter(field => {
      if (['subtotal', 'tax', 'shipping', 'total'].includes(field)) {
        return invoiceData[field] === undefined || invoiceData[field] === null;
      }
      return !invoiceData[field];
    });
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    try {
      const response = await fetch(endpoints.invoices.base, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: invoiceData.orderId,
          customerName: invoiceData.customerName,
          type: invoiceData.type,
          status: invoiceData.status,
          item: invoiceData.item,
          subtotal: Number(invoiceData.subtotal),
          tax: Number(invoiceData.tax),
          shipping: Number(invoiceData.shipping),
          total: Number(invoiceData.total),
          datePlaced: new Date(invoiceData.datePlaced)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add invoice');
      }

      const newInvoice = await response.json();
      setInvoices(prevInvoices => [...prevInvoices, newInvoice.invoice]);
      
      return newInvoice.invoice;
    } catch (err) {
      console.error('Error adding invoice:', err);
      throw err;
    }
  }, []);
  
  useEffect(() => {
    if (shouldFetch) {
      fetchInvoices();
    }
  }, [fetchInvoices, shouldFetch]);

  return {
    invoices,
    loading,
    error,
    fetchInvoices,
    addInvoice,
    deleteInvoice,
    bulkDeleteInvoices
  };
}; 