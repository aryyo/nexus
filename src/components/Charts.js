import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";
import '../styles/Charts.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Charts = ({ orders, cachedMetrics }) => {
  const getMonthlyRevenueData = () => {
    const currentDate = new Date();
    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      return date;
    });

    const monthlyRevenue = new Array(6).fill(0); 

    orders.forEach(order => {
      const orderDate = new Date(order.datePlaced);
      if (orderDate >= lastSixMonths[5]) { 
        const monthIndex = lastSixMonths.findIndex(date => date.getMonth() === orderDate.getMonth() && date.getFullYear() === orderDate.getFullYear());
        if (order.status === "Paid") {
          monthlyRevenue[monthIndex] += order.total; 
        }
      }
    });

    return {
      labels: lastSixMonths.map(date => date.toLocaleString("default", { month: "short", year: "numeric" })), // Month labels
      data: monthlyRevenue, 
    };
  };


  const { labels, data } = useMemo(() => getMonthlyRevenueData(), [orders]);


  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data,
        fill: false,
        borderColor: "#25da8c", 
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,  
    maintainAspectRatio: false, 
  };

  return (
    <div className="charts">
      <div className="charts-header">
        <h2>Revenue Trends</h2>
        <button className="timeframe">Last 6 Months</button>
      </div>
      <div className="charts-graph">
        <Line data={chartData} options={chartOptions}
        />
      </div>
    </div>
  );
};

export default Charts;
