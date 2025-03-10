import React, { useState, useEffect } from "react";
import "../styles/AddProductModal.css";

const AddProductModal = ({
  isOpen,
  onClose,
  onAdd,
  initialData,
  mode = "add",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        image: initialData.image || "",
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    // Price validation
    const priceRegex = /^\d+(\.\d{0,2})?$/;
    if (!formData.price || !priceRegex.test(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a valid number with up to 2 decimal places";
    } else if (parseFloat(formData.price) > 999999.99) {
      newErrors.price = "Price cannot exceed 999,999.99";
    }

    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }
    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      const priceRegex = /^\d*\.?\d{0,2}$/;
      if (value === '' || priceRegex.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
      return;
    }

    if (name === 'stock') {
      const stockRegex = /^\d*$/;
      if (value === '' || stockRegex.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
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
        price: Number(formData.price),
        stock: Number(formData.stock),
      });
      onClose();
      setFormData({
        name: "",
        price: "",
        stock: "",
        image: "",
      });
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{mode === "edit" ? "Edit Product" : "Add New Product"}</h2>
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
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={errors.name ? "error" : ""}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className={errors.price ? "error" : ""}
            />
            {errors.price && (
              <span className="error-message">{errors.price}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock Quantity</label>
            <input
              type="text"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className={errors.stock ? "error" : ""}
            />
            {errors.stock && (
              <span className="error-message">{errors.stock}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className={errors.image ? "error" : ""}
            />
            {errors.image && (
              <span className="error-message">{errors.image}</span>
            )}
          </div>

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? mode === "edit"
                  ? "Updating..."
                  : "Adding..."
                : mode === "edit"
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
