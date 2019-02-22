import React from 'react';
import './button.css';

export default function Button(props) {
  const classNames = `
    btn 
    ${props.disabled ? 'btn-disabled' : ''} 
    ${props.primary ? 'btn-primary' : ''} 
    ${props.secondary ? 'btn-secondary' : ''}
    ${props.game ? 'btn-game' : ''}`;
  return (
    <button
      className={classNames}
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
    >{props.label}</button>
  );
}