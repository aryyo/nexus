import React from "react";
import { useInvoices } from "../hooks/useInvoices";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingState";
import InvoicePDF from "../components/InvoicePDF";
import "../styles/Billing.css";
import "../styles/OrderList.css";

const formatOrderId = (id) => {
  if (!id) return "Unknown";
  return `#${id.slice(0, 8)}`;
};

const formatName = (name) => {
  if (!name) return "Unknown";
  return name;
};

const formatTotal = (total) => {
  if (typeof total !== "number") return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);
};

const formatDate = (date) => {
  if (!date) return "Unknown";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const columns = [
  { label: "Invoice ID", key: "orderId", formatter: formatOrderId },
  { label: "Customer", key: "customerName", formatter: formatName },
  { label: "Date", key: "datePlaced", formatter: formatDate },
  { label: "Total", key: "total", formatter: formatTotal },
  { label: "Actions", key: "actions" },
];

const Billing = () => {
  const { invoices, loading, error } = useInvoices(true);

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (error) {
    return <ErrorMessage message={error} fullPage />;
  }

  const hasInvoices = invoices && invoices.length > 0;

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
            There are no invoices to display at this time. New invoices will
            appear here.
          </p>
        </div>
      ) : (
        <div className="orders-table-wrapper">
          <div className="orders-table">
            <div
              className="table-header"
              style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}
            >
              {columns.map((column) => (
                <div key={column.key} className="header-cell">
                  {column.label}
                </div>
              ))}
            </div>
            <div className="table-body">
              {invoices.map((invoice) => (
                <div
                  className="table-row"
                  key={invoice._id}
                  style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}
                >
                  {columns.map((column) => {
                    if (column.key === "actions") {
                      return (
                        <div className="table-cell actions" key={column.key}>
                          <InvoicePDF invoice={invoice} />
                        </div>
                      );
                    }
                    return (
                      <div className="table-cell" key={column.key}>
                        {column.component ? (
                          <column.component
                            {...{
                              [column.key.toLowerCase()]: invoice[column.key],
                            }}
                          />
                        ) : (
                          <span>
                            {column.formatter
                              ? column.formatter(invoice[column.key])
                              : invoice[column.key]}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
