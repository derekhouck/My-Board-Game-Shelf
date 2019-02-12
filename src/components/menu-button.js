import React from 'react';
import '../styles/menu-button.css';

export default function MenuButton(props) {
  return (
    <div className="menu-button">
      <div className="menu-button__box">
        <div className="menu-button__line bar1"></div>
        <div className="menu-button__line bar2"></div>
        <div className="menu-button__line bar3"></div>
      </div>
      <small>Menu</small>
    </div>
  );
}