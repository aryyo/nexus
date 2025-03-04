import "../styles/Summary.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutData = {
  labels: ["Shipments", "Pickups", "Returns"],
  datasets: [
    {
      label: "Order Fulfillment",
      data: [2, 12, 3], 
      backgroundColor: ["#47d5c9", "#fc9c52", "#926cfd"],  
      hoverBackgroundColor: ["#47d5c9", "#fc9c52", "#926cfd"],  
      borderColor: ["#47d5c9", "#fc9c52", "#926cfd"],  
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
  // Make it a half-doughnut
  cutout: "75%",  
  rotation: -90,  
  circumference: 180,  
};


const Summary = () => {
  return (
    <div className="summary-widget">
      <div className="summary-widget-header">
        <h2>Summary</h2>
        <div className="rate-row-two">
          <p className="percent">5%</p>
          <p className="date">Last Year</p>
        </div>
      </div>
      <div className="summary-widget-data">
        <div className="summary-widget-chart">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="summary-widget-chart-stat">17</div>
          <div className="summary-widget-chart-head">Total Jobs</div>
        </div>
        <div className="summary-widget-stats">
          <div className="summary-widget-stat-line">
            <div className="summary-widget-dot" style={{backgroundColor:'var(--primary-accent)'}}></div>
            <div className="summary-widget-stat-details">
              <p>Active Job</p>
              <p>52</p>
            </div>
          </div>
          <div className="summary-widget-stat-line">
            <div className="summary-widget-dot" style={{backgroundColor:'#47d5c9'}}></div>
            <div className="summary-widget-stat-details">
              <p>Unactive</p>
              <p>36</p>
            </div>
          </div>
          <div className="summary-widget-stat-line">
            <div className="summary-widget-dot" style={{backgroundColor:'#fc9c52'}}></div>
            <div className="summary-widget-stat-details">
              <p>Closed</p>
              <p>14</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
