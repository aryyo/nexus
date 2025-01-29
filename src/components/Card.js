import "../styles/Card.css";

const Cards = ({ cachedMetrics }) => {
  return (
    <div className="cards">
      <div className="card">
        <div className="card-row-one">
          <img src="./icons/employee.png" alt=""></img>
          <p>Total Income</p>
        </div>
        <div className="card-row-two">
          <p className="count">${cachedMetrics.income.toFixed(2)}</p>
          <p className="percent">5%</p>
          <p className="date">Last Year</p>
        </div>
      </div>
      <div className="card">
        <div className="card-row-one">
          <img src="./icons/employee.png" alt=""></img>
          <p>Total Sales</p>
        </div>
        <div className="card-row-two">
          <p className="count">{cachedMetrics.totalOrders}</p>
          <p className="percent">5%</p>
          <p className="date">Last Year</p>
        </div>
      </div>
      <div className="card">
        <div className="card-row-one">
          <img src="./icons/employee.png" alt=""></img>
          <p>Total Expenses</p>
        </div>
        <div className="card-row-two">
          <p className="count">${cachedMetrics.totalExpenses.toFixed(2)}</p>
          <p className="percent">5%</p>
          <p className="date">Last Year</p>
        </div>
      </div>
      <div className="card">
        <div className="card-row-one">
          <img src="./icons/employee.png" alt=""></img>
          <p>Net Profit</p>
        </div>
        <div className="card-row-two">
          <p className="count">${cachedMetrics.totalNetProfit.toFixed(2)}</p>
          <p className="percent">5%</p>
          <p className="date">Last Year</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
