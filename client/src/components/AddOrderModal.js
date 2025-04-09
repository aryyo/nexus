import React, { useState, useEffect } from "react";
import "../styles/Modal.css";
import { useProducts } from "../hooks/useProducts";
import { useInvoices } from "../hooks/useInvoices";

const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};

const VALID_ORDER_TYPES = ["Shipping", "Pickup"];
const VALID_ORDER_STATUSES = ["Paid", "Cancelled", "Refunded"];

const AddOrderModal = ({ isOpen, onClose, onAdd, initialData, mode = "add" }) => {
  const { products, loading: productsLoading, editProduct } = useProducts(true);
  const { addInvoice } = useInvoices();
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
    setErrors({});
  }, [initialData, mode, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!VALID_ORDER_TYPES.includes(formData.type)) {
      newErrors.type = `Invalid order type. Must be one of: ${VALID_ORDER_TYPES.join(", ")}`;
    }

    if (!VALID_ORDER_STATUSES.includes(formData.status)) {
      newErrors.status = `Invalid order status. Must be one of: ${VALID_ORDER_STATUSES.join(", ")}`;
    }

    if (!formData.productName) {
      newErrors.productName = "Please select a product";
    }

    const totalNum = parseFloat(formData.total);
    if (!formData.total || isNaN(totalNum)) {
      newErrors.total = "Total must be a valid number";
    } else if (totalNum <= 0) {
      newErrors.total = "Total must be greater than 0";
    } else if (totalNum > 999999.99) {
      newErrors.total = "Total cannot exceed 999,999.99";
    }

    const dateObj = new Date(formData.date);
    if (isNaN(dateObj.getTime())) {
      newErrors.date = "Invalid date format";
    }

    return newErrors;
  };

  const calculateTotal = (productPrice, orderType, productName) => {
    const salesTaxRate = 0.0725;
    const salesTax = productPrice * salesTaxRate;
    
    let shippingCost = 0;
    if (orderType === "Shipping") {
      shippingCost = ["Laptop", "Monitor"].includes(productName) ? 15 : 5.99;
    }
    
    return {
      total: (productPrice + salesTax + shippingCost).toFixed(2),
      breakdown: {
        productPrice: productPrice.toFixed(2),
        salesTax: salesTax.toFixed(2),
        shippingCost: shippingCost.toFixed(2)
      }
    };
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
      const selectedProduct = products.find(p => p.name === formData.productName);
      if (!selectedProduct) {
        throw new Error("Selected product not found");
      }

      const calculation = calculateTotal(selectedProduct.price, formData.type, selectedProduct.name);
      
      await editProduct(selectedProduct._id, {
        name: selectedProduct.name,
        price: selectedProduct.price,
        stock: selectedProduct.stock - 1,
        image: selectedProduct.image || "https://via.placeholder.com/150"
      });

      const orderData = {
        ...formData,
        total: parseFloat(calculation.total)
      };
      await onAdd(orderData);

      const invoiceData = {
        orderId: formData.id,
        customerName: formData.customerName,
        type: formData.type,
        status: formData.status,
        item: formData.productName,
        subtotal: Number(calculation.breakdown.productPrice),
        tax: Number(calculation.breakdown.salesTax),
        shipping: formData.type === "Pickup" ? 0 : Number(calculation.breakdown.shippingCost),
        total: Number(calculation.total),
        datePlaced: new Date(formData.date)
      };

      try {
        await addInvoice(invoiceData);
      } catch (invoiceError) {
        console.error('Failed to create invoice:', invoiceError);
      }

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
      console.error('Error in order creation:', error);
      setErrors({
        submit: error.message || "Failed to add order. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'productName') {
      const selectedProduct = products.find(p => p.name === value);
      if (selectedProduct) {
        const calculation = calculateTotal(selectedProduct.price, formData.type, selectedProduct.name);
        setFormData(prev => ({
          ...prev,
          [name]: value,
          total: calculation.total,
          breakdown: calculation.breakdown
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          total: "",
          breakdown: null
        }));
      }
    } else if (name === 'type') {
      const selectedProduct = products.find(p => p.name === formData.productName);
      if (selectedProduct) {
        const calculation = calculateTotal(selectedProduct.price, value, selectedProduct.name);
        setFormData(prev => ({
          ...prev,
          [name]: value,
          total: calculation.total,
          breakdown: calculation.breakdown
        }));
      } else {
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

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  if (!isOpen) return null;

  const availableProducts = products.filter(product => product.status !== "Out of Stock");

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
            <label htmlFor="productName">Product</label>
            <select
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              disabled={productsLoading}
            >
              <option value="">Select a product</option>
              {availableProducts.map(product => (
                <option key={product._id} value={product.name}>
                  {product.name} - ${product.price}
                </option>
              ))}
            </select>
            {errors.productName && <div className="error-message">{errors.productName}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="total">Total ($)</label>
            <div className="total-display">
              {formData.breakdown ? (
                <div className="total-calculation">
                  <span>{formData.breakdown.productPrice}</span>
                  <span className="operator">+</span>
                  <span>{formData.breakdown.salesTax}</span>
                  {formData.type === "Shipping" && (
                    <>
                      <span className="operator">+</span>
                      <span>{formData.breakdown.shippingCost}</span>
                    </>
                  )}
                  <span className="operator">=</span>
                  <span className="final-total">{formData.total}</span>
                </div>
              ) : (
                "0.00"
              )}
            </div>
            {errors.total && <div className="error-message">{errors.total}</div>}
            {formData.total && (
              <div className="total-breakdown">
                <small>
                  Includes 7.25% tax and {formData.type === "Shipping" ? 
                    (["Laptop", "Monitor"].includes(formData.productName) ? "$15.00" : "$5.99") + " shipping" : 
                    "no shipping"}
                </small>
              </div>
            )}
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