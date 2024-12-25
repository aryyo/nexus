import "../styles/Orders.css";
import OrderList from "../components/OrderList";
import OrderSidebar from "../components/OrderSidebar";

const Orders = () => {
  return (
    <div className="orders-content">
      <div className="orders-main">
        <div className="orders-overview">
          <p>Orders</p>
        </div>
       <OrderList/>
      </div>
      <OrderSidebar/>
    </div>
  );
};

export default Orders;
