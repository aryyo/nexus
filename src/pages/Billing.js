import "../styles/Billing.css";

const Billing = () => {
  return (
    <div className="billing-container">
      <header className="billing-header">
        <p>Billing</p>
      </header>
      <div className="billing-content">
        <div className="billing-summary">
          <div className="summary-card">
            <h2>So far</h2>
            <p className="amount">$46.99</p>
            <p>
              You will pay on <strong>March 1, 2022</strong>
            </p>
          </div>
          <div className="summary-card">
            <h2>Last month</h2>
            <p className="amount">$49.99</p>
            <p>
              You paid on <strong>February 1, 2022</strong>
            </p>
          </div>
          <div className="summary-card">
            <h2>Card details</h2>
            <p>**** **** **** 1234</p>
            <p>Exp: **/**</p>
            <a href="#" className="change-card-link">
              Change card →
            </a>
          </div>
          <div className="summary-card">
            <h2>Pricing Calculator</h2>
            <p>Want to have more pods or change the pod type?</p>
            <a href="#" className="calculate-link">
              Calculate it →
            </a>
          </div>
        </div>

        <section className="billing-history">
          <header className="history-header">
            <h2>Payment history and invoicing</h2>
            <button className="download-all-button">Download All</button>
          </header>
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Feb 2022</td>
                <td>USD $60.73</td>
                <td>Standard</td>
                <td className="status-paid">Paid</td>
                <td>
                  <a href="#" className="download-invoice-link">
                    Download Invoice
                  </a>
                </td>
              </tr>
              <tr>
                <td>Jan 2022</td>
                <td>USD $58.15</td>
                <td>Standard</td>
                <td className="status-paid">Paid</td>
                <td>
                  <a href="#" className="download-invoice-link">
                    Download Invoice
                  </a>
                </td>
              </tr>
              <tr>
                <td>Dec 2021</td>
                <td>USD $83.46</td>
                <td>Standard</td>
                <td className="status-paid">Paid</td>
                <td>
                  <a href="#" className="download-invoice-link">
                    Download Invoice
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Billing;
