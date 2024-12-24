import "../styles/Orders.css";
import OrderList from "../components/OrderList";

const Orders = () => {
  return (
    <div className="orders-content">
      <div className="orders-main">
        <div className="orders-overview">
          <p>Orders</p>
        </div>
       <OrderList/>
      </div>
      <div className="orders-sidebar"></div>
    </div>
  );
};

export default Orders;
