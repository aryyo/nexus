import "../styles/Report.css";
import { useState } from "react";

const Report = () => {
  const [selectedAnalytics, setSelectedAnalytics] = useState({
    sales: false,
    customer: false,
    inventory: false,
    performance: false,
  });

  const toggleAnalytic = (key) => {
    setSelectedAnalytics((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="report-page">
      <div className="overview">
        <p>Reports</p>
      </div>

      <div className="report-content">
        <div className="report-card">
          <div className="card-header">
            <h3>Generate Report</h3>
            <button className="primary-button">
              Generate PDF
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>

          <div className="analytics-options">
            <div className="option-item">
              <div className="option-info">
                <h4>Sales Overview</h4>
                <p>Revenue, orders, and sales metrics</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={selectedAnalytics.sales}
                  onChange={() => toggleAnalytic("sales")}
                />
                <span className="report-toggle-slider"></span>
              </label>
            </div>

            <div className="option-item">
              <div className="option-info">
                <h4>Customer Insights</h4>
                <p>Demographics, behavior, and satisfaction</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={selectedAnalytics.customer}
                  onChange={() => toggleAnalytic("customer")}
                />
                <span className="report-toggle-slider"></span>
              </label>
            </div>

            <div className="option-item">
              <div className="option-info">
                <h4>Inventory Status</h4>
                <p>Stock levels, reorder points, and turnover</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={selectedAnalytics.inventory}
                  onChange={() => toggleAnalytic("inventory")}
                />
                <span className="report-toggle-slider"></span>
              </label>
            </div>

            <div className="option-item">
              <div className="option-info">
                <h4>Performance Metrics</h4>
                <p>KPIs, growth rates, and benchmarks</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={selectedAnalytics.performance}
                  onChange={() => toggleAnalytic("performance")}
                />
                <span className="report-toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="report-card">
          <div className="card-header">
            <h3>Recent Reports</h3>
            <button className="secondary-button">
              View All
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="reports-list">
            <div className="report-item">
              <div className="report-info">
                <div className="report-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="report-details">
                  <h4>Sales Report - Dec 2024</h4>
                  <p>Generated on Dec 31, 2024</p>
                </div>
              </div>
              <div className="report-actions">
                <button className="action-button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View
                </button>
                <button className="action-button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
              </div>
            </div>

            <div className="report-item">
              <div className="report-info">
                <div className="report-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="report-details">
                  <h4>Sales Report - Nov 2024</h4>
                  <p>Generated on Nov 30, 2024</p>
                </div>
              </div>
              <div className="report-actions">
                <button className="action-button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View
                </button>
                <button className="action-button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
              </div>
            </div>

            <div className="report-item">
              <div className="report-info">
                <div className="report-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="report-details">
                  <h4>Sales Report - Oct 2024</h4>
                  <p>Generated on Oct 31, 2024</p>
                </div>
              </div>
              <div className="report-actions">
                <button className="action-button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View
                </button>
                <button className="action-button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
