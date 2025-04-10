import React from "react";
import Charts from "../components/Charts";
import Rate from "../components/Rate";
import Summary from "../components/Summary";
import Cards from "../components/Card";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingState";
import { useOrderMetrics } from "../hooks/useOrderMetrics";
import { useUserSettings } from "../hooks/useUserSettings";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { orders, cachedMetrics, loading, error } = useOrderMetrics(true);
  const { settings, loading: settingsLoading, error: settingsError } = useUserSettings();

  if (loading || settingsLoading) {
    return <LoadingSpinner fullPage />;
  }

  if (error || settingsError) {
    return <ErrorMessage message={error || settingsError} fullPage />;
  }

  if (!orders || !cachedMetrics) {
    return null;
  }

  return (
    <div className="content">
      <div className="overview">
        <p>Overview</p>
      </div>
      <Cards orders={orders} cachedMetrics={cachedMetrics} />
      <div className="data">
        <div className="data-graph">
          <Charts orders={orders} cachedMetrics={cachedMetrics} />
        </div>
        <div className="data-cards">
          <Rate orders={orders} cachedMetrics={cachedMetrics} />
          <Summary orders={orders} cachedMetrics={cachedMetrics} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
