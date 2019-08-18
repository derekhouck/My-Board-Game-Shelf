import React from 'react';
import './table.css';

export default function Table(props) {
  const { children, className } = props;
  return (
    <table className={`table ${className}`}>
      {children}
    </table>
  );
};