import React, { useState, useMemo } from "react";
import OrderData from "../data/OrderData";
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
  const [orders, setOrders] = useState(OrderData);

  const cachedMetrics = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.status === "Paid" ? order.total : 0),
      0
    );
    const totalPaid = orders.filter((order) => order.status === "Paid").length;
    const totalCancelled = orders.filter(
      (order) => order.status === "Cancelled"
    ).length;
    const totalRefunded = orders.filter(
      (order) => order.status === "Refunded"
    ).length;

    const averagePrice = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const rejectRate =
      totalOrders > 0
        ? ((totalCancelled + totalRefunded) * 100) / totalOrders
        : 0;
    const totalShipments = orders.filter(
      (order) => order.type === "Shipping"
    ).length;
    const totalPickups = orders.filter(
      (order) => order.type === "Pickup"
    ).length;
    const shippingRate =
      totalOrders > 0 ? (totalShipments * 100) / totalOrders : 0;

    // Calculate the revenue from shipments and pickups
    const revenueFromShipments = orders
      .filter((order) => order.type === "Shipping" && order.status === "Paid")
      .reduce((acc, order) => acc + order.total, 0);

    const revenueFromPickups = orders
      .filter((order) => order.type === "Pickup" && order.status === "Paid")
      .reduce((acc, order) => acc + order.total, 0);

    // Find the most ordered product
    const productCount = orders.reduce((acc, order) => {
      const product = order.product;
      acc[product] = (acc[product] || 0) + 1;
      return acc;
    }, {});

    const mostOrderedProduct = Object.entries(productCount).reduce(
      (max, [product, count]) => (count > max.count ? { product, count } : max),
      { product: "", count: 0 }
    );

    return {
      totalOrders,
      totalRevenue,
      totalPaid,
      totalCancelled,
      totalRefunded,
      averagePrice,
      rejectRate,
      shippingRate,
      totalShipments,
      totalPickups,
      revenueFromShipments,
      revenueFromPickups,
      mostOrderedProduct: mostOrderedProduct.product,
    };
  }, [orders]);

  const RenderActiveComponent = () => {
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
