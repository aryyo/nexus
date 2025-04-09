export const formatOrderId = (id) => {
  if (!id) return "N/A";
  return id.slice(0, 8).toUpperCase();
};

export const formatTotal = (total) => {
  if (typeof total !== "number") return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);
};

export const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}; 