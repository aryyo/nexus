import React, { useState, useEffect, useRef } from "react";
import "../styles/Navbar.css";
import { Icons } from "./Icons";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useUserSettings } from "../hooks/useUserSettings";

const Navbar = ({ onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, updateUser } = useUser();
  const { settings, updateSettings } = useUserSettings();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (settings) {
      document.documentElement.setAttribute(
        "data-theme",
        settings.interfaceTheme || "light"
      );
      document.documentElement.setAttribute(
        "data-sidebar-transparent",
        settings.transparentSidebar ? "true" : "false"
      );
      document.documentElement.setAttribute(
        "data-compact-view",
        settings.tablePreference === "compact" ? "true" : "false"
      );
    }
  }, [settings]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSettingChange = (setting, value) => {
    const updates = {
      ...settings,
      [setting]: value,
    };
    updateSettings(updates);
  };

  const validatePhoneNumber = (phone) => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length === 10;
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(
        6,
        10
      )}`;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditClick = () => {
    setEditData({
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
    });
    setValidationErrors({});
    setIsEditing(true);
  };

  const handlePhoneChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setEditData((prev) => ({
      ...prev,
      phoneNumber: formattedNumber,
    }));

    if (!formattedNumber) {
      setValidationErrors((prev) => ({
        ...prev,
        phoneNumber: "Phone number is required",
      }));
    } else if (!validatePhoneNumber(formattedNumber)) {
      setValidationErrors((prev) => ({
        ...prev,
        phoneNumber: "Please enter a valid 10-digit phone number",
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        phoneNumber: "",
      }));
    }
  };

  const handleThemeChange = (selectedTheme) => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    // console.log("Theme changed to:", selectedTheme);
    handleSettingChange("interfaceTheme", selectedTheme);
  };

  const handleSidebarTransparencyChange = (e) => {
    e.stopPropagation();
    const value = e.target.checked;
    document.documentElement.setAttribute(
      "data-sidebar-transparent",
      value ? "true" : "false"
    );
    handleSettingChange("transparentSidebar", value);
  };

  const handleCompactViewChange = (e) => {
    e.stopPropagation();
    const value = e.target.checked;
    document.documentElement.setAttribute(
      "data-compact-view",
      value ? "true" : "false"
    );
    handleSettingChange("tablePreference", value ? "compact" : "default");
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleSave = async () => {
    const errors = {};

    if (!editData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!editData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!editData.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(editData.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    if (!editData.address.trim()) {
      errors.address = "Address is required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await updateUser(editData);
      setIsEditing(false);
      setValidationErrors({});
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <button className="nav-button menu-toggle" onClick={onToggleSidebar}>
          {Icons.menu}
        </button>
        {Icons.linux}
        <div className="search-box">
          {Icons.search}
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="nav-right">
        {/* <button className="nav-button">{Icons.mail}</button>
        <button className="nav-button">{Icons.bell}</button> */}
        <div
          className="user-profile"
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          {Icons.user}
          {showDropdown && (
            <div
              className="user-dropdown-menu"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dropdown-header">
                <img
                  src={user?.profilePicture || "/profile.jpg"}
                  alt="Profile"
                  className="dropdown-avatar"
                />
                <div className="dropdown-user-info">
                  <h4>{user?.name || "User"}</h4>
                  <p>{user?.email || "No email provided"}</p>
                </div>
              </div>
              <div className="dropdown-divider" />
              <button className="dropdown-item" onClick={handleEditClick}>
                <div className="settings-label">Edit Profile</div>
                <span>
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
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                  </svg>
                </span>
              </button>
              <div className="dropdown-divider" />
              <div className="dropdown-settings">
                <div className="settings-item">
                  <div className="settings-label">Theme</div>
                  <div
                    className="theme-toggle"
                    data-theme={settings?.interfaceTheme || "light"}
                  >
                    <button
                      className={`theme-btn light ${
                        settings?.interfaceTheme === "light" ? "active" : ""
                      }`}
                      onClick={() => handleThemeChange("light")}
                      title="Light Mode"
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
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                      </svg>
                    </button>
                    <button
                      className={`theme-btn dark ${
                        settings?.interfaceTheme === "dark" ? "active" : ""
                      }`}
                      onClick={() => handleThemeChange("dark")}
                      title="Dark Mode"
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
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="settings-item">
                  <div className="settings-label">Transparent Sidebar</div>
                  <label
                    className="settings-toggle"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={settings?.transparentSidebar || false}
                      onChange={handleSidebarTransparencyChange}
                    />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
                <div className="settings-item">
                  <div className="settings-label">Compact Spacing</div>
                  <label
                    className="settings-toggle"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={settings?.tablePreference === "compact"}
                      onChange={handleCompactViewChange}
                    />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
              </div>
              <div className="dropdown-divider" />
              <button className="dropdown-item logout" onClick={handleLogout}>
                <div className="settings-label">Log Out</div>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="edit-profile-modal">
          <div className="navbar-modal-content">
            <div className="navbar-modal-header">
              <div className="navbar-profile-section">
                <img
                  src={user?.profilePicture || "/profile.jpg"}
                  alt="Profile"
                  className="navbar-profile-picture"
                />
                <button className="navbar-change-photo-btn">
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
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                  </svg>
                  Change Photo
                </button>
              </div>
              <div className="navbar-form-section">
                <h3>Edit Profile</h3>
                <div className="navbar-input-group">
                  <input
                    type="text"
                    value={editData.name}
                    placeholder="Full Name"
                    onChange={(e) => {
                      setEditData({ ...editData, name: e.target.value });
                      if (e.target.value.trim()) {
                        setValidationErrors({ ...validationErrors, name: "" });
                      }
                    }}
                    className={validationErrors.name ? "error" : ""}
                  />
                  {validationErrors.name && (
                    <span className="navbar-error-message">{validationErrors.name}</span>
                  )}
                </div>
                <div className="navbar-input-group">
                  <input
                    type="email"
                    value={editData.email}
                    placeholder="Email Address"
                    onChange={(e) => {
                      setEditData({ ...editData, email: e.target.value });
                      if (e.target.value.trim()) {
                        setValidationErrors({ ...validationErrors, email: "" });
                      }
                    }}
                    className={validationErrors.email ? "error" : ""}
                  />
                  {validationErrors.email && (
                    <span className="navbar-error-message">{validationErrors.email}</span>
                  )}
                </div>
                <div className="navbar-input-group">
                  <input
                    type="tel"
                    value={editData.phoneNumber}
                    placeholder="Phone Number"
                    onChange={handlePhoneChange}
                    className={validationErrors.phoneNumber ? "error" : ""}
                  />
                  {validationErrors.phoneNumber && (
                    <span className="navbar-error-message">{validationErrors.phoneNumber}</span>
                  )}
                </div>
                <div className="navbar-input-group">
                  <input
                    type="text"
                    value={editData.address}
                    placeholder="Address"
                    onChange={(e) => {
                      setEditData({ ...editData, address: e.target.value });
                      if (e.target.value.trim()) {
                        setValidationErrors({ ...validationErrors, address: "" });
                      }
                    }}
                    className={validationErrors.address ? "error" : ""}
                  />
                  {validationErrors.address && (
                    <span className="navbar-error-message">{validationErrors.address}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="navbar-modal-actions">
              <button className="navbar-cancel-button" onClick={() => {
                setIsEditing(false);
                setValidationErrors({});
              }}>
                Cancel
              </button>
              <button className="navbar-save-button" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
