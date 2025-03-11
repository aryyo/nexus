import React, { useState, useEffect } from "react";
import "../styles/Modal.css";

const AddOrderModal = ({ isOpen, onClose, onAdd, initialData, mode = "add" }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    type: "Standard",
    status: "Pending",
    productName: "",
    total: "",
    date: new Date().toISOString().split("T")[0]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        customerName: initialData.customer?.name || "",
        type: initialData.type || "Standard",
        status: initialData.status || "Pending",
        productName: initialData.product?.name || "",
        total: initialData.total || "",
        date: initialData.date?.split("T")[0] || new Date().toISOString().split("T")[0]
      });
    }
  }, [initialData]);

  const validatePrice = (value) => {
    const sanitizedValue = value.replace(/[^\d.]/g, '');
    
    const parts = sanitizedValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    
    if (parts[1]?.length > 2) {
      return parts[0] + '.' + parts[1].slice(0, 2);
    }
    
    return sanitizedValue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.total || parseFloat(formData.total) <= 0) {
      setErrors(prev => ({
        ...prev,
        total: "Please enter a valid total amount"
      }));
      return;
    }

    onAdd({
      ...formData,
      total: parseFloat(formData.total)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'total') {
      const validatedPrice = validatePrice(value);
      setFormData(prev => ({
        ...prev,
        [name]: validatedPrice
      }));
      
      if (parseFloat(validatedPrice) > 0) {
        setErrors(prev => ({
          ...prev,
          total: undefined
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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
              <option value="Standard">Shipping</option>
              <option value="Express">Pickup</option>
            </select>
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
              <option value="Pending">Paid</option>
              <option value="Processing">Cancelled</option>
              <option value="Cancelled">Refunded</option>
            </select>
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
          </div>
          <div className="form-group">
            <label htmlFor="total">Total</label>
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
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {mode === "add" ? "Add Order" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal; 