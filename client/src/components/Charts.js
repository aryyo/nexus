import React, { useState, useEffect } from "react";
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
import { useUserSettings } from "../hooks/useUserSettings";
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

const VALID_TIMEFRAMES = ["3months", "6months", "year"];

const Charts = ({ cachedMetrics }) => {
  const { settings, updateSettings, loading: settingsLoading, error: settingsError } = useUserSettings();
  const [timeframe, setTimeframe] = useState("6months");
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (settings?.timeFrame && VALID_TIMEFRAMES.includes(settings.timeFrame)) {
      setTimeframe(settings.timeFrame);
    }
  }, [settings]);

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
    switch (timeframe) {
      case "3months":
        monthsToShow = 3;
        break;
      case "year":
        monthsToShow = 12;
        break;
      default:
        monthsToShow = 6;
    }

    const selectedMonths = [];
    const selectedRevenue = [];
    const selectedExpenses = [];

    for (let i = monthsToShow - 1; i >= 0; i--) {
      let monthIndex = currentMonth - i;
      if (monthIndex < 0) {
        monthIndex += 12;
      }

      selectedMonths.push(months[monthIndex]);

      let dataIndex = monthIndex;
      if (monthIndex > currentMonth) {
        dataIndex = cachedMetrics.monthlyRevenue.length - (12 - monthIndex);
      }

      selectedRevenue.push(cachedMetrics.monthlyRevenue[dataIndex] || 0);
      selectedExpenses.push(cachedMetrics.monthlyExpenses[dataIndex] || 0);
    }

    const hasData =
      selectedRevenue.some((val) => val > 0) || selectedExpenses.some((val) => val > 0);

    return {
      labels: selectedMonths,
      revenueData: selectedRevenue,
      expenseData: selectedExpenses,
      hasData,
    };
  }, [cachedMetrics, timeframe]);

  const handleTimeframeChange = async (e) => {
    const newTimeframe = e.target.value;
    
    if (!VALID_TIMEFRAMES.includes(newTimeframe)) {
      setUpdateError("Invalid timeframe selected");
      return;
    }

    setTimeframe(newTimeframe);
    setIsUpdating(true);
    setUpdateError(null);
    
    try {
      await updateSettings({
        ...settings,
        timeFrame: newTimeframe
      });
    } catch (error) {
      console.error('Failed to update timeframe preference:', error);
      setUpdateError("Failed to save your preference. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

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

  return (
    <div className="charts">
      <div className="charts-header">
        <h2>Financial Performance</h2>
        <div className="timeframe-selector">
          {(updateError || settingsError) && (
            <span className="error-message">{updateError || settingsError}</span>
          )}
          <select 
            className={`timeframe ${isUpdating ? 'updating' : ''}`}
            value={timeframe} 
            onChange={handleTimeframeChange}
            disabled={settingsLoading || isUpdating}
          >
            <option value="3months">Last 3 months</option>
            <option value="6months">Last 6 months</option>
            <option value="year">Last 12 months</option>
          </select>
          {(settingsLoading || isUpdating) && (
            <div className="loading-indicator-wrapper">
              <span className="loading-indicator"></span>
            </div>
          )}
        </div>
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
