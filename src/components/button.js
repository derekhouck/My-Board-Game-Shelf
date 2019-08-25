import React from 'react';
import './button.css';

export default function Button(props) {
  const {
    centered,
    className,
    disabled,
    game,
    hidden,
    icon,
    onClick,
    label,
    primary,
    secondary,
    small,
    type
  } = props;
  const classNames = `
    btn 
    ${centered ? 'btn--centered' : ''}
    ${className}
    ${disabled ? 'btn-disabled' : ''} 
    ${hidden ? 'btn-hidden' : ''}
    ${icon ? 'btn-icon' : ''}
    ${primary ? 'btn-primary' : ''} 
    ${secondary ? 'btn-secondary' : ''}
    ${small ? 'btn-small' : ''}
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
  centered: false,
  className: '',
  disabled: false,
  hidden: false,
  icon: null,
  small: null,
};