import React from 'react';
import { LoadingSpinnerProps } from '../types';

export const LoadingState: React.FC<LoadingSpinnerProps> = ({
  loading,
  error,
  loadingMessage = 'Loading...',
  children,
}) => {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p className="loading-message">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Something went wrong</h3>
          <p className="error-message">{error}</p>
          <button
            className="error-retry"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const LoadingSpinner: React.FC<{ message?: string }> = ({
  message = 'Loading...'
}) => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p className="loading-message">{message}</p>
  </div>
);

export default LoadingState;
