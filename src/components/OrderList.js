import '../styles/OrderList.css';

const formatName = (name) => {
    if (name.length > 18) {
      const clippedName = name.slice(0, 15);
      return `${clippedName}...`;
    } else {
      return name;
    }
  };
  
  const formatDate = (date) => {
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    switch (month) {
      case "01":
        return `Jan ${day}`;
      case "02":
        return `Feb ${day}`;
      case "03":
        return `Mar ${day}`;
      case "04":
        return `Apr ${day}`;
      case "05":
        return `May ${day}`;
      case "06":
        return `Jun ${day}`;
      case "07":
        return `Jul ${day}`;
      case "08":
        return `Aug ${day}`;
      case "09":
        return `Sep ${day}`;
      case "10":
        return `Oct ${day}`;
      case "11":
        return `Nov ${day}`;
      case "12":
        return `Dec ${day}`;
    }
  };
  
  const formatTotal = (total) => {
    return `$${total}`;
  };
  
  const formatOrderId = (id) => {
    return `#${id}`;
  };
  
  const orderData = [
    {
      id: "192541",
      customerName: "Esther Howard",
      type: "Shipping",
      status: "Paid",
      product: "Violin",
      total: "3127.00",
      datePlaced: "2024-05-27",
    },
    {
      id: "485372",
      customerName: "John Doe",
      type: "Pickup",
      status: "Pending",
      product: "Guitar",
      total: "1520.00",
      datePlaced: "2024-04-15",
    },
    {
      id: "839174",
      customerName: "Sophia Smith",
      type: "Shipping",
      status: "Paid",
      product: "Piano",
      total: "8250.50",
      datePlaced: "2024-03-01",
    },
    {
      id: "274839",
      customerName: "Liam Johnson",
      type: "Pickup",
      status: "Cancelled",
      product: "Trumpet",
      total: "780.00",
      datePlaced: "2024-05-20",
    },
    {
      id: "947382",
      customerName: "Emma Wilson",
      type: "Shipping",
      status: "Paid",
      product: "Flute",
      total: "430.99",
      datePlaced: "2024-12-05",
    },
    {
      id: "615273",
      customerName: "Mason Brown",
      type: "Shipping",
      status: "Pending",
      product: "Drum Set",
      total: "3250.75",
      datePlaced: "2024-08-18",
    },
    {
      id: "721984",
      customerName: "Olivia Davis",
      type: "Pickup",
      status: "Paid",
      product: "Keyboard",
      total: "1699.00",
      datePlaced: "2024-05-29",
    },
    {
      id: "381942",
      customerName: "James Garcia",
      type: "Shipping",
      status: "Refunded",
      product: "Viola",
      total: "1999.99",
      datePlaced: "2024-05-12",
    },
    {
      id: "523198",
      customerName: "Ava Martinez",
      type: "Pickup",
      status: "Paid",
      product: "Cello",
      total: "4850.00",
      datePlaced: "2024-07-03",
    },
    {
      id: "849273",
      customerName: "Noah Hernandez",
      type: "Shipping",
      status: "Cancelled",
      product: "Saxophone",
      total: "1125.45",
      datePlaced: "2024-04-25",
    },
    {
      id: "103948",
      customerName: "Lucas Taylor",
      type: "Shipping",
      status: "Paid",
      product: "Electric Guitar",
      total: "2999.99",
      datePlaced: "2024-02-10",
    },
    {
      id: "928374",
      customerName: "Charlotte Walker",
      type: "Pickup",
      status: "Pending",
      product: "Bass Guitar",
      total: "1450.00",
      datePlaced: "2024-01-11",
    },
    {
      id: "203948",
      customerName: "William Adams",
      type: "Shipping",
      status: "Paid",
      product: "Cello",
      total: "2300.50",
      datePlaced: "2024-10-12",
    },
    {
      id: "847362",
      customerName: "Grace King",
      type: "Pickup",
      status: "Cancelled",
      product: "Trumpet",
      total: "850.00",
      datePlaced: "2024-09-13",
    },
    {
      id: "678932",
      customerName: "Ethan Lee",
      type: "Shipping",
      status: "Refunded",
      product: "Piano",
      total: "4200.75",
      datePlaced: "2024-08-14",
    },
    {
      id: "384756",
      customerName: "Amelia Martinez",
      type: "Pickup",
      status: "Paid",
      product: "Flute",
      total: "500.00",
      datePlaced: "2024-03-15",
    },
    {
      id: "538267",
      customerName: "Henry Perez",
      type: "Shipping",
      status: "Pending",
      product: "Viola",
      total: "3100.00",
      datePlaced: "2024-04-16",
    },
    {
      id: "739184",
      customerName: "Isabella Garcia",
      type: "Pickup",
      status: "Paid",
      product: "Drum Set",
      total: "2200.00",
      datePlaced: "2024-01-17",
    },
    {
      id: "839712",
      customerName: "Sebastian Roberts",
      type: "Shipping",
      status: "Paid",
      product: "Saxophone",
      total: "700.00",
      datePlaced: "2024-02-18",
    },
    {
      id: "902846",
      customerName: "Chloe Wright",
      type: "Pickup",
      status: "Pending",
      product: "Guitar",
      total: "1200.00",
      datePlaced: "2024-11-19",
    },
  ];
  
  const columns = [
    { label: "Order", key: "id", formatter: formatOrderId },
    { label: "Customer", key: "customerName", formatter: formatName },
    { label: "Type", key: "type" },
    { label: "Status", key: "status" },
    { label: "Product", key: "product" },
    { label: "Total", key: "total", formatter: formatTotal },
    { label: "Date", key: "datePlaced", formatter: formatDate },
  ];

const OrderList = () => {
    return (
        <div className="orders-table">
        <div className="table-header">
          {columns.map((column) => {
            return <p key={column.key}>{column.label}</p>;
          })}
        </div>
        {orderData.map((order) => {
          return (
            <div className="table-row">
              {columns.map((column) => {
                const value = order[column.key];
                const formatter = column.formatter;
                return (
                  <div className="table-column">
                    {order.status === value ? <img src={`../icons/${value}.png`}  alt=""/> : ''}
                    <p className={order.status === value ? order.status.toLowerCase() : ''}>{formatter ? formatter(value) : value}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    )
}

export default OrderList;