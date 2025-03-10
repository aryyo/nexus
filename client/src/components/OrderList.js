import "../styles/OrderList.css";
import React from "react";
import EmptyState from "./EmptyState";

const formatName = (name) => {
  if (!name) {
    return "Unknown";
  }
  if (name.length > 18) {
    const clippedName = name.slice(0, 15);
    return `${clippedName}...`;
  } else {
    return name;
  }
};

const formatDate = (date) => {
  if (!date) {
    return "Unknown";
  }
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  switch (month) {
    case "01":
      return `Jan ${day}`;
    case "02":
      return `Feb ${day}`;
    case "03":
      return `Mar ${day}`;
    case "04":
      return `Apr ${day}`;
    case "05":
      return `May ${day}`;
    case "06":
      return `Jun ${day}`;
    case "07":
      return `Jul ${day}`;
    case "08":
      return `Aug ${day}`;
    case "09":
      return `Sep ${day}`;
    case "10":
      return `Oct ${day}`;
    case "11":
      return `Nov ${day}`;
    case "12":
      return `Dec ${day}`;
    default:
      return "Unknown";
  }
};

const formatTotal = (total) => {
  if (!total) {
    return "Unknown";
  }
  return `$${total}`;
};

const formatOrderId = (id) => {
  if (!id) {
    return "Unknown";
  }
  return `#${id.slice(0, 8)}`;
};

const columns = [
  { label: "Order", key: "_id", formatter: formatOrderId },
  { label: "Customer", key: "customerName", formatter: formatName },
  { label: "Type", key: "type" },
  { label: "Status", key: "status" },
  { label: "Product", key: "product" },
  { label: "Total", key: "total", formatter: formatTotal },
  { label: "Date", key: "datePlaced", formatter: formatDate },
];

const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        title="No orders found"
        message="There are no orders to display at this time. New orders will appear here."
        icon={
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="empty-state-icon"
          >
            <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
          </svg>
        }
        className="orders-empty-state"
      />
    );
  }

  return (
    <div className="orders-table-wrapper">
      <div className="orders-table">
        <div className="table-header">
          {columns.map((column) => {
            return <p key={column.key}>{column.label}</p>;
          })}
        </div>
        {orders.map((order) => {
          return (
            <div className="table-row" key={order._id}>
              {columns.map((column) => {
                const value = order[column.key];
                const formatter = column.formatter;
                return (
                  <div className="table-column" key={column.key}>
                    {order.status === value ? (
                      <img src={`../icons/${value}.png`} alt="" />
                    ) : (
                      ""
                    )}
                    <p
                      className={
                        order.status === value ? order.status.toLowerCase() : ""
                      }
                    >
                      {formatter ? formatter(value) : value}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
