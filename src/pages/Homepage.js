import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Calendar from "./Calendar";
import Projects from "./Projects";
import Notifications from "./Notifications";
import Inventory from "./Inventory";
import Performance from "./Performance";
import Settings from "./Settings";
import Help from "./Help";
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
      case "calendar":
        return <Calendar />;
      case "projects":
        return <Projects />;
      case "notifications":
        return <Notifications />;
      case "inventory":
        return <Inventory />;
      case "performance":
        return <Performance />;
      case "settings":
        return <Settings />;
      case "help":
        return <Help />;
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
