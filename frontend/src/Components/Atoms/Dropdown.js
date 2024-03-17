// DropdownMenu.js
import React, { useState } from 'react';

const Dropdown = ({ items, trigger }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dropdown-menu-wrapper">
      <div className="dropdown-trigger" onClick={toggleMenu}>
        {trigger}
      </div>
      {isMenuOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
