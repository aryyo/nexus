import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import { Icons } from './Icons';
import { menuItems } from "../data/menuItems";

const Sidebar = ({ active, isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (id === "log-out") {
      // Handle logout logic here
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
              className={`sidebar-menu-button ${active === item.id ? "active" : ""}`}
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
              className={`sidebar-menu-button ${active === item.id ? "active" : ""}`}
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
              className={`sidebar-menu-button ${active === item.id ? "active" : ""}`}
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
