// DropdownMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../Styles/ComponentStylecss/dropdown.css';

const Dropdown = ({ options, trigger, onSelect, selectOption, useLinks, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (index) => {
    if (selectOption) {
      setIsOpen(false);
      onSelect(index);
    } else {
      onSelect(options[index]);
      setIsOpen(false);
    }
  }

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleClick(index)}>
              {useLinks ? (
                <Link to={option.link}>{option.text}</Link>
              ) : (
                <span>{option.text}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      {selectedOption && (
        <div className="dropdown-header" onClick={() => setIsOpen(false)}>
          {selectedOption}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string, // Optional link prop
      // You can add more PropTypes validations if needed
    })
  ).isRequired,
  trigger: PropTypes.node.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectOption: PropTypes.bool, // Whether to
};
export default Dropdown;
