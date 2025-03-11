import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Help from "./Help";
import Product from "./Product";
import Billing from "./Billing";
import Account from "./Account";
import Report from "./Report";
import Settings from "./Settings";
import "../styles/Homepage.css";

const Homepage = ({ setIsLoggedIn }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="homepage-container">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="homepage">
        <Sidebar
          active={location.pathname.substring(1) || "dashboard"}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          setIsLoggedIn={setIsLoggedIn}
        />
        {isSidebarOpen && (
          <div
            className={`sidebar-backdrop ${isSidebarOpen ? "active" : ""}`}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Product />} />
          <Route path="/help" element={<Help />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/account" element={<Account />} />
          <Route path="/report" element={<Report />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Homepage;
