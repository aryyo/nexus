import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import { menuItems } from "../data/menuItems";

const Sidebar = ({ active, isOpen, onClose, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleClick = (id) => {
    if (id === "log-out") {
      setShowLogoutModal(true);
      return;
    }

    navigate(`/${id}`);
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-menu">
        <div className="main-menu">
          {menuItems.main.map((item) => (
            <button
              key={item.id}
              className={`sidebar-menu-button ${
                active === item.id ? "active" : ""
              }`}
              onClick={() => handleClick(item.id)}
            >
              {active === item.id ? item.activeIcon : item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="secondary-menu">
          {menuItems.secondary.map((item) => (
            <button
              key={item.id}
              className={`sidebar-menu-button ${
                active === item.id ? "active" : ""
              }`}
              onClick={() => handleClick(item.id)}
            >
              {active === item.id ? item.activeIcon : item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="bottom-menu">
          {menuItems.bottom.map((item) => (
            <button
              key={item.id}
              className={`sidebar-menu-button ${
                active === item.id ? "active" : ""
              }`}
              onClick={() => handleClick(item.id)}
            >
              {active === item.id ? item.activeIcon : item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal">
          <p>Are you sure you want to log out?</p>
          <div className="logout-options">
            <button
              className="logout-cancel"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </button>
            <button className="logout-confirm" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
