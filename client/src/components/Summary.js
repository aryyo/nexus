import React, { useMemo } from "react";
import "../styles/Summary.css";
import EmptyState from "./EmptyState";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = ({ cachedMetrics }) => {
  const { chartData, totalOrders, orderStats, hasData } =
    useMemo(() => {
      if (!cachedMetrics || !cachedMetrics.totalOrders) {
        return {
          chartData: {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: [],
                borderWidth: 0,
                cutout: "75%",
              },
            ],
          },
          totalOrders: 0,
          orderStats: [],
          hasData: false,
        };
      }

      const paid = cachedMetrics.totalPaid;
      const cancelled = cachedMetrics.totalCancelled;
      const refunded = cachedMetrics.totalRefunded;
      const total = paid + cancelled + refunded;

      // Check if there's any data
      if (total === 0) {
        return {
          chartData: {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: [],
                borderWidth: 0,
                cutout: "75%",
              },
            ],
          },
          totalOrders: 0,
          orderStats: [],
          hasData: false,
        };
      }

      return {
        chartData: {
          labels: ["Paid", "Cancelled", "Refunded"],
          datasets: [
            {
              label: "Orders",
              data: [paid, cancelled, refunded],
              backgroundColor: ["#926cfd", "#10b981", "#fbbf24"],
              hoverBackgroundColor: ["#7c5ce7", "#0d9669", "#f59e0b"],
              borderWidth: 0,
              cutout: "75%",
            },
          ],
        },
        totalOrders: total,
        orderStats: [
          { label: "Paid Orders", value: paid, color: "#926cfd" },
          { label: "Cancelled Orders", value: cancelled, color: "#10b981" },
          { label: "Refunded Orders", value: refunded, color: "#fbbf24" },
        ],
        hasData: true,
      };
    }, [cachedMetrics]);

  const options = {
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
      },
    },
  };

  if (!hasData) {
    return (
      <div className="summary-widget">
        <div className="summary-widget-header">
          <h2>Summary</h2>
        </div>
        <EmptyState
          title="No order data available"
          message="Your order summary will appear here"
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
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          }
          className="summary-empty-state"
        />
      </div>
    );
  }

  return (
    <div className="summary-widget">
      <div className="summary-widget-header">
        <h2>Summary</h2>
      </div>
      <div className="summary-widget-data">
        <div className="summary-widget-chart">
          <Doughnut data={chartData} options={options} />
          <div className="summary-widget-chart-center">
            <p className="summary-widget-chart-stat">{totalOrders}</p>
            <p className="summary-widget-chart-head">Total Orders</p>
          </div>
        </div>
        <div className="summary-widget-stats">
          {orderStats.map((stat, index) => (
            <div key={index} className="summary-widget-stat-line">
              <div
                className="summary-widget-dot"
                style={{ backgroundColor: stat.color }}
              ></div>
              <div className="summary-widget-stat-details">
                <p>{stat.label}</p>
                <p>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
