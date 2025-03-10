import React from "react";
import "../styles/Orders.css";
import OrderList from "../components/OrderList";
import OrderSidebar from "../components/OrderSidebar";

const Orders = ({ orders, cachedMetrics }) => {
  const hasOrders = orders && orders.length > 0;

  return (
    <div className="content">
      <div className="overview">
        <p>Orders</p>
      </div>
      {hasOrders ? (
        <div className="orders">
          <div className="orders-content">
            <OrderList orders={orders} />
          </div>
          <OrderSidebar orders={orders} cachedMetrics={cachedMetrics} />
        </div>
      ) : (
        <div className="orders-content">
          <OrderList orders={orders} />
        </div>
      )}
    </div>
  );
};

export default Orders;
