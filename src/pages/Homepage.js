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
import "../styles/Homepage.css";

const Homepage = () => {
  const [activeButton, setActiveButton] = useState("dashboard");
  const [previousButton, setPreviousButton] = useState("dashboard");

  const RenderActiveComponent = () => {
    switch (activeButton) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <Orders />;
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


      case "log-out":
        switch (previousButton) {
          case "dashboard":
            return <Dashboard />;
          case "orders":
            return <Orders />;
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
        }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="homepage">
        <Sidebar
          active={activeButton}
          setActive={setActiveButton}
          previous={previousButton}
          setPrevious={setPreviousButton}
        />
        {RenderActiveComponent()}
      </div>
    </div>
  );
};

export default Homepage;
