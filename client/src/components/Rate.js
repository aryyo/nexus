import "../styles/Rate.css";

const Rate = () => {
  return (
    <div className="rate">
      <div className="rate-header">
        <h2>Insights</h2>
        <div className="rate-row-two">
          <p className="percent">5%</p>
          <p className="date">Last Year</p>
        </div>
      </div>
      <div className="rate-section">
        <div className="rate-row-two">
          <p className="count">85%</p>
        </div>
        <div className="rate-bar">
          <div className="rate-line-one" style={{ flex: 87 }}></div>
          <div className="rate-line-two" style={{ flex: 34 }}></div>
          <div className="rate-line-three" style={{ flex: 29 }}></div>
        </div>
        <div className="rate-bar-legend">
          <div>
            <div
              className="rate-bar-color"
              style={{ backgroundColor: "#0aaf60" }}
            ></div>
            <p className="rate-bar-color-name">Sales</p>
          </div>
          <div>
            <div
              className="rate-bar-color"
              style={{ backgroundColor: "#ffcc4c" }}
            ></div>
            <p className="rate-bar-color-name">Expenses</p>
          </div>
          <div>
            <div
              className="rate-bar-color"
              style={{ backgroundColor: "#1d6aec" }}
            ></div>
            <p className="rate-bar-color-name">Profit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rate;
