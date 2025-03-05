import "../styles/OrderSidebar.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

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
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${percentage}%`;
          }
        }
      },
    },
  };

  return (
    <div className="orders-sidebar">
      <div className="receipt-of-goods">
        <div className="orders-sidebar-header">
          <h2>Receipt of Goods</h2>
          <div className="receipt-percentage">
            <p className="percent">+8%</p>
            <p className="date">vs last month</p>
          </div>
        </div>
        <div className="revenue-chart">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="chart-center">
            <p className="total-value">{formatRevenue(cachedMetrics.revenueFromShipments + cachedMetrics.revenueFromPickups)}</p>
            <p className="total-label">Total Revenue</p>
          </div>
        </div>
        <div className="revenue-details">
          <div className="revenue-item">
            <div className="revenue-icon" style={{ backgroundColor: "#f5f3ff", color: "#926cfd" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3h5v5M21 3l-7 7M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5" />
              </svg>
            </div>
            <div className="revenue-info">
              <p className="revenue-value">{formatRevenue(cachedMetrics.revenueFromShipments)}</p>
              <div className="revenue-item-label">
                <p>{cachedMetrics.totalShipments}</p>
                <p>Shipments</p>
              </div>
            </div>
          </div>
          <div className="revenue-item">
            <div className="revenue-icon" style={{ backgroundColor: "#ecfdf5", color: "#10b981" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3m8-3h3a2 2 0 012 2v3M3 12h18" />
              </svg>
            </div>
            <div className="revenue-info">
              <p className="revenue-value">{formatRevenue(cachedMetrics.revenueFromPickups)}</p>
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
          <div className="status-percentage">
            <p className="percent">+12%</p>
            <p className="date">vs last month</p>
          </div>
        </div>
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
                <div className="status-dot" style={{ backgroundColor: "#10b981" }}></div>
                <p>Paid</p>
              </div>
              <p className="status-value">
                {((cachedMetrics.totalPaid * 100) / cachedMetrics.totalOrders).toFixed(1)}%
              </p>
            </div>
            <div className="status-item">
              <div className="status-info">
                <div className="status-dot" style={{ backgroundColor: "#f59e0b" }}></div>
                <p>Cancelled</p>
              </div>
              <p className="status-value">
                {((cachedMetrics.totalCancelled * 100) / cachedMetrics.totalOrders).toFixed(1)}%
              </p>
            </div>
            <div className="status-item">
              <div className="status-info">
                <div className="status-dot" style={{ backgroundColor: "#926cfd" }}></div>
                <p>Refunded</p>
              </div>
              <p className="status-value">
                {((cachedMetrics.totalRefunded * 100) / cachedMetrics.totalOrders).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="orders-summary">
        <div className="orders-sidebar-header">
          <h2>Overview</h2>
          <div className="summary-percentage">
            <p className="percent">+15%</p>
            <p className="date">vs last month</p>
          </div>
        </div>
        <div className="summary-stats">
          <div className="summary-line">
            <p className="summary-value">{formatRevenue(cachedMetrics.averagePrice)}</p>
            <p className="summary-title">Average Order</p>
          </div>
          <div className="summary-line">
            <p className="summary-value">{formatRevenue(cachedMetrics.totalRevenue)}</p>
            <p className="summary-title">Total Revenue</p>
          </div>
          <div className="summary-line">
            <p className="summary-value">{cachedMetrics.totalCancelled + cachedMetrics.totalRefunded}</p>
            <p className="summary-title">Orders Lost</p>
          </div>
          <div className="summary-line">
            <p className="summary-value">{cachedMetrics.totalOrders}</p>
            <p className="summary-title">Total Orders</p>
          </div>
          <div className="summary-line">
            <p className="summary-value">{cachedMetrics.shippingRate.toFixed(1)}%</p>
            <p className="summary-title">Shipping Rate</p>
          </div>
          <div className="summary-line">
            <p className="summary-value">{cachedMetrics.rejectRate.toFixed(1)}%</p>
            <p className="summary-title">Reject Rate</p>
          </div>
        </div>
      </div>
      <div className="orders-top-seller">
        <div className="orders-sidebar-header">
          <h2>Top Seller</h2>
          <div className="seller-percentage">
            <p className="percent">+23%</p>
            <p className="date">vs last month</p>
          </div>
        </div>
        <div className="product-sold">
          <div className="product-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
          </div>
          <div className="product-sold-details">
            <p className="product-name">{cachedMetrics.mostOrderedProduct || "No Product"}</p>
            <p className="product-count">
              {orders.filter((order) => order.product === cachedMetrics.mostOrderedProduct).length} sales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSidebar;
