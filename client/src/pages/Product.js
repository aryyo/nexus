import React, { useState } from "react";
import "../styles/Product.css";
import EmptyState from "../components/EmptyState";
import AddProductModal from "../components/AddProductModal";
import ProductDropdown from "../components/ProductDropdown";
import { useProducts } from "../hooks/useProducts";

const Product = () => {
  const { 
    products, 
    loading, 
    error, 
    addProduct, 
    editProduct, 
    deleteProduct 
  } = useProducts(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = async (productData) => {
    try {
      await addProduct(productData);
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Failed to add product:", error);
      throw error;
    }
  };

  const handleEditProduct = async (productData) => {
    try {
      await editProduct(selectedProduct._id, productData);
      setIsModalOpen(false);
      setSelectedProduct(null);
      setActiveDropdown(null);
    } catch (error) {
      console.error("Failed to edit product:", error);
      throw error;
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        setActiveDropdown(null);
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(productId)) {
        newSelection.delete(productId);
      } else {
        newSelection.add(productId);
      }
      return newSelection;
    });
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.size} selected products?`)) {
      try {
        const successfulDeletions = new Set();
        
        for (const productId of selectedProducts) {
          try {
            await deleteProduct(productId);
            successfulDeletions.add(productId);
          } catch (error) {
            console.error(`Failed to delete product ${productId}:`, error);
          }
        }

        setSelectedProducts(prev => {
          const newSelection = new Set(prev);
          successfulDeletions.forEach(id => newSelection.delete(id));
          return newSelection;
        });

        if (successfulDeletions.size === selectedProducts.size) {
          setIsSelectionMode(false);
          setSelectedProducts(new Set());
          setActiveDropdown(null); // Close any open dropdown when exiting selection mode
        }
      } catch (error) {
        console.error("Error during bulk delete:", error);
      }
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
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
        <button 
          className={`export ${isSelectionMode ? 'active' : ''}`}
          onClick={() => {
            if (isSelectionMode && selectedProducts.size > 0) {
              handleBulkDelete();
            } else {
              setIsSelectionMode(!isSelectionMode);
              setSelectedProducts(new Set());
              setActiveDropdown(null);
            }
          }}
        >
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
          {isSelectionMode 
            ? `Remove (${selectedProducts.size})`
            : 'Remove'
          }
        </button>
        <button 
          className={`add ${isSelectionMode ? 'disabled' : ''}`} 
          onClick={() => !isSelectionMode && setIsModalOpen(true)}
          disabled={isSelectionMode}
        >
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
        <div className={`product-grid ${activeDropdown ? "has-active-dropdown" : ""}`}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className={`product-card ${
                activeDropdown === product._id ? "active" : ""
              }`}
              onClick={() => isSelectionMode && toggleProductSelection(product._id)}
            >
              {isSelectionMode && (
                <div className={`selection-circle ${selectedProducts.has(product._id) ? 'selected' : ''}`}>
                  {selectedProducts.has(product._id) && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              )}
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
                  {!isSelectionMode && (
                    <div className="menu-container">
                      <button
                        className={`menu-button ${
                          activeDropdown === product._id ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(
                            activeDropdown === product._id ? null : product._id
                          );
                        }}
                      >
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
                      <ProductDropdown
                        isOpen={activeDropdown === product._id}
                        onEdit={() => openEditModal(product)}
                        onDelete={() => handleDeleteProduct(product._id)}
                        onClose={() => setActiveDropdown(null)}
                      />
                    </div>
                  )}
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
                  {/* <p className="product-stock">{product.stock} in stock</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAdd={selectedProduct ? handleEditProduct : handleAddProduct}
        initialData={selectedProduct}
        mode={selectedProduct ? "edit" : "add"}
      />
    </div>
  );
};

export default Product;
