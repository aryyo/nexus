import { useMemo } from "react";
import "../styles/Rate.css";
import "../styles/EmptyState.css";

const Rate = ({ cachedMetrics }) => {
  const {
    successRate,
    monthOverMonthChange,
    salesRate,
    expenseRate,
    profitRate,
    hasData
  } = useMemo(() => {
    if (!cachedMetrics || !cachedMetrics.totalOrders) {
      return {
        successRate: 0,
        monthOverMonthChange: 0,
        salesRate: 0,
        expenseRate: 0,
        profitRate: 0,
        hasData: false
      };
    }

    // Calculate success rate (paid orders vs total orders)
    const successRate = (cachedMetrics.totalPaid / cachedMetrics.totalOrders) * 100;

    // Calculate month over month change in revenue
    const currentMonth = new Date().getMonth();
    const currentRevenue = cachedMetrics.monthlyRevenue[currentMonth] || 0;
    const lastMonthRevenue = cachedMetrics.monthlyRevenue[currentMonth - 1] || 0;
    const monthOverMonthChange = lastMonthRevenue ? ((currentRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;

    // Calculate rates for sales, expenses, and profit
    const totalRevenue = cachedMetrics.totalRevenue;
    const salesRate = totalRevenue ? (cachedMetrics.totalRevenue / totalRevenue) * 100 : 0;
    const expenseRate = totalRevenue ? (cachedMetrics.totalExpenses / totalRevenue) * 100 : 0;
    const profitRate = totalRevenue ? (cachedMetrics.totalNetProfit / totalRevenue) * 100 : 0;

    return {
      successRate: Math.round(successRate),
      monthOverMonthChange: Math.round(monthOverMonthChange),
      salesRate: Math.round(salesRate),
      expenseRate: Math.round(expenseRate),
      profitRate: Math.round(profitRate),
      hasData: true
    };
  }, [cachedMetrics]);

  if (!hasData) {
    return (
      <div className="rate">
        <div className="rate-header">
          <h2>Insights</h2>
        </div>
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
            <path d="M22 12A10 10 0 0 0 12 2v10z"/>
          </svg>
          <p>No insights available</p>
          <span>Complete some orders to see business insights</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rate">
      <div className="rate-header">
        <h2>Insights</h2>
        <div className="rate-row-two">
          <p className="percent">{monthOverMonthChange >= 0 ? '+' : ''}{monthOverMonthChange}%</p>
          <p className="date">vs last month</p>
        </div>
      </div>
      <div className="rate-section">
        <div className="rate-row-two">
          <p className="count">{successRate}%</p>
          <p className="label">Success Rate</p>
        </div>
        <div className="rate-bars">
          <div className="rate-bar">
            <div className="rate-bar-info">
              <span>Sales</span>
              <span>{salesRate}%</span>
            </div>
            <div className="rate-bar-progress">
              <div className="rate-line-one" style={{ '--target-width': `${salesRate}%` }}></div>
            </div>
          </div>
          <div className="rate-bar">
            <div className="rate-bar-info">
              <span>Expenses</span>
              <span>{expenseRate}%</span>
            </div>
            <div className="rate-bar-progress">
              <div className="rate-line-two" style={{ '--target-width': `${expenseRate}%` }}></div>
            </div>
          </div>
          <div className="rate-bar">
            <div className="rate-bar-info">
              <span>Profit</span>
              <span>{profitRate}%</span>
            </div>
            <div className="rate-bar-progress">
              <div className="rate-line-three" style={{ '--target-width': `${profitRate}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rate;
