import "../styles/OrderSidebar.css";
import { useState, useMemo } from "react";
import OrderData from "../data/OrderData";

/*
what values do i need: total paid, total cancelled, total refunded, total orders, total revenue, 
average price per order, total cancelled / total orders, shipping rate

we cache all of these, trigger rerender if orderData changes
*/

const OrderSidebar = () => {
  const [orders, setOrders] = useState(OrderData);

  const cachedMetrics = useMemo(() => {
    console.log(`computing`);
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.status === "Paid" ? order.total : 0),
      0
    );
    const totalPaid = orders.reduce((acc, order) => {
      acc += order.status === "Paid" ? 1 : 0;
      return acc;
    }, 0);

    const totalCancelled = orders.reduce((acc, order) => {
      acc += order.status === "Cancelled" ? 1 : 0;
      return acc;
    }, 0);

    const totalRefunded = orders.reduce((acc, order) => {
      acc += order.status === "Refunded" ? 1 : 0;
      return acc;
    }, 0);

    const averagePrice = totalRevenue / totalOrders;
    const rejectRate = (totalCancelled * 100) / totalOrders;
    const shippingRate =
      orders.reduce((acc, order) => {
        acc += order.type === "Shipping" ? 1 : 0;
        return acc;
      }, 0) * 100/ totalOrders;

    return {
      totalOrders,
      totalRevenue,
      totalPaid,
      totalCancelled,
      totalRefunded,
      averagePrice,
      rejectRate,
      shippingRate,
    };
  }, [orders]);

  return (
    <div className="orders-sidebar">
      <div className="receipt-of-goods"></div>
      <div className="orders-status">
        <div className="orders-sidebar-header">
          <p>Order Status</p>
        </div>
        <div>
          <div className="bar">
            <div
              className="line-one"
              style={{ flex: cachedMetrics.totalPaid }}
            ></div>
            <div
              className="line-two"
              style={{ flex: cachedMetrics.totalCancelled }}
            ></div>
            <div
              className="line-three"
              style={{ flex: cachedMetrics.totalRefunded }}
            ></div>
          </div>
          <div className="bar-data">
            <div className="paid-data">
              <div className="icon-data">
                <img src="../icons/product.png" alt=""></img>
                <p>Paid</p>
              </div>
              <p>{cachedMetrics.totalPaid * 100 / cachedMetrics.totalOrders}%</p>
            </div>
            <div className="cancelled-data">
              <div className="icon-data">
                <img src="../icons/product.png" alt=""></img>
                <p>Cancelled</p>
              </div>
              <p>{cachedMetrics.totalCancelled * 100 / cachedMetrics.totalOrders}%</p>
            </div>
            <div className="refunded-data">
              <div className="icon-data">
                <img src="../icons/product.png" alt=""></img>
                <p>Refunded</p>
              </div>
              <p>{cachedMetrics.totalRefunded * 100 / cachedMetrics.totalOrders}%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="orders-summary">
        <div className="orders-sidebar-header"><p>Overview</p></div>
        <div className="summary-stats">
          <div className="summary-line">
            <p className="summary-value">
              ${cachedMetrics.averagePrice.toFixed(2)}
            </p>
            <p className="summary-title">Average Order</p>
          </div>
          <div className="summary-line">
            ${cachedMetrics.totalRevenue.toFixed(2)}
            <p className="summary-title">Total Revenue</p>
          </div>
          <div className="summary-line">
            {cachedMetrics.rejectRate}%
            <p className="summary-title">Reject Rate</p>
          </div>
          <div className="summary-line">
            <p className="summary-value">
              {cachedMetrics.totalOrders}
            </p>
            <p className="summary-title">Total Orders</p>
          </div>
          <div className="summary-line">
            <p className="summary-value">
              {cachedMetrics.shippingRate.toFixed(2)}%
            </p>
            <p className="summary-title">Shipping Rate</p>
          </div>
          <div className="summary-line">
            <p className="summary-value">
              {cachedMetrics.rejectRate.toFixed(2)}%
            </p>
            <p className="summary-title">Reject Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSidebar;
