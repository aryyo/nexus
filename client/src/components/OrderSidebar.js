import "../styles/OrderSidebar.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderSidebar = ({ orders, cachedMetrics }) => {
  const formatRevenue = (value) => {
    if (value >= 1_000_000) {
      console.log(value);
      return `$${(value / 1_000_000).toFixed(2)}M`;
      // } else if (value >= 100_000) {
      //   return `$${(value / 1_000).toFixed(1)}K`
    } else if (value >= 1_000) {
      return `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
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
                <div
                  className="rate-bar-color"
                  style={{ backgroundColor: "#3cb371" }}
                ></div>
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
                <div
                  className="rate-bar-color"
                  style={{ backgroundColor: "#fd9b52" }}
                ></div>
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
                <div
                  className="rate-bar-color"
                  style={{ backgroundColor: "#926cfd" }}
                ></div>
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
