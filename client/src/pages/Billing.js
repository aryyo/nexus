import "../styles/Billing.css";

const Billing = () => {
  return (
    <div className="billing-page">
      <div className="overview">
        <p>Billing</p>
      </div>
      <div className="header">
        <button className="calendar">
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
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Last 30 Days
        </button>
        <button className="export">
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
          Download All
        </button>
        <button className="add">
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Change Plan
        </button>
      </div>

      <div className="billing-summary">
        <div className="summary-card">
          <div className="card-header">
            <h2>Current Period</h2>
            <div className="percentage">
              <p className="percent">+12%</p>
              <p className="date">vs last month</p>
            </div>
          </div>
          <div className="card-content">
            <p className="amount">$46.99</p>
            <p className="due-date">
              Due on <span>March 1, 2024</span>
            </p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <h2>Last Period</h2>
            <div className="percentage">
              <p className="percent">+8%</p>
              <p className="date">vs previous</p>
            </div>
          </div>
          <div className="card-content">
            <p className="amount">$49.99</p>
            <p className="due-date">
              Paid on <span>February 1, 2024</span>
            </p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <h2>Payment Method</h2>
            <button className="card-action">
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
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
          <div className="card-content">
            <div className="card-info">
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
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <div>
                <p className="card-number">**** **** **** 1234</p>
                <p className="card-expiry">Expires 12/25</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="billing-history">
        <div className="table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#INV-2024-002</td>
                <td>Feb 1, 2024</td>
                <td>$60.73</td>
                <td>Standard</td>
                <td>
                  <span className="status paid">Paid</span>
                </td>
                <td>
                  <button className="download-button">
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
                    Download
                  </button>
                </td>
              </tr>
              <tr>
                <td>#INV-2024-001</td>
                <td>Jan 1, 2024</td>
                <td>$58.15</td>
                <td>Standard</td>
                <td>
                  <span className="status paid">Paid</span>
                </td>
                <td>
                  <button className="download-button">
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
                    Download
                  </button>
                </td>
              </tr>
              <tr>
                <td>#INV-2023-012</td>
                <td>Dec 1, 2023</td>
                <td>$83.46</td>
                <td>Standard</td>
                <td>
                  <span className="status paid">Paid</span>
                </td>
                <td>
                  <button className="download-button">
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
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
