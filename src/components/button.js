import React from 'react';
import './button.css';

export default function Button(props) {
  const classNames = 'btn' + 
    (props.disabled ? ' disabled' : '')  +
    (props.primary ? ' btn-primary' : '') + 
    (props.secondary ? ' btn-secondary' : ''); 
  return (
    <button
      className={classNames}
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
    >{props.label}</button>
  );
}