import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";
import '../styles/Charts.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Charts = ({ orders, cachedMetrics }) => {
  const getMonthlyData = () => {
    const currentDate = new Date();
    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      return date;
    });

    const monthlyRevenue = new Array(6).fill(0);
    const monthlyExpenses = new Array(6).fill(0);
    const monthlySalesTax = new Array(6).fill(0);
    const monthlyNetProfit = new Array(6).fill(0);

    orders.forEach(order => {
      const orderDate = new Date(order.datePlaced);
      if (orderDate >= lastSixMonths[5]) { 
        const monthIndex = lastSixMonths.findIndex(date => date.getMonth() === orderDate.getMonth() && date.getFullYear() === orderDate.getFullYear());
        
        if (order.status === "Paid") {
          monthlyRevenue[monthIndex] += cachedMetrics.revenueFromShipments + cachedMetrics.revenueFromPickups;
          monthlySalesTax[monthIndex] += cachedMetrics.salesTax;
          monthlyExpenses[monthIndex] += cachedMetrics.shippingCosts;
        }
      }
    });

    for (let i = 0; i < 6; i++) {
      monthlyNetProfit[i] = monthlyRevenue[i] - monthlySalesTax[i] - monthlyExpenses[i];
    }

    return {
      labels: lastSixMonths.map(date => date.toLocaleString("default", { month: "short", year: "numeric" })),
      revenueData: monthlyRevenue,
      expensesData: monthlyExpenses,
      netProfitData: monthlyNetProfit,
    };
  };

  const { labels, revenueData, expensesData, netProfitData } = useMemo(() => getMonthlyData(), [orders, cachedMetrics]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        fill: false,
        borderColor: "#25da8c", 
        tension: .1,
      },
      {
        label: "Expenses",
        data: expensesData,
        fill: false,
        borderColor: "#ea85c0", 
        tension: .1,
      },
      {
        label: "Net Profit",
        data: netProfitData,
        fill: false,
        borderColor: "#99551a", 
        tension: .1,
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
        <h2>Trends</h2>
      </div>
      <div className="charts-graph">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Charts;
