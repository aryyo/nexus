import "../styles/Orders.css";

const Orders = () => {
  const orderData = [
    {
      name: "Classic Slip-On Checkerboard Shoe",
      orderNumber: "29172736",
      datePlaced: "01012023",
      quantity: "4",
      shippingCost: "2.16",
      tax: "21.59",
      total: "290.22",
      status: "pending",
      img: "./product-images/shoe-2.png",
    },
    {
      name: "Era Core Classics Shoe",
      orderNumber: "84489559",
      datePlaced: "05272024",
      quantity: "4",
      shippingCost: "1.38",
      tax: "40.34",
      total: "544.6",
      status: "shipped",
      img: "./product-images/shoe-3.png",
    },
    {
      name: "Sk8-Hi High-Top Shoe",
      orderNumber: "02494332",
      datePlaced: "08222024",
      quantity: "5",
      shippingCost: "1.86",
      tax: "16.87",
      total: "227.73",
      status: "delivered",
      img: "./product-images/shoe-1.png",
    },
    {
      name: "Era Core Classics Shoe",
      orderNumber: "58435641",
      datePlaced: "06092023",
      quantity: "5",
      shippingCost: "5.33",
      tax: "61.94",
      total: "836.22",
      status: "in-progress",
      img: "./product-images/shoe-4.png",
    },
  ];

  const getDate = (date) => {
    const month = date.slice(0, 2);
    const day = parseInt(date.slice(2, 4), 10);
    const year = date.slice(4);

    const getMonthName = (month) => {
      switch (month) {
        case "01":
          return "January";
        case "02":
          return "February";
        case "03":
          return "March";
        case "04":
          return "April";
        case "05":
          return "May";
        case "06":
          return "June";
        case "07":
          return "July";
        case "08":
          return "August";
        case "09":
          return "September";
        case "10":
          return "October";
        case "11":
          return "November";
        case "12":
          return "December";
        default:
          return "Invalid month";
      }
    };

    return `${getMonthName(month)} ${day}, ${year}`;
  };

  return (
    <div className="orders-content">
      <div className="orders-overview">
        <p>Orders</p>
      </div>
      <div className="orders-data">
        {orderData.map((order) => {
          return (
            <div className="orders-card" key={order.orderNumber}>
              <div className="product-header">
                <img src={order.img} alt="product-img"></img>
                <h2>{order.name}</h2>
              </div>
              <div className="product-info">
                <div className="product-row-one">
                  <p>Order: </p>
                  <p className="product-number">#{order.orderNumber}</p>
                </div>
                <div className="product-row-two">
                  <p>{getDate(order.datePlaced)}</p>
                </div>
                <div className="product-row-three">
                  <p>Items Ordered: </p>
                  <p className="product-quantity">{order.quantity}</p>
                </div>
                <div className="product-row-four">
                  <p>Estimated Shipping: </p>
                  <p className="product-shipping">${order.shippingCost}</p>
                </div>
                <div className="product-row-five">
                  <p>Estimated Tax: </p>
                  <p className="product-tax">${order.tax}</p>
                </div>
                <div className="product-row-six">
                  <p>Estimated Total: </p>
                  <p className="product-Total">${order.total}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
