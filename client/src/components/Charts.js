import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import "../styles/Charts.css";
import EmptyState from "./EmptyState";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ cachedMetrics }) => {
  const [timeframe, setTimeframe] = useState("6months");

  const { labels, revenueData, expenseData, hasData } = useMemo(() => {
    if (
      !cachedMetrics ||
      !cachedMetrics.monthlyRevenue ||
      !cachedMetrics.monthlyExpenses
    ) {
      return {
        labels: [],
        revenueData: [],
        expenseData: [],
        hasData: false,
      };
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();

    let monthsToShow;
    let startMonth;

    switch (timeframe) {
      case "3months":
        monthsToShow = 3;
        startMonth = Math.max(0, currentMonth - 2);
        break;
      case "year":
        monthsToShow = 12;
        startMonth = Math.max(0, currentMonth - 11);
        break;
      default: // 6months
        monthsToShow = 6;
        startMonth = Math.max(0, currentMonth - 5);
    }

    const selectedMonths = months.slice(startMonth, startMonth + monthsToShow);
    if (startMonth + monthsToShow > 12) {
      selectedMonths.push(...months.slice(0, (startMonth + monthsToShow) % 12));
    }

    const revenueData = cachedMetrics.monthlyRevenue.slice(
      startMonth,
      startMonth + monthsToShow
    );
    const expenseData = cachedMetrics.monthlyExpenses.slice(
      startMonth,
      startMonth + monthsToShow
    );

    // Check if there's any non-zero data
    const hasData =
      revenueData.some((val) => val > 0) || expenseData.some((val) => val > 0);

    return {
      labels: selectedMonths,
      revenueData,
      expenseData,
      hasData,
    };
  }, [cachedMetrics, timeframe]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        backgroundColor: "#10b981",
        borderRadius: {
          topLeft: 4,
          topRight: 4,
          bottomLeft: 0,
          bottomRight: 0,
        },
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "#fbbf24",
        borderRadius: {
          topLeft: 4,
          topRight: 4,
          bottomLeft: 0,
          bottomRight: 0,
        },
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
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
        callbacks: {
          title: () => "Financial Performance",
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": $";
            }
            label += context.parsed.y.toFixed(2);
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        stacked: false,
        grid: {
          color: "#f3f4f6",
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
          callback: function (value) {
            return "$" + value.toFixed(0);
          },
          beginAtZero: true,
        },
        border: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
      },
    },
  };

  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="charts">
      <div className="charts-header">
        <h2>Financial Performance</h2>
        <select className="timeframe" value={timeframe} onChange={handleTimeframeChange}>
          <option value="3months">Last 3 months</option>
          <option value="6months">Last 6 months</option>
          <option value="year">Last year</option>
        </select>
      </div>
      <div className="charts-graph">
        {!hasData ? (
          <EmptyState
            title="No financial data available"
            message="Start making sales to see your performance metrics"
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
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg>
            }
            className="chart-empty-state"
          />
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default Charts;
