import Charts from "../components/Charts";
import Rate from "../components/Rate";
import Summary from "../components/Summary";
import Cards from "../components/Card";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="content">
      <div className="overview">
        <p>Overview</p>
      </div>
      <div className="header">
        <button className="calendar">03 Jan 2023 % 10 Mar 2023</button>
        <button className="export">Export</button>
        <button className="add">Add</button>
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
  );
};

export default Dashboard;
