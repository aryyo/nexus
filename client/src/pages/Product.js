import React, { useState } from "react";
import "../styles/Product.css";
import EmptyState from "../components/EmptyState";
import AddProductModal from "../components/AddProductModal";
import { useProducts } from "../hooks/useProducts";

const Product = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, addProduct } = useProducts();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = async (productData) => {
    try {
      await addProduct(productData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add product:", error);
      throw error;
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "in-stock";
    // Convert "In Stock" to "in-stock", "Low Stock" to "low-stock", etc.
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="product-page">
      <div className="overview">
        <p>Products</p>
      </div>
      <div className="header">
        <div className="search-box">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="export">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
          Remove
        </button>
        <button className="add" onClick={() => setIsModalOpen(true)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Product
        </button>
      </div>
      {products.length === 0 ? (
        <EmptyState
          title="No products available"
          message="Add your first product to get started"
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="empty-state-icon"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          }
          className="products-empty-state"
        />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          title="No matching products"
          message="Try adjusting your search query"
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="empty-state-icon"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          }
          className="products-empty-state"
        />
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={`${product._id || product.name}-${index}`}
              className="product-card"
            >
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <button className="menu-button">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
                <div className="product-details">
                  <div className="price-stock">
                    <p className="product-price">${product.price}</p>
                    <p
                      className={`product-status ${getStatusClass(
                        product.status
                      )}`}
                    >
                      {product.status || "In Stock"}
                    </p>
                  </div>
                  <p className="product-stock">{product.stock} in stock</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

export default Product;
