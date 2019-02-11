import React from 'react';
import '../styles/button.css';

export default function Button(props) {
  const classNames = 'btn' + 
    (props.disabled ? ' disabled' : '')  +
    (props.primary ? ' btn-primary' : ''); 
  return (
    <button
      className={classNames}
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
    >{props.label}</button>
  );
}