import React from 'react';
import './table.css';

export default function Table(props) {
  const { children, className, headings } = props;
  return (
    <table className={`table ${className}`}>
      {
        (Array.isArray(headings) && headings.length > 0) &&
        <thead>
          <tr>
            {headings.map(heading => <th key={heading}>{heading}</th>)}
          </tr>
        </thead>
      }
      {children}
    </table>
  );
};

Table.defaultProps = {
  className: '',
  children: null,
  headings: null,
}