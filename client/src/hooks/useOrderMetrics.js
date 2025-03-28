import { useState, useEffect, useMemo, useCallback } from 'react';

export const useOrderMetrics = (shouldFetch = false) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/orders", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  const addOrder = useCallback(async (orderData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: orderData.id,
          customerName: orderData.customerName,
          type: orderData.type,
          status: orderData.status,
          productName: orderData.productName,
          total: orderData.total,
          date: orderData.date
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add order');
      }

      const newOrder = await response.json();
      setOrders(prevOrders => [...prevOrders, newOrder]);
      return newOrder;
    } catch (err) {
      console.error('Error adding order:', err);
      throw err;
    }
  }, []);

  const bulkDeleteOrders = useCallback(async (orderIds) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch("http://localhost:3000/orders/bulk-delete", {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderIds: Array.from(orderIds) })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete orders');
      }

      // Remove deleted orders from state
      setOrders(prevOrders => 
        prevOrders.filter(order => !orderIds.has(order._id))
      );

      return await response.json();
    } catch (err) {
      console.error('Error deleting orders:', err);
      throw err;
    }
  }, []);

  const deleteOrder = useCallback(async (orderId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete order');
      }

      // Remove deleted order from state
      setOrders(prevOrders => 
        prevOrders.filter(order => order._id !== orderId)
      );

      return await response.json();
    } catch (err) {
      console.error('Error deleting order:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    if (shouldFetch) {
      fetchOrders();
    }
  }, [fetchOrders, shouldFetch]);

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

  return { 
    orders, 
    cachedMetrics, 
    loading, 
    error,
    addOrder,
    bulkDeleteOrders,
    deleteOrder,
    fetchOrders 
  };
};