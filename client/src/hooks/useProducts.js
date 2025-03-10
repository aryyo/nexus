import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch("http://localhost:3000/products", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Calculate status based on stock quantity
      let status = 'In Stock';
      if (productData.stock <= 0) {
        status = 'Out of Stock';
      } else if (productData.stock <= 10) {
        status = 'Low Stock';
      }

      const response = await fetch("http://localhost:3000/products", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...productData,
          status // Include the calculated status
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }

      const data = await response.json();
      setProducts(prevProducts => [...prevProducts, data.product]);
      return data.product;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { 
    products, 
    loading, 
    error,
    addProduct,
    refreshProducts: fetchProducts
  };
}; 