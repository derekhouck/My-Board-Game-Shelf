import React from 'react';
import styles from './button.module.css'; // Import css modules stylesheet as styles

export default function Button(props) {
  const classNames = `
    ${styles.btn} 
    ${props.disabled ? styles.disabled : ''} 
    ${props.primary ? styles.primary : ''} 
    ${props.secondary ? styles.secondary : ''}
    ${props.game ? styles.game : ''}`;
  return (
    <button
      className={classNames}
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
    >{props.label}</button>
  );
}