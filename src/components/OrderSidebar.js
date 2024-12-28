import "../styles/OrderSidebar.css";
import { useState, useEffect, useMemo } from "react";
import OrderData from "../data/OrderData";

const OrderSidebar = () => {
  const barLine = useMemo(() => {
    const { paid, cancelled, refunded, total } = OrderData.reduce(
      (acc, order) => {
        acc.total++;
        if (order.status === "Paid") acc.paid++;
        else if (order.status === "Cancelled") acc.cancelled++;
        else if (order.status === "Refunded") acc.refunded++;
        return acc;
      },
      { paid: 0, cancelled: 0, refunded: 0, total: 0 }
    );
    return [
      (100 * paid) / total || 0,
      (100 * cancelled) / total || 0,
      (100 * refunded) / total || 0,
    ];
  }, [OrderData]);

  return (
    <div className="orders-sidebar">
      <div className="receipt-of-goods"></div>
      <div className="orders-status">
        <div className="orders-status-header">
          <p>Order Status</p>
        </div>
        <div>
          <div className="bar">
            <div className="line-one" style={{ flex: barLine[0] }}></div>
            <div className="line-two" style={{ flex: barLine[1] }}></div>
            <div className="line-three" style={{ flex: barLine[2] }}></div>
          </div>
          <div className="bar-data">
            <div className="paid-data">
              <div className="icon-data">
                <img src="../icons/product.png" alt=""></img>
                <p>Paid</p>
              </div>
              <p>{barLine[0]}%</p>
            </div>
            <div className="cancelled-data">
              <div className="icon-data">
                <img src="../icons/product.png" alt=""></img>
                <p>Cancelled</p>
              </div>
              <p>{barLine[1]}%</p>
            </div>
            <div className="refunded-data">
              <div className="icon-data">
                <img src="../icons/product.png" alt=""></img>
                <p>Refunded</p>
              </div>
              <p>{barLine[2]}%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="orders-summary"></div>
    </div>
  );
};

export default OrderSidebar;
