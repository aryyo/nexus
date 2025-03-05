import "../styles/Orders.css";
import OrderList from "../components/OrderList";
import OrderSidebar from "../components/OrderSidebar";

const Orders = ({ orders, cachedMetrics }) => {
  return (
    <div className="orders-content">
      <div className="overview">
        <p>Orders</p>
      </div>
      <div className="header">
        <button className="calendar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Last 30 Days
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
          Add Order
        </button>
      </div>
      <div className="orders-container">
        <div className="orders-main">
          <OrderList orders={orders}/>
        </div>
        <OrderSidebar orders={orders} cachedMetrics={cachedMetrics} />
      </div>
    </div>
  );
};

export default Orders;
