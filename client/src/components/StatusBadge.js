import React from "react";

export const StatusBadge = ({ status, type }) => {
  const getStatusClass = () => {
    if (type) {
      switch (type.toLowerCase()) {
        case "shipping":
          return "shipping";
        case "pickup":
          return "pickup";
        default:
          return "";
      }
    }

    switch (status?.toLowerCase()) {
      case "paid":
        return "success";
      case "cancelled":
        return "warning";
      case "refunded":
        return "info";
      default:
        return "";
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {type || status || "Unknown"}
    </span>
  );
}; 