import { useState, useEffect, useCallback } from "react";
import { endpoints } from '../config/api';
export const useProducts = (shouldFetch = false) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateStatus = (stock) => {
    if (stock <= 0) return "Out of Stock";
    if (stock <= 10) return "Low Stock";
    return "In Stock";
  };

  const fetchProducts = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(endpoints.products.base, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      const productsWithStatus = data.map((product) => ({
        ...product,
        status: calculateStatus(product.stock),
      }));

      setProducts(productsWithStatus);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = async (productData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const status = calculateStatus(productData.stock);

      const response = await fetch(endpoints.products.base, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productData,
          status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      const data = await response.json();
      const newProduct = {
        ...data.product,
        status: calculateStatus(data.product.stock),
      };

      setProducts((prevProducts) => [...prevProducts, newProduct]);
      return newProduct;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const editProduct = async (productId, productData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const status = calculateStatus(productData.stock);

      const response = await fetch(
        endpoints.products.byId(productId),
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...productData,
            status,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      const data = await response.json();
      const updatedProduct = {
        ...data.product,
        status: calculateStatus(data.product.stock),
      };

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? updatedProduct : product
        )
      );

      return updatedProduct;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        endpoints.products.byId(productId),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchProducts();
    }
  }, [fetchProducts, shouldFetch]);

  return {
    products,
    loading,
    error,
    addProduct,
    editProduct,
    deleteProduct,
    refreshProducts: fetchProducts,
  };
};
