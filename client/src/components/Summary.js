import "../styles/Summary.css";

const Summary = () => {
  return (
    <div className="summary">
      <div className="summary-header">
        <h2>Summary</h2>
        <p className="percent">5%</p>
        <p className="date">Last Year</p>
      </div>
      <div className="summary-data">
        <div className="summary-chart"></div>
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
