import "../styles/OrderList.css";
import React from "react";

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

const StatusBadge = ({ status }) => {
  const statusClasses = {
    Paid: "status-badge success",
    Cancelled: "status-badge warning",
    Refunded: "status-badge info",
  };

  return (
    <span className={statusClasses[status] || "status-badge"}>
      {status}
    </span>
  );
};

const TypeBadge = ({ type }) => {
  return (
    <span className={`type-badge ${type.toLowerCase()}`}>
      <svg
        className="type-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {type === "Shipping" ? (
          <>
            <path d="M5 15h14" />
            <path d="M5 9h14" />
            <path d="M17 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
          </>
        ) : (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="m8 12 3 3 5-5" />
          </>
        )}
      </svg>
      {type}
    </span>
  );
};

const columns = [
  { label: "Order", key: "_id", formatter: formatOrderId },
  { label: "Customer", key: "customerName", formatter: formatName },
  { label: "Type", key: "type", component: TypeBadge },
  { label: "Status", key: "status", component: StatusBadge },
  { label: "Product", key: "product" },
  { label: "Total", key: "total", formatter: formatTotal },
  { label: "Date", key: "datePlaced", formatter: formatDate },
  { label: "Actions", key: "actions" }
];

const OrderList = ({ orders, isSelectionMode, selectedOrders, setSelectedOrders, onDelete }) => {
  if (!orders || orders.length === 0) {
    return (
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
          <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
        </svg>
        <h3>No orders found</h3>
        <p>There are no orders to display at this time. New orders will appear here.</p>
      </div>
    );
  }

  const handleOrderSelect = (orderId) => {
    if (!isSelectionMode) return;

    setSelectedOrders(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(orderId)) {
        newSelected.delete(orderId);
      } else {
        newSelected.add(orderId);
      }
      return newSelected;
    });
  };

  const handleDelete = (e, orderId) => {
    e.stopPropagation();
    onDelete(orderId);
  };

  const SelectionCheckbox = ({ isSelected }) => (
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
  );

  return (
    <div className="orders-table-wrapper">
      <div className="orders-table">
        <div className="table-header">
          {columns.map((column) => (
            <div key={column.key} className="header-cell">
              {column.label}
            </div>
          ))}
        </div>
        <div className="table-body">
          {orders.map((order) => {
            const isSelected = selectedOrders?.has(order._id);
            return (
              <div
                className={`table-row ${isSelectionMode ? 'selectable' : ''} ${isSelected ? 'selected' : ''}`}
                key={order._id}
                onClick={() => handleOrderSelect(order._id)}
              >
                {columns.map((column) => {
                  if (column.key === 'actions') {
                    return (
                      <div className="table-cell actions" key={column.key}>
                        {isSelectionMode ? (
                          <SelectionCheckbox isSelected={isSelected} />
                        ) : (
                          <button
                            className="delete-button"
                            onClick={(e) => handleDelete(e, order._id)}
                            title="Delete order"
                          >
                            <svg
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
                          </button>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div className="table-cell" key={column.key}>
                      {column.component ? (
                        <column.component {...{ [column.key.toLowerCase()]: order[column.key] }} />
                      ) : (
                        <span>{column.formatter ? column.formatter(order[column.key]) : order[column.key]}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
