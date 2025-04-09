import "../styles/OrderList.css";
import React from "react";
import { formatOrderId, formatTotal, formatDate } from "../utils/formatters";
import { StatusBadge } from "./StatusBadge";

const formatName = (name) => {
  if (!name) return "Unknown";
  return name;
};

const formatType = (type) => {
  if (!type) return "Unknown";
  return type;
};

const columns = [
  { label: "Order", key: "_id", formatter: formatOrderId },
  { label: "Customer", key: "customerName", formatter: formatName },
  { label: "Type", key: "type", component: StatusBadge },
  { label: "Status", key: "status", component: StatusBadge },
  { label: "Product", key: "product" },
  { label: "Total", key: "total", formatter: formatTotal },
  { label: "Date", key: "datePlaced", formatter: formatDate },
  { label: "Actions", key: "actions" }
];

const OrderList = ({ orders, isSelectionMode, selectedOrders, setSelectedOrders, onDelete, onEdit }) => {
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
        <div className="table-header" style={{ gridTemplateColumns: "repeat(8, minmax(0, 1fr))" }}>
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
                          <div className="order-actions">
                            {onEdit && (
                              <button
                                className="icon-button edit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEdit(order);
                                }}
                                title="Edit order"
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
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                              </button>
                            )}
                            {onDelete && (
                              <button
                                className="icon-button delete"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(e, order._id);
                                }}
                                title="Delete order"
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
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div className="table-cell" key={column.key}>
                      {column.component ? (
                        column.key === "type" ? (
                          <column.component type={order[column.key]} />
                        ) : (
                          <column.component status={order[column.key]} />
                        )
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
