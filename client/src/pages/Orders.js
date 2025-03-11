import React, { useState } from "react";
import "../styles/Orders.css";
import OrderList from "../components/OrderList";
import OrderSidebar from "../components/OrderSidebar";
import AddOrderModal from "../components/AddOrderModal";

const Orders = ({ orders, cachedMetrics }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const hasOrders = orders && orders.length > 0;

  const filteredOrders = orders?.filter((order) => 
    order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order._id.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleBulkDelete = () => {
    if (selectedOrders.size === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedOrders.size} selected orders?`)) {
      // TODO: Implement bulk delete functionality
      setIsSelectionMode(false);
      setSelectedOrders(new Set());
    }
  };

  const handleAddOrder = async (orderData) => {
    try {
      // TODO: Implement add order functionality
      console.log('Adding order:', orderData);
      setIsModalOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Failed to add order:", error);
      throw error;
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="content">
      <div className="overview">
        <p>Orders</p>
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
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          className={`export ${isSelectionMode ? 'active' : ''}`}
          onClick={() => {
            if (isSelectionMode && selectedOrders.size > 0) {
              handleBulkDelete();
            } else {
              setIsSelectionMode(!isSelectionMode);
              setSelectedOrders(new Set());
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
            ? `Remove (${selectedOrders.size})`
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
          Add Order
        </button>
      </div>

      {hasOrders ? (
        <div className="orders">
          <div className="orders-content">
            <OrderList 
              orders={filteredOrders}
              isSelectionMode={isSelectionMode}
              selectedOrders={selectedOrders}
              setSelectedOrders={setSelectedOrders}
            />
          </div>
          <OrderSidebar orders={orders} cachedMetrics={cachedMetrics} />
        </div>
      ) : (
        <div className="orders-content">
          <OrderList orders={filteredOrders} />
        </div>
      )}

      <AddOrderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAdd={handleAddOrder}
        initialData={selectedOrder}
        mode={selectedOrder ? "edit" : "add"}
      />
    </div>
  );
};

export default Orders;
