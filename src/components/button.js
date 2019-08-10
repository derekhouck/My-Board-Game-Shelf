import React from 'react';
import './button.css';

export default function Button(props) {
  const {
    disabled,
    game,
    hidden,
    onClick,
    label,
    primary,
    secondary,
    type
  } = props;
  const classNames = `
    btn 
    ${disabled ? 'btn-disabled' : ''} 
    ${hidden ? 'btn-hidden' : ''}
    ${primary ? 'btn-primary' : ''} 
    ${secondary ? 'btn-secondary' : ''}
    ${game ? 'btn-game' : ''}`;
  return (
    <button
      className={classNames}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  hidden: false,
};