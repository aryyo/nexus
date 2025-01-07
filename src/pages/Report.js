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
              <input type="checkbox" name="sales" />
              Sales Overview
            </label>
            <label>
              <input type="checkbox" name="customer" />
              Customer Insights
            </label>
            <label>
              <input type="checkbox" name="inventory" />
              Inventory Status
            </label>
            <label>
              <input type="checkbox" name="performance" />
              Performance Metrics
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
              <div className="report-gen-date">
                <p>
                  <strong>Date:</strong> 01 Jan 2025
                </p>
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
              <div className="report-gen-date">
                <p>
                  <strong>Date:</strong> 01 Jan 2025
                </p>
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
              <div className="report-gen-date">
                <p>
                  <strong>Date:</strong> 01 Jan 2025
                </p>
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
