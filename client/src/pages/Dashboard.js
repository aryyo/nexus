import React from 'react';
import Charts from "../components/Charts";
import Rate from "../components/Rate";
import Summary from "../components/Summary";
import Cards from "../components/Card";
import { Icons } from "../components/Icons";
import "../styles/Dashboard.css";

const Dashboard = ({ orders, cachedMetrics }) => {
  if (!orders || !cachedMetrics) {
    return null;
  }

  return (
    <div className="content">
      <div className="overview">
        <p>Overview</p>
      </div>
      <div className="header">
        <button className="calendar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          03 Jan 2023 - 10 Mar 2023
        </button>
        <button className="export">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export
        </button>
        <button className="add">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add
        </button>
      </div>
      <Cards cachedMetrics={cachedMetrics}/>
      <div className="data">
        <div className="data-graph">
          <Charts orders={orders} cachedMetrics={cachedMetrics} />
        </div>
        <div className="data-cards">
          <Rate />
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
