import React from "react";
import "../styles/OrderSidebar.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import EmptyState from "./EmptyState";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderSidebar = ({ orders, cachedMetrics }) => {
  const formatRevenue = (value) => {
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1)}M`;
    } else if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(1)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  const doughnutData = {
    labels: ["Shipments", "Pickups"],
    datasets: [
      {
        label: "Order Fulfillment",
        data: [cachedMetrics.totalShipments, cachedMetrics.totalPickups],
        backgroundColor: ["#926cfd", "#10b981"],
        hoverBackgroundColor: ["#7c5ce7", "#0d9669"],
        borderWidth: 0,
        cutout: "85%",
        borderRadius: 8,
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
        backgroundColor: "#fff",
        titleColor: "#111827",
        bodyColor: "#4b5563",
        bodyFont: {
          size: 12,
        },
        titleFont: {
          size: 13,
          weight: "600",
        },
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        borderColor: "#e5e7eb",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${percentage}%`;
          },
        },
      },
    },
  };

  const hasReceiptData =
    cachedMetrics &&
    (cachedMetrics.totalShipments > 0 || cachedMetrics.totalPickups > 0);
  const hasOrderStatusData =
    cachedMetrics &&
    (cachedMetrics.totalPaid > 0 ||
      cachedMetrics.totalCancelled > 0 ||
      cachedMetrics.totalRefunded > 0);
  const hasOverviewData = cachedMetrics && cachedMetrics.totalOrders > 0;
  const hasTopSellerData = cachedMetrics && cachedMetrics.mostOrderedProduct;

  return (
    <div className="orders-sidebar">
      <div className="receipt-of-goods">
        <div className="orders-sidebar-header">
          <h2>Receipt of Goods</h2>
        </div>
        {!hasReceiptData ? (
          <EmptyState
            title="No receipt data"
            message="There are no shipments or pickups to display."
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
                <path d="M16 3h5v5M21 3l-7 7M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5" />
              </svg>
            }
            className="sidebar-empty-state"
          />
        ) : (
          <div className="revenue-chart">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="chart-center">
              <p className="total-value">
                {formatRevenue(
                  cachedMetrics.revenueFromShipments +
                    cachedMetrics.revenueFromPickups
                )}
              </p>
              <p className="total-label">Total Revenue</p>
            </div>
          </div>
        )}
        <div className="revenue-details">
          <div className="revenue-item">
            <div
              className="revenue-icon"
              style={{ backgroundColor: "#f5f3ff", color: "#926cfd" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
              </svg>
            </div>
            <div className="revenue-info">
              <p className="revenue-value">
                {formatRevenue(cachedMetrics.revenueFromShipments)}
              </p>
              <div className="revenue-item-label">
                <p>{cachedMetrics.totalShipments}</p>
                <p>Shipments</p>
              </div>
            </div>
          </div>
          <div className="revenue-item">
            <div
              className="revenue-icon"
              style={{ backgroundColor: "#ecfdf5", color: "#10b981" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className="revenue-info">
              <p className="revenue-value">
                {formatRevenue(cachedMetrics.revenueFromPickups)}
              </p>
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
          <h2>Order Status</h2>
        </div>
        {!hasOrderStatusData ? (
          <EmptyState
            title="No status data"
            message="There are no order statuses to display."
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            }
            className="sidebar-empty-state"
          />
        ) : (
          <div className="status-content">
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
              <div className="status-item">
                <div className="status-info">
                  <div
                    className="status-dot"
                    style={{ backgroundColor: "#10b981" }}
                  ></div>
                  <p>Paid</p>
                </div>
                <p className="status-value">
                  {(
                    (cachedMetrics.totalPaid * 100) /
                    cachedMetrics.totalOrders
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <div className="status-item">
                <div className="status-info">
                  <div
                    className="status-dot"
                    style={{ backgroundColor: "#f59e0b" }}
                  ></div>
                  <p>Cancelled</p>
                </div>
                <p className="status-value">
                  {(
                    (cachedMetrics.totalCancelled * 100) /
                    cachedMetrics.totalOrders
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <div className="status-item">
                <div className="status-info">
                  <div
                    className="status-dot"
                    style={{ backgroundColor: "#926cfd" }}
                  ></div>
                  <p>Refunded</p>
                </div>
                <p className="status-value">
                  {(
                    (cachedMetrics.totalRefunded * 100) /
                    cachedMetrics.totalOrders
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="orders-summary">
        <div className="orders-sidebar-header">
          <h2>Overview</h2>
        </div>
        {!hasOverviewData ? (
          <EmptyState
            title="No overview data"
            message="There is no order overview data to display."
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
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            }
            className="sidebar-empty-state"
          />
        ) : (
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
              <p className="summary-value">
                {cachedMetrics.totalCancelled + cachedMetrics.totalRefunded}
              </p>
              <p className="summary-title">Orders Lost</p>
            </div>
            <div className="summary-line">
              <p className="summary-value">{cachedMetrics.totalOrders}</p>
              <p className="summary-title">Total Orders</p>
            </div>
            <div className="summary-line">
              <p className="summary-value">
                {cachedMetrics.shippingRate.toFixed(1)}%
              </p>
              <p className="summary-title">Shipping Rate</p>
            </div>
            <div className="summary-line">
              <p className="summary-value">
                {cachedMetrics.rejectRate.toFixed(1)}%
              </p>
              <p className="summary-title">Reject Rate</p>
            </div>
          </div>
        )}
      </div>
      <div className="orders-top-seller">
        <div className="orders-sidebar-header">
          <h2>Top Seller</h2>
        </div>
        {!hasTopSellerData ? (
          <EmptyState
            title="No top seller data"
            message="There are no top selling products to display."
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
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            }
            className="sidebar-empty-state"
          />
        ) : (
          <div className="product-sold">
            <div className="product-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </div>
            <div className="product-sold-details">
              <p className="product-name">
                {cachedMetrics.mostOrderedProduct || "No Product"}
              </p>
              <p className="product-count">
                {
                  orders.filter(
                    (order) =>
                      order.product === cachedMetrics.mostOrderedProduct
                  ).length
                }{" "}
                sales
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSidebar;
