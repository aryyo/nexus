import React from 'react';
import "../styles/Sidebar.css";
import { Icons } from './Icons';

const Sidebar = ({ active, setActive, previous, setPrevious, isOpen, onClose }) => {
  const menuItems = {
    main: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: Icons.compass,
        activeIcon: Icons.compassG,
      },
      {
        id: "orders",
        label: "Orders",
        icon: Icons.project,
        activeIcon: Icons.projectG,
      },
      {
        id: "products",
        label: "Products",
        icon: Icons.product,
        activeIcon: Icons.productG,
      },
      {
        id: "billing",
        label: "Billing",
        icon: Icons.invoice,
        activeIcon: Icons.invoiceG,
      },
    ],
    secondary: [
      {
        id: "my-account",
        label: "My Account",
        icon: Icons.user,
        activeIcon: Icons.userG,
      },
      {
        id: "get-help",
        label: "Get Help",
        icon: Icons.help,
        activeIcon: Icons.helpG,
      },
      {
        id: "report",
        label: "Report",
        icon: Icons.report,
        activeIcon: Icons.reportG,
      },
    ],
    bottom: [
      {
        id: "settings",
        label: "Settings",
        icon: Icons.settings,
        activeIcon: Icons.settingsG,
      },
      {
        id: "log-out",
        label: "Log Out",
        icon: Icons.logout,
        activeIcon: Icons.logoutG,
      },
    ],
  };

  const handleClick = (buttonId) => {
    setPrevious(active);
    setActive(buttonId);
    if (window.innerWidth <= 1024) {
      onClose(); // Close sidebar on mobile after clicking a menu item
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="menu-section">
        {menuItems.main.map((button) => (
          <button
            key={button.id}
            onClick={() => handleClick(button.id)}
            className={`menu-button ${active === button.id ? "active" : ""}`}
          >
            {active === button.id ? button.activeIcon : button.icon}
            <span>{button.label}</span>
          </button>
        ))}
      </div>

      <div className="menu-section">
        {menuItems.secondary.map((button) => (
          <button
            key={button.id}
            onClick={() => handleClick(button.id)}
            className={`menu-button ${active === button.id ? "active" : ""}`}
          >
            {active === button.id ? button.activeIcon : button.icon}
            <span>{button.label}</span>
          </button>
        ))}
      </div>

      <div className="menu-section bottom">
        {menuItems.bottom.map((button) => (
          <button
            key={button.id}
            onClick={() => handleClick(button.id)}
            className={`menu-button ${active === button.id ? "active" : ""}`}
          >
            {active === button.id ? button.activeIcon : button.icon}
            <span>{button.label}</span>
          </button>
        ))}
      </div>

      {active === "log-out" && (
        <div className="logout-modal">
          <p>Are you sure you want to log out?</p>
          <div className="logout-options">
            <button className="logout-cancel" onClick={() => handleClick(previous)}>Cancel</button>
            <button className="logout-confirm">Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
