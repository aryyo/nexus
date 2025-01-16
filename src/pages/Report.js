import "../styles/Report.css";

const Report = () => {
  return (
    <div className="report-container">
      <div className="report-title">
        <p>Report</p>
      </div>
      <div className="report-content">
        <section className="analytics-selection">
          <h2>Select Analytics to Include</h2>
          <form className="analytics-form">
            <label>
              Sales Overview
              <input type="checkbox" name="sales" />
              <span className="toggle-slider"></span>
            </label>
            <label>
              Customer Insights
              <input type="checkbox" name="customer" />
              <span className="toggle-slider"></span>
            </label>
            <label>
              Inventory Status
              <input type="checkbox" name="inventory" />
              <span className="toggle-slider"></span>
            </label>
            <label>
              Performance Metrics
              <input type="checkbox" name="performance" />
              <span className="toggle-slider"></span>
            </label>
          </form>

          <button className="generate-button">Generate PDF</button>
        </section>
        <section className="recent-reports">
          <h2>Recent Reports</h2>
          <div className="reports-list">
            <div className="report-item">
              <div className="report-gen-title">
                <p>Sales Report - Dec 2024</p>
              </div>
              <div className="report-buttons">
                <button className="view-button">View</button>
                <button className="download-button">Download</button>
              </div>
            </div>
            <div className="report-item">
              <div className="report-gen-title">
                <p>Sales Report - Nov 2024</p>
              </div>
              <div className="report-buttons">
                <button className="view-button">View</button>
                <button className="download-button">Download</button>
              </div>
            </div>
            <div className="report-item">
              <div className="report-gen-title">
                <p>Sales Report - Sep 2024</p>
              </div>
              <div className="report-buttons">
                <button className="view-button">View</button>
                <button className="download-button">Download</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Report;
