import React, { useState } from "react";
import "../styles/Product.css";

const products = [
  {
    id: 1,
    name: "Gaming Mouse",
    price: 79.99,
    stock: 23,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 159.99,
    stock: 15,
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300",
  },
  {
    id: 3,
    name: "Gaming Headset",
    price: 129.99,
    stock: 31,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=300",
  },
  {
    id: 4,
    name: "4K Monitor",
    price: 399.99,
    stock: 8,
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300",
  },
  {
    id: 5,
    name: "Gaming Chair",
    price: 249.99,
    stock: 12,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1610395219791-21b0353e43c3?w=300",
  },
  {
    id: 6,
    name: "RGB Mouse Pad",
    price: 29.99,
    stock: 45,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=300",
  },
];

const Product = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="product-page">
      <div className="overview">
        <p>Products</p>
      </div>
      <div className="header">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="export">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
          Remove
        </button>
        <button className="add">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Product
        </button>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="12" cy="5" r="1"/>
                    <circle cx="12" cy="19" r="1"/>
                  </svg>
                </button>
              </div>
              <div className="product-details">
                <div className="price-stock">
                  <p className="product-price">${product.price}</p>
                  <p className={`product-status ${product.status.toLowerCase().replace(" ", "-")}`}>
                    {product.status}
                  </p>
                </div>
                <p className="product-stock">{product.stock} in stock</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
