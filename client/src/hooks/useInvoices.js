import { useState, useEffect, useCallback } from 'react';

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
      const response = await fetch('http://localhost:3000/invoices', {
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

  const addInvoice = useCallback(async (invoiceData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const requiredFields = ['orderId', 'customerName', 'type', 'status', 'item', 'subtotal', 'tax', 'shipping', 'total', 'datePlaced'];
    const missingFields = requiredFields.filter(field => !invoiceData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    try {
      const response = await fetch('http://localhost:3000/invoices', {
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
      setInvoices(prevInvoices => {
        // console.log('Added new invoice:', newInvoice.invoice);
        return [...prevInvoices, newInvoice.invoice];
      });
      
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
    addInvoice
  };
}; 