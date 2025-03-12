import React from 'react';
import '../styles/LoadingState.css';

export const LoadingSpinner = ({ size = "default", fullPage = false }) => {
  return (
    <div className={`loading-container ${fullPage ? 'full-page' : ''}`}>
      <div className={`loading-spinner ${size}`}>
        <svg viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export const ErrorMessage = ({ message, fullPage = false }) => {
  return (
    <div className={`error-container ${fullPage ? 'full-page' : ''}`}>
      <div className="error-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="error-text">{message}</p>
    </div>
  );
}; 