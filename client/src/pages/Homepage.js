import React, { useState } from "react";
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
import { useOrderMetrics } from "../hooks/useOrderMetrics";
import "../styles/Homepage.css";

const Homepage = () => {
  const [activeButton, setActiveButton] = useState("dashboard");
  const [previousButton, setPreviousButton] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { orders, cachedMetrics, loading, error } = useOrderMetrics();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const RenderActiveComponent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    switch (activeButton) {
      case "dashboard":
        return <Dashboard orders={orders} cachedMetrics={cachedMetrics} />;
      case "orders":
        return <Orders orders={orders} cachedMetrics={cachedMetrics} />;
      case "help":
        return <Help />;
      case "products":
        return <Product />;
      case "billing":
        return <Billing />;
      case "get-help":
        return <Help />;
      case "my-account":
        return <Account />;
      case "report":
        return <Report />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard orders={orders} cachedMetrics={cachedMetrics} />;

      case "log-out":
        switch (previousButton) {
          case "dashboard":
            return <Dashboard orders={orders} cachedMetrics={cachedMetrics} />;
          case "orders":
            return <Orders orders={orders} cachedMetrics={cachedMetrics} />;
          case "help":
            return <Help />;
          case "products":
            return <Product />;
          case "billing":
            return <Billing />;
          case "get-help":
            return <Help />;
          case "my-account":
            return <Account />;
          case "report":
            return <Report />;
          case "settings":
            return <Settings />;
          default:
            return <Dashboard orders={orders} cachedMetrics={cachedMetrics} />;
        }
    }
  };

  return (
    <div className="homepage-container">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="homepage">
        <Sidebar
          active={activeButton}
          setActive={setActiveButton}
          previous={previousButton}
          setPrevious={setPreviousButton}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {isSidebarOpen && (
          <div 
            className={`sidebar-backdrop ${isSidebarOpen ? 'active' : ''}`}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        {RenderActiveComponent()}
      </div>
    </div>
  );
};

export default Homepage;
