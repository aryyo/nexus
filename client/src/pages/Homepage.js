import React, { useState, useEffect, useMemo } from "react";
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
// import OrderData from "../data/OrderData";
import "../styles/Homepage.css";

const Homepage = () => {
  const [activeButton, setActiveButton] = useState("dashboard");
  const [previousButton, setPreviousButton] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const cachedMetrics = useMemo(() => {
    const totalOrders = orders.length;
  
    const revenueFromShipments = orders
      .filter((order) => order.type === "Shipping" && order.status === "Paid")
      .reduce((acc, order) => acc + order.total, 0);
  
    const revenueFromPickups = orders
      .filter((order) => order.type === "Pickup" && order.status === "Paid")
      .reduce((acc, order) => acc + order.total, 0);
  
    const totalRevenue = revenueFromPickups + revenueFromShipments;
  
    const totalPaid = orders.filter((order) => order.status === "Paid").length;
    const totalCancelled = orders.filter((order) => order.status === "Cancelled").length;
    const totalRefunded = orders.filter((order) => order.status === "Refunded").length;
  
    const averagePrice = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const rejectRate = totalOrders > 0 ? ((totalCancelled + totalRefunded) * 100) / totalOrders : 0;
  
    const totalShipments = orders.filter((order) => order.type === "Shipping").length;
    const totalPickups = orders.filter((order) => order.type === "Pickup").length;
    
    const shippingRate = totalOrders > 0 ? (totalShipments * 100) / totalOrders : 0;
  
    const productCount = orders.reduce((acc, order) => {
      const product = order.product;
      acc[product] = (acc[product] || 0) + 1;
      return acc;
    }, {});
  
    const mostOrderedProduct = Object.entries(productCount).reduce(
      (max, [product, count]) => (count > max.count ? { product, count } : max),
      { product: "", count: 0 }
    );
  
    const salesTaxRate = 0.0725;
    const salesTax = totalRevenue * salesTaxRate;
  
    const shippingCosts = orders
      .filter((order) => order.type === "Shipping" && order.status === "Paid")
      .reduce((acc, order) => {
        let cost = 5.99;
        if (["Laptop", "Monitor"].includes(order.product)) cost = 15;
        return acc + cost;
      }, 0);
  
    const packagingCosts = orders
      .filter((order) => order.status === "Paid")
      .reduce((acc, order) => {
        let cost = 2.99; // Small items
        if (["Laptop", "Monitor"].includes(order.product)) cost = 9.99; // Larger items
        return acc + cost;
      }, 0);
  
    const warehouseExpenses = totalOrders * 3; 
  
    const refundProcessingCosts = orders
      .filter((order) => order.status === "Refunded")
      .reduce((acc, order) => acc + 10, 0); 
  
    const monthlyRevenue = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);
    const monthlySalesTax = Array(12).fill(0);
  
    orders.forEach((order) => {
      const orderDate = new Date(order.datePlaced);
      const monthIndex = orderDate.getMonth();
  
      if (order.status === "Paid") {
        monthlyRevenue[monthIndex] += order.total;
        monthlySalesTax[monthIndex] += (salesTax / totalOrders);
        monthlyExpenses[monthIndex] += (shippingCosts + refundProcessingCosts + packagingCosts + warehouseExpenses) / totalOrders;
      }
    });

  
    const monthlyNetProfit = monthlyRevenue.map((revenue, i) => {
      return revenue - monthlySalesTax[i] - monthlyExpenses[i];
    });
  
    const netProfit = monthlyNetProfit.reduce((acc, profit) => acc + profit, 0);
    const income = totalRevenue > 0 ? netProfit / 12 : 0;
    const totalExpenses = monthlyExpenses.reduce((acc, expense) => acc + expense, 0);
    const totalNetProfit = monthlyNetProfit.reduce((acc, profit) => acc + profit, 0);
  
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
      salesTax,
      shippingCosts,
      netProfit,
      monthlyRevenue, 
      monthlyExpenses, 
      monthlyNetProfit, 
      income,
      totalExpenses,
      totalNetProfit,
    };
  }, [orders]);
  
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
