import "../styles/OrderSidebar.css";
import { useState } from "react";
import OrderData from "./OrderData";

const OrderSidebar = () => {
  const [bar, setBar] = useState();
  let paid = 0;
  let cancelled = 0;
  let refunded = 0;
  let total = OrderData.length;

  OrderData.forEach((order) => {
    if (order.status === "Paid") {
      paid++;
    } else if (order.status === "Cancelled") {
      cancelled++;
    } else if (order.status === "Refunded") {
      refunded++;
    }
  });

  return (
    <div className="orders-sidebar">
      <div className="receipt-of-goods">
        <div className="bar">
          <div className="line-one" style={{ flex: paid }}></div>
          <div className="line-two" style={{ flex: cancelled  }}></div>
          <div className="line-three" style={{ flex: refunded  }}></div>
        </div>
        <div className="bar-data">
            <div className="paid-data">
                <p>Paid</p>
                <p>{(paid/total) * 100}%</p>
            </div>
            <div className="cancelled-data">
                <p>Cancelled</p>
                <p>{(cancelled/total) * 100}%</p>
            </div>
            <div className="refunded-data">
                <p>Refunded</p>
                <p>{(refunded/total) * 100}%</p>
            </div>
        </div>
      </div>
      <div className="orders-status"></div>
      <div className="orders-summary"></div>
    </div>
  );
};

export default OrderSidebar;
