import React from 'react';
import '../styles/Navbar.css';
import { Icons } from './Icons';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <button className="nav-button menu-toggle" onClick={onToggleSidebar}>
          {Icons.menu}
        </button>
        {Icons.linux}
        <div className="search-box">
          {Icons.search}
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="nav-right">
        <button className="nav-button">
          {Icons.mail}
        </button>
        <button className="nav-button">
          {Icons.bell}
        </button>
        <div className="user-profile">
          {Icons.user}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
