import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import { menuItems } from "../data/menuItems";

const Sidebar = ({ active, isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
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
      </div>
    </div>
  );
};

export default Sidebar;
