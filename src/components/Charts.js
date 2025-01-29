import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import "../styles/Charts.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Charts = ({ cachedMetrics }) => {
  const {
    labels,
    revenueData,
    expensesData,
    netProfitData,
  } = useMemo(() => {
    if (!cachedMetrics) {
      return { labels: [], revenueData: [], expensesData: [], netProfitData: [] };
    }

    const {
      monthlyRevenue,
      monthlyExpenses,
      monthlyNetProfit,
    } = cachedMetrics;

    return {
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      revenueData: monthlyRevenue,
      expensesData: monthlyExpenses,
      netProfitData: monthlyNetProfit,
    };
  }, [cachedMetrics]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        fill: false,
        borderColor: "#25da8c",
        backgroundColor: "#25da8c",
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: expensesData,
        fill: false,
        borderColor: "#ffcc4c",
        backgroundColor: "#ffcc4c",
        tension: 0.4,
      },
      {
        label: "Net Profit",
        data: netProfitData,
        fill: false,
        borderColor: "#1d6aec",
        backgroundColor: "#1d6aec",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="charts">
      <div className="charts-header">
        <h2>Trends</h2>
      </div>
      <div className="charts-graph">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Charts;
