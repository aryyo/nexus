import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Card";
import Charts from "../components/Charts";
import Rate from "../components/Rate";
import Summary from "../components/Summary";
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

  return (
    <div>
      <Navbar />
      <div className="homepage">
        <Sidebar active={activeButton} setActive={setActiveButton} />
        <div className="content">
          {/* <button onClick={changeTheme}>Change Theme</button> */}
          <div className="overview">
            <p>Overview</p>
          </div>
          <div className="header">
            <button className="calendar">calendar</button>
            <button className="export">export</button>
            <button className="add">add</button>
          </div>
          <Cards />
          <div className="data">
            <Charts />
            <div className="data-cards">
              <Rate />
              <Summary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
