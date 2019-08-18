import React from 'react';
import './button.css';

export default function Button(props) {
  const {
    className,
    disabled,
    game,
    hidden,
    icon,
    onClick,
    label,
    primary,
    secondary,
    type
  } = props;
  const classNames = `
    btn 
    ${className}
    ${disabled ? 'btn-disabled' : ''} 
    ${hidden ? 'btn-hidden' : ''}
    ${icon ? 'btn-icon' : ''}
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
      <span className="btn__label">
        {label}
      </span>
      {icon && (
        <span className="btn__icon">
          {icon}
        </span>
      )}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  hidden: false,
  icon: null,
};