import "../styles/Charts.css";

const Charts = () => {
  return (
    <div className="charts">
      <div className="charts-header">
        <h2>Revenue Trends</h2>
        <button className="timeframe">Last 6 Months</button>
      </div>
      <div className="charts-graph"></div>
    </div>
  );
};

export default Charts;
