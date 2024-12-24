import "../styles/Card.css";

const Cards = () => {
  return (
    <div className="cards">
      <div className="card">
        <div className="card-row-one">
          <img src="./icons/employee.png" alt=""></img>
          <p>Total Income</p>
        </div>
        <div className="card-row-two">
          <p className="count">3540</p>
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
          <p className="count">874</p>
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
          <p className="count">34</p>
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
          <p className="count">29</p>
          <p className="percent">5%</p>
          <p className="date">Last Year</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
