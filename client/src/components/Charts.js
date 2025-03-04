import React from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = ({ cachedMetrics }) => {
  const {
    labels,
    projectData,
    productData,
  } = useMemo(() => {
    // Simulated data to match the screenshot
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      projectData: [25, 45, 30, 50, 25, 35],
      productData: [20, 40, 25, 45, 20, 25],
    };
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Project",
        data: projectData,
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
        label: "Product",
        data: productData,
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
      mode: 'index',
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
          title: () => "Performance Team",
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y + 'K';
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        stacked: true,
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
        stacked: true,
        grid: {
          color: "#f3f4f6",
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
          callback: function(value) {
            return value + '%';
          },
          max: 100,
          stepSize: 25,
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    layout: {
      padding: {
        top: 20
      }
    }
  };

  return (
    <div className="charts">
      <div className="charts-header">
        <h2>Performance Team</h2>
        <select className="time-select">
          <option>Last 6 month</option>
          <option>Last year</option>
          <option>Last 3 months</option>
        </select>
      </div>
      <div className="charts-graph">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Charts;
