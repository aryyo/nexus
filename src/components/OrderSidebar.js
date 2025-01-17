import "../styles/OrderSidebar.css";
import { useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import OrderData from "../data/OrderData";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderSidebar = () => {
  const [orders, setOrders] = useState(OrderData);

  const formatRevenue = (value) => {
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    } else if (value >= 1_000) {
      return `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  const cachedMetrics = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.status === "Paid" ? order.total : 0),
      0
    );
    const totalPaid = orders.filter((order) => order.status === "Paid").length;
    const totalCancelled = orders.filter(
      (order) => order.status === "Cancelled"
    ).length;
    const totalRefunded = orders.filter(
      (order) => order.status === "Refunded"
    ).length;

    const averagePrice = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const rejectRate =
      totalOrders > 0
        ? ((totalCancelled + totalRefunded) * 100) / totalOrders
        : 0;
    const totalShipments = orders.filter(
      (order) => order.type === "Shipping"
    ).length;
    const totalPickups = orders.filter(
      (order) => order.type === "Pickup"
    ).length;
    const shippingRate =
      totalOrders > 0 ? (totalShipments * 100) / totalOrders : 0;

    // Calculate the revenue from shipments and pickups
    const revenueFromShipments = orders
      .filter((order) => order.type === "Shipping" && order.status === "Paid")
      .reduce((acc, order) => acc + order.total, 0);

    const revenueFromPickups = orders
      .filter((order) => order.type === "Pickup" && order.status === "Paid")
      .reduce((acc, order) => acc + order.total, 0);

    // Find the most ordered product
    const productCount = orders.reduce((acc, order) => {
      const product = order.product;
      acc[product] = (acc[product] || 0) + 1;
      return acc;
    }, {});

    const mostOrderedProduct = Object.entries(productCount).reduce(
      (max, [product, count]) => (count > max.count ? { product, count } : max),
      { product: "", count: 0 }
    );

    return {
      totalOrders,
      totalRevenue,
      totalPaid,
      totalCancelled,
      totalRefunded,
      averagePrice,
      rejectRate,
      shippingRate,
      totalShipments,
      totalPickups,
      revenueFromShipments,
      revenueFromPickups,
      mostOrderedProduct: mostOrderedProduct.product,
    };
  }, [orders]);

  const doughnutData = {
    labels: ["Shipments", "Pickups"],
    datasets: [
      {
        label: "Order Fulfillment",
        data: [cachedMetrics.totalShipments, cachedMetrics.totalPickups],
        backgroundColor: ["#1bb36a", "#ffcd47"],
        hoverBackgroundColor: ["#1bb36a", "#ffcd47"],
        borderColor: ["#141824"],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#141824",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#141824",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="orders-sidebar">
      <div className="receipt-of-goods">
        <div className="orders-sidebar-header">
          <p>Receipt of Goods</p>
        </div>
        <div className="revenue-chart">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
        <div className="revenue-details">
          <div className="revenue-item">
            <img src="../icons/product.png" alt=""></img>
            <div>
              <p>{formatRevenue(cachedMetrics.revenueFromShipments)}</p>
              <div className="revenue-item-label">
                <p>{cachedMetrics.totalShipments}</p>
                <p>Shipments</p>
              </div>
            </div>
          </div>
          <div className="revenue-item">
            <img src="../icons/product.png" alt=""></img>
            <div>
              <p>{formatRevenue(cachedMetrics.revenueFromPickups)}</p>
              <div className="revenue-item-label">
                <p>{cachedMetrics.totalPickups}</p>
                <p>Pickups</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                <div className="rate-bar-color" style={{backgroundColor:'#3cb371'}}></div>
                <p>Paid</p>
              </div>
              <p>
                {(
                  (cachedMetrics.totalPaid * 100) /
                  cachedMetrics.totalOrders
                ).toFixed(2)}
                %
              </p>
            </div>
            <div className="cancelled-data">
              <div className="icon-data">
                <div className="rate-bar-color" style={{backgroundColor:'#fd9b52'}}></div>
                <p>Cancelled</p>
              </div>
              <p>
                {(
                  (cachedMetrics.totalCancelled * 100) /
                  cachedMetrics.totalOrders
                ).toFixed(2)}
                %
              </p>
            </div>
            <div className="refunded-data">
              <div className="icon-data">
                <div className="rate-bar-color" style={{backgroundColor:'#926cfd'}}></div>
                <p>Refunded</p>
              </div>
              <p>
                {(
                  (cachedMetrics.totalRefunded * 100) /
                  cachedMetrics.totalOrders
                ).toFixed(2)}
                %
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="orders-summary">
        <div className="orders-sidebar-header">
          <p>Overview</p>
        </div>
        <div className="summary-stats">
          <div className="summary-line">
            <p className="summary-value">
              {formatRevenue(cachedMetrics.averagePrice)}
            </p>
            <p className="summary-title">Average Order</p>
          </div>
          <div className="summary-line">
            <p className="summary-value">
              {formatRevenue(cachedMetrics.totalRevenue)}
            </p>
            <p className="summary-title">Total Revenue</p>
          </div>
          <div className="summary-line">
            {cachedMetrics.totalCancelled + cachedMetrics.totalRefunded}
            <p className="summary-title">Orders Lost</p>
          </div>
          <div className="summary-line">
            <p className="summary-value">{cachedMetrics.totalOrders}</p>
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
      <div className="orders-top-seller">
        <div className="orders-sidebar-header">
          <p>Top Seller</p>
        </div>
        <div className="product-sold">
          <img src="../icons/product.png" alt=""></img>
          <div className="product-sold-details">
            <p>{cachedMetrics.mostOrderedProduct || "No Product"}</p>
            <p>
              {
                orders.filter(
                  (order) => order.product === cachedMetrics.mostOrderedProduct
                ).length
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSidebar;
