import React from 'react';
import "../styles/Summary.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = () => {
  const doughnutData = {
    labels: ["Active", "Unactive", "Closed"],
    datasets: [
      {
        label: "Jobs",
        data: [52, 36, 14],
        backgroundColor: ["#926cfd", "#10b981", "#fbbf24"],
        hoverBackgroundColor: ["#7c5ce7", "#0d9669", "#f59e0b"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

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

  return (
    <div className="summary-widget">
      <div className="summary-widget-header">
        <h2>Summary</h2>
        <div className="summary-info">
          <p className="percent">+5%</p>
          <p className="date">vs last year</p>
        </div>
      </div>
      <div className="summary-widget-data">
        <div className="summary-widget-chart">
          <Doughnut data={doughnutData} options={options} />
          <div className="summary-widget-chart-center">
            <p className="summary-widget-chart-stat">102</p>
            <p className="summary-widget-chart-head">Total Jobs</p>
          </div>
        </div>
        <div className="summary-widget-stats">
          <div className="summary-widget-stat-line">
            <div className="summary-widget-dot" style={{ backgroundColor: "#926cfd" }}></div>
            <div className="summary-widget-stat-details">
              <p>Active Jobs</p>
              <p>52</p>
            </div>
          </div>
          <div className="summary-widget-stat-line">
            <div className="summary-widget-dot" style={{ backgroundColor: "#10b981" }}></div>
            <div className="summary-widget-stat-details">
              <p>Unactive Jobs</p>
              <p>36</p>
            </div>
          </div>
          <div className="summary-widget-stat-line">
            <div className="summary-widget-dot" style={{ backgroundColor: "#fbbf24" }}></div>
            <div className="summary-widget-stat-details">
              <p>Closed Jobs</p>
              <p>14</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
