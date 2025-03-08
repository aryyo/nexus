import React from 'react';
import '../styles/EmptyState.css';

const EmptyState = ({ 
  title = 'No data available',
  message = 'There is no data to display at this time.',
  icon,
  className = ''
}) => {
  const defaultIcon = (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="empty-state-icon"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <path d="M8 3v6"/>
      <path d="M16 3v6"/>
      <path d="M12 12v6"/>
      <path d="M8 18h8"/>
    </svg>
  );

  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state-content">
        {icon || defaultIcon}
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default EmptyState; 