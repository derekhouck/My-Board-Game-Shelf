import React from 'react';
import '../styles/menu-button.css';

export default function MenuButton(props) {
  return (
    <div class="menu-button">
      <button>
        <div className="menu-button__line bar1"></div>
        <div className="menu-button__line bar2"></div>
        <div className="menu-button__line bar3"></div>
      </button>
      <small>Menu</small>
    </div>
  );
}