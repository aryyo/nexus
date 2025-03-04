import "../styles/Rate.css";

const Rate = () => {
  return (
    <div className="rate">
      <div className="rate-header">
        <h2>Insights</h2>
        <div className="rate-row-two">
          <p className="percent">+12%</p>
          <p className="date">vs last month</p>
        </div>
      </div>
      <div className="rate-section">
        <div className="rate-row-two">
          <p className="count">85%</p>
          <p className="label">Success Rate</p>
        </div>
        <div className="rate-bars">
          <div className="rate-bar">
            <div className="rate-bar-info">
              <span>Sales</span>
              <span>87%</span>
            </div>
            <div className="rate-bar-progress">
              <div className="rate-line-one" style={{ '--target-width': '87%' }}></div>
            </div>
          </div>
          <div className="rate-bar">
            <div className="rate-bar-info">
              <span>Expenses</span>
              <span>34%</span>
            </div>
            <div className="rate-bar-progress">
              <div className="rate-line-two" style={{ '--target-width': '34%' }}></div>
            </div>
          </div>
          <div className="rate-bar">
            <div className="rate-bar-info">
              <span>Profit</span>
              <span>29%</span>
            </div>
            <div className="rate-bar-progress">
              <div className="rate-line-three" style={{ '--target-width': '29%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rate;
