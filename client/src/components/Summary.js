import "../styles/Summary.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

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
    <div className="summary">
      <div className="summary-header">
        <h2>Summary</h2>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>
          <p className="percent">5%</p>
          <p className="date">Last Year</p>
        </div>
      </div>
      <div className="summary-data">
        <div className="summary-chart">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="summary-chart-stat">17</div>
          <div className="summary-chart-head">Total Jobs</div>
        </div>
        <div className="summary-stats">
          <div className="summary-chart-line">
            <div className="rate-bar-color" style={{backgroundColor:'var(--primary-accent)'}}></div>
            <div className="summary-chart-line-stat">
              <p>Active Job</p>
              <p style={{color:'var(--text'}}>52</p>
            </div>
          </div>
          <div className="summary-chart-line">
            <div className="rate-bar-color" style={{backgroundColor:'#47d5c9'}}></div>
            <div className="summary-chart-line-stat">
              <p>Unactive</p>
              <p style={{color:'var(--text'}}>36</p>
            </div>
          </div>
          <div className="summary-chart-line">
            <div className="rate-bar-color" style={{backgroundColor:'#fc9c52'}}></div>
            <div className="summary-chart-line-stat">
              <p>Closed</p>
              <p style={{color:'var(--text'}}>14</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
