import "../styles/Account.css";
import { useOrderMetrics } from "../hooks/useOrderMetrics";
import { useUser } from "../hooks/useUser";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingState";
import { useState } from "react";

const Account = () => {
  const { orders, cachedMetrics, loading: ordersLoading, error: ordersError } = useOrderMetrics(true);
  const { user, loading: userLoading, error: userError, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: ""
  });
  const [editError, setEditError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validatePhoneNumber = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(cleanPhone);
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 10) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
  };

  if (ordersLoading || userLoading) {
    return <LoadingSpinner fullPage />;
  }

  if (ordersError || userError) {
    return <ErrorMessage message={ordersError || userError} fullPage />;
  }

  const totalIncome = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const successRate = orders.length > 0 
    ? Math.round((orders.filter(order => order.status === "Paid").length / orders.length) * 100)
    : 0;

  const handleEditClick = () => {
    setEditData({
      name: user.name || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || ""
    });
    setIsEditing(true);
    setValidationErrors({});
  };

  const handleSave = async () => {
    const errors = {};
    if (editData.phoneNumber && !validatePhoneNumber(editData.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number (e.g., +1234567890)";
    }
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await updateUser(editData);
      setIsEditing(false);
      setEditError("");
      setValidationErrors({});
    } catch (error) {
      setEditError(error.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditError("");
    setValidationErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "phoneNumber") {
      const formattedValue = formatPhoneNumber(value);
      setEditData(prev => ({
        ...prev,
        [name]: formattedValue
      }));

      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));

      if (value) {
        if (!validatePhoneNumber(value)) {
          setValidationErrors(prev => ({
            ...prev,
            phoneNumber: "Please enter a valid phone number (e.g., 123-456-7890)"
          }));
        }
      }
    } else {
      setEditData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="account-page">
      <div className="overview">
        <p>My Account</p>
      </div>

      <div className="account-grid">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-info">
              <img
                src={user.profilePicture || "/profile.jpg"}
                alt="Profile"
                className="profile-avatar"
              />
              <div className="profile-details">
                <h2>{user.name || "User"}</h2>
                <p>{user.email || "No email provided"}</p>
              </div>
            </div>
            <div className="profile-actions">
              <button className="action-button">
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Change Photo
              </button>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">${totalIncome.toLocaleString()}</span>
              <span className="stat-label">Total Income</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{successRate}%</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{totalOrders}</span>
              <span className="stat-label">Total Orders</span>
            </div>
          </div>
        </div>

        <div className="cards-container">
          <div className="info-card">
            <div className="card-header">
              <h3>Personal Information</h3>
              {!isEditing ? (
                <button className="edit-button" onClick={handleEditClick}>
                  <svg
                    width="15"
                    height="15"
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
                  Edit
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="cancel-button" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="save-button" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              )}
            </div>
            <div className="info-grid">
              <div className="info-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <p>{user.name || "Not provided"}</p>
                )}
              </div>
              <div className="info-group">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <p>{user.email || "Not provided"}</p>
                )}
              </div>
              <div className="info-group">
                <label>Phone Number</label>
                {isEditing ? (
                  <>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={editData.phoneNumber}
                      onChange={handleInputChange}
                      className={`info-input ${validationErrors.phoneNumber ? 'error' : ''}`}
                      placeholder="123-456-7890"
                    />
                    {validationErrors.phoneNumber && (
                      <span className="validation-error">{validationErrors.phoneNumber}</span>
                    )}
                  </>
                ) : (
                  <p>{user.phoneNumber || "Not provided"}</p>
                )}
              </div>
              <div className="info-group">
                <label>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={editData.address}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <p>{user.address || "Not provided"}</p>
                )}
              </div>
            </div>
            {editError && <div className="error-message">{editError}</div>}
          </div>

          <div className="security-card">
            <div className="card-header">
              <h3>Security</h3>
            </div>
            <div className="security-content">
              <div className="security-item">
                <div className="security-info">
                  <h4>Password</h4>
                  <p>Last changed 3 months ago</p>
                </div>
                <button className="secondary-button">Change Password</button>
              </div>
              <div className="security-item">
                <div className="security-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security</p>
                </div>
                <button className="primary-button">Enable 2FA</button>
              </div>
              <div className="security-item">
                <div className="security-info">
                  <h4>Active Sessions</h4>
                  <p>2 devices currently signed in</p>
                </div>
                <button className="secondary-button">View All</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
