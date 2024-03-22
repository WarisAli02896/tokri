// DropdownMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/ComponentStylecss/dropdown.css';

const Dropdown = ({ items, trigger }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-trigger" onClick={toggleMenu}>
        {trigger}
      </div>
      {isMenuOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index}> 
            <Link to={item.link} className="dropdown-link">{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
