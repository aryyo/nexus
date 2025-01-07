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

  const changeTheme = () => {
    const html = document.querySelector("html");
    const currTheme = html.getAttribute("data-theme");
    if (currTheme === "dark") {
      html.setAttribute("data-theme", "light");
    } else {
      html.setAttribute("data-theme", "dark");
    }
  };

  const RenderActiveComponent = () => {
    switch (activeButton) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <Orders />;
      case "help":
        return <Help />;
      case "products":
        return <Product/>;
      case "billing":
        return <Billing/>;
      case "get-help":
        return <Help/>;
      case "my-account":
        return <Account/>;
      case "report":
        return <Report/>
      case "settings":
        return <Settings/>;
    }
  };

  return (
    <div>
      <Navbar />
      {/* <button onClick={changeTheme}>Change Theme</button> */}
      <div className="homepage">
        <Sidebar active={activeButton} setActive={setActiveButton} />
        {RenderActiveComponent()}
      </div>
    </div>
  );
};

export default Homepage;
