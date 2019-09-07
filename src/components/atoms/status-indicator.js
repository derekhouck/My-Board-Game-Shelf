import React from 'react';
import './status-indicator.css';

export default function StatusIndicator(props) {
  const { children, color } = props;
  return (
    <div className={`status-indicator status-indicator--${color}`}>{children}</div>
  );
}

StatusIndicator.defaultProps = {
  color: null,
};