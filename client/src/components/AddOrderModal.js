import React, { useState, useEffect } from "react";
import "../styles/Modal.css";

const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};

const VALID_ORDER_TYPES = ["Shipping", "Pickup"];
const VALID_ORDER_STATUSES = ["Paid", "Cancelled", "Refunded"];

const AddOrderModal = ({ isOpen, onClose, onAdd, initialData, mode = "add" }) => {
  const [formData, setFormData] = useState({
    id: mode === "add" ? generateOrderId() : (initialData?.id || ""),
    customerName: initialData?.customerName || "",
    type: initialData?.type || "Shipping",
    status: initialData?.status || "Paid",
    productName: initialData?.product || "",
    total: initialData?.total || "",
    date: initialData?.datePlaced || new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: mode === "add" ? generateOrderId() : initialData.id,
        customerName: initialData.customerName || "",
        type: initialData.type || "Shipping",
        status: initialData.status || "Paid",
        productName: initialData.product || "",
        total: initialData.total || "",
        date: initialData.datePlaced?.split("T")[0] || new Date().toISOString().split("T")[0]
      });
    } else if (mode === "add") {
      setFormData(prev => ({
        ...prev,
        id: generateOrderId()
      }));
    }
    // Clear errors when modal opens/closes
    setErrors({});
  }, [initialData, mode, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    // Customer name validation
    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    // Type validation
    if (!VALID_ORDER_TYPES.includes(formData.type)) {
      newErrors.type = `Invalid order type. Must be one of: ${VALID_ORDER_TYPES.join(", ")}`;
    }

    // Status validation
    if (!VALID_ORDER_STATUSES.includes(formData.status)) {
      newErrors.status = `Invalid order status. Must be one of: ${VALID_ORDER_STATUSES.join(", ")}`;
    }

    // Product name validation
    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    // Total validation
    const totalNum = parseFloat(formData.total);
    if (!formData.total || isNaN(totalNum)) {
      newErrors.total = "Total must be a valid number";
    } else if (totalNum <= 0) {
      newErrors.total = "Total must be greater than 0";
    } else if (totalNum > 999999.99) {
      newErrors.total = "Total cannot exceed 999,999.99";
    }

    // Date validation
    const dateObj = new Date(formData.date);
    if (isNaN(dateObj.getTime())) {
      newErrors.date = "Invalid date format";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd({
        ...formData,
        total: parseFloat(formData.total)
      });
      // Reset form and close modal on success
      setFormData({
        id: generateOrderId(),
        customerName: "",
        type: "Shipping",
        status: "Paid",
        productName: "",
        total: "",
        date: new Date().toISOString().split('T')[0],
      });
      setErrors({});
      onClose();
    } catch (error) {
      setErrors({
        submit: error.message || "Failed to add order. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'total') {
      // Allow only numbers and one decimal point
      const regex = /^\d*\.?\d{0,2}$/;
      if (value === '' || regex.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{mode === "add" ? "Add New Order" : "Edit Order"}</h2>
          <button className="close-button" onClick={onClose}>
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
            {errors.customerName && <div className="error-message">{errors.customerName}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              {VALID_ORDER_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <div className="error-message">{errors.type}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              {VALID_ORDER_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            {errors.status && <div className="error-message">{errors.status}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
            {errors.productName && <div className="error-message">{errors.productName}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="total">Total ($)</label>
            <input
              type="text"
              id="total"
              name="total"
              value={formData.total}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
            {errors.total && <div className="error-message">{errors.total}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            {errors.date && <div className="error-message">{errors.date}</div>}
          </div>
          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}
          <div className="modal-footer">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? mode === "add" ? "Adding..." : "Saving..." 
                : mode === "add" ? "Add Order" : "Save Changes"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal; 