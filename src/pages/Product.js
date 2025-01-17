import React, { useState } from "react";
import { Search, MoreVertical } from "lucide-react";
import "../styles/Product.css";

const products = [
  {
    id: 1,
    name: "Gaming Mouse",
    price: 79.99,
    stock: 23,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 159.99,
    stock: 15,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300",
  },
  {
    id: 3,
    name: "Gaming Headset",
    price: 129.99,
    stock: 31,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=300",
  },
  {
    id: 3,
    name: "Gaming Headset",
    price: 129.99,
    stock: 31,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=300",
  },
  {
    id: 3,
    name: "Gaming Headset",
    price: 129.99,
    stock: 31,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=300",
  },
  {
    id: 3,
    name: "Gaming Headset",
    price: 129.99,
    stock: 31,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=300",
  },
];

const Product = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="product-page">
      <div className="orders-overview">
        <p>Products</p>
      </div>
      <div className="products-content">
        <div className="header">
          <div className="search-filter">
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          <button className="export">Remove</button>
          <button className="add">Add</button>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              /> </div>
              <div className="product-info">
                <div className="product-header">
                  <div>
                    <h3 className="product-name">{product.name}</h3>
                  </div>
                  <button className="more-button">
                    <MoreVertical className="icon" />
                  </button>
                </div>
                <div className="product-footer">
                  <p className="product-price">${product.price}</p>
                  <p className="product-stock">{product.stock} in stock</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
