import React, { useState } from "react";
import { useInvoices } from "../hooks/useInvoices";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingState";
import InvoicePDF from "../components/InvoicePDF";
import "../styles/Billing.css";
import "../styles/OrderList.css";
import { formatOrderId as orderFormatter } from "../utils/formatters";

const formatName = (name) => {
  if (!name) return "Unknown";
  return name;
};

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTotal = (total) => {
  if (typeof total !== "number") return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);
};

const columns = [
  { label: "Invoice ID", key: "orderId", formatter: orderFormatter },
  { label: "Customer", key: "customerName", formatter: formatName },
  { label: "Date", key: "datePlaced", formatter: formatDate },
  { label: "Total", key: "total", formatter: formatTotal },
  { label: "Actions", key: "actions" },
];

const Billing = () => {
  const { invoices, loading, error, deleteInvoice, bulkDeleteInvoices } = useInvoices(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState(new Set());

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInvoices = invoices?.filter((invoice) => {
    const searchLower = searchQuery.toLowerCase();
    const formattedTotal = formatTotal(invoice.total);
    return (
      orderFormatter(invoice.orderId).toLowerCase().includes(searchLower) ||
      invoice.customerName.toLowerCase().includes(searchLower) ||
      formattedTotal.toLowerCase().includes(searchLower)
    );
  }) || [];

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedInvoices(new Set());
  };

  const handleDelete = async (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await deleteInvoice(invoiceId);
      } catch (error) {
        console.error('Failed to delete invoice:', error);
        alert("Failed to delete invoice. Please try again.");
      }
    }
  };

  const handleBulkDelete = async () => {
    try {
      await bulkDeleteInvoices(Array.from(selectedInvoices));
      setSelectedInvoices(new Set());
      setIsSelectionMode(false);
    } catch (error) {
      console.error('Failed to delete invoices:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (error) {
    return <ErrorMessage message={error} fullPage />;
  }

  const hasInvoices = invoices && invoices.length > 0;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth();
  const lastMonthName = months[currentMonth === 0 ? 11 : currentMonth - 1];
  const currentMonthName = months[currentMonth];
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="billing-page">
      <div className="overview">
        <p>Billing</p>
      </div>
      <div className="billing-summary">
        <div className="summary-card">
          <div className="card-header">
            <h2>Current Period</h2>
          </div>
          <div className="card-content">
            <p className="amount">$46.99</p>
            <p className="due-date">
              Due on <span>{lastMonthName} 1, {currentYear}</span>
            </p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <h2>Last Period</h2>
          </div>
          <div className="card-content">
            <p className="amount">$49.99</p>
            <p className="due-date">
              Paid on <span>{currentMonthName} 1, {currentYear}</span>
            </p>
          </div>
        </div>

        <div className="summary-card subscription-card">
          <div className="card-header">
            <h2>Subscription Plan</h2>
          </div>
          <div className="card-content">
            <div className="card-info">
              <div>
                <p className="card-number">Premium Member</p>
                <p className="card-expiry">Active</p>
              </div>
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
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
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
        <>
          <div className="header">
            <div className="search-box">
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
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            {selectedInvoices.size > 0 && isSelectionMode ? (
              <button
                className={`export active`}
                onClick={handleBulkDelete}
              >
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
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                Remove ({selectedInvoices.size})
              </button>
            ) : (
              <button
                className={`export ${isSelectionMode ? 'active' : ''}`}
                onClick={toggleSelectionMode}
              >
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
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                Remove
              </button>
            )}
          </div>
          <div className="invoice-table-wrapper">
            <div className="invoice-table">
              <div
                className="invoice-table-header"
              >
                {columns.map((column) => (
                  <div key={column.key} className="invoice-header-cell">
                    {column.label}
                  </div>
                ))}
              </div>
              <div className="invoice-table-body">
                {filteredInvoices.map((invoice) => {
                  const isSelected = selectedInvoices.has(invoice._id);
                  return (
                    <div
                      className={`invoice-table-row ${isSelectionMode ? 'selectable' : ''} ${isSelected ? 'selected' : ''}`}
                      key={invoice._id}
                      onClick={() => {
                        if (isSelectionMode) {
                          setSelectedInvoices(prev => {
                            const newSelected = new Set(prev);
                            if (newSelected.has(invoice._id)) {
                              newSelected.delete(invoice._id);
                            } else {
                              newSelected.add(invoice._id);
                            }
                            return newSelected;
                          });
                        }
                      }}
                    >
                      {columns.map((column) => {
                        if (column.key === "actions") {
                          return (
                            <div className="invoice-table-cell actions" key={column.key}>
                              {isSelectionMode ? (
                                <div className={`checkbox ${isSelected ? 'checked' : ''}`}>
                                  {isSelected && (
                                    <svg
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
                                </div>
                              ) : (
                                <div className="order-actions">
                                  <InvoicePDF invoice={invoice} />
                                  <button
                                    className="icon-button delete"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(invoice._id);
                                    }}
                                    title="Delete invoice"
                                  >
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
                                      <path d="M3 6h18" />
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                      <line x1="10" y1="11" x2="10" y2="17" />
                                      <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        }
                        return (
                          <div className="invoice-table-cell" key={column.key}>
                            <span>
                              {column.formatter
                                ? column.formatter(invoice[column.key])
                                : invoice[column.key]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Billing;
