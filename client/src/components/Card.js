import React from "react";
import "../styles/Card.css";
import { Icons } from "./Icons";

const Cards = ({ cachedMetrics }) => {
  return (
    <div className="cards">
      <div className="card">
        <div className="card-row-one">
          {Icons.employee}
          <p>Total Income</p>
        </div>
        <div className="card-row-two">
          <p className="count">${cachedMetrics.income.toFixed(2)}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-row-one">
          {Icons.project}
          <p>Total Sales</p>
        </div>
        <div className="card-row-two">
          <p className="count">{cachedMetrics.totalOrders}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-row-one">
          {Icons.invoice}
          <p>Total Expenses</p>
        </div>
        <div className="card-row-two">
          <p className="count">${cachedMetrics.totalExpenses.toFixed(2)}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-row-one">
          {Icons.paid}
          <p>Net Profit</p>
        </div>
        <div className="card-row-two">
          <p className="count">${cachedMetrics.totalNetProfit.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
