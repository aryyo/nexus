import React from "react";
import "../styles/Orders.css";
import OrderList from "../components/OrderList";
import OrderSidebar from "../components/OrderSidebar";

const Orders = ({ orders, cachedMetrics }) => {
  // Check if there are any orders
  const hasOrders = orders && orders.length > 0;

  return (
    <div className="content">
      <div className="overview">
        <p>Orders</p>
      </div>
      {hasOrders ? (
        // Only show the full orders layout if there are orders
        <div className="orders">
          <div className="orders-content">
            <OrderList orders={orders} />
          </div>
          <OrderSidebar orders={orders} cachedMetrics={cachedMetrics} />
        </div>
      ) : (
        // Show only the OrderList component with empty state when no orders
        <div className="orders-content">
          <OrderList orders={orders} />
        </div>
      )}
    </div>
  );
};

export default Orders;
