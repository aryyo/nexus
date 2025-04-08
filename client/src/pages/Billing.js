import React from "react";
import { useInvoices } from "../hooks/useInvoices";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingState";
import "../styles/Billing.css";

const Billing = () => {
  const { invoices, loading, error } = useInvoices(true);

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (error) {
    return <ErrorMessage message={error} fullPage />;
  }

  const hasInvoices = invoices && invoices.length > 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="billing-page">
      <div className="overview">
        <p>Billing</p>
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

      {!hasInvoices ? (
        <div className="empty-state">
          <svg
            className="empty-state-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 8-10 6L2 8" />
          </svg>
          <h3>No invoices found</h3>
          <p>
            There are no invoices to display at this time. New invoices will appear
            here.
          </p>
        </div>
      ) : (
        <div className="billing-history">
          <div className="table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td>#{invoice.orderId}</td>
                    <td>{invoice.customerName}</td>
                    <td>{formatDate(invoice.datePlaced)}</td>
                    <td>{invoice.type}</td>
                    <td>{formatCurrency(invoice.total)}</td>
                    <td>
                      <span className={`status ${invoice.status.toLowerCase()}`}>
                        {invoice.status}
                      </span>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
