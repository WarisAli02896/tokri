// ReusableSidebar.js
import React, { useState } from 'react';
import '../../Styles/ComponentStylecss/sidebar.css';
import { FaBars } from 'react-icons/fa';

const Sidebar = ({ items }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className='toggle-btn' onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div>
        {isSidebarOpen && (
          <>
            <span className='sidebar-name'>Sidebar</span>
          </>
        )}
      </div>
      {isSidebarOpen && (
        <ul className='sidebar-list'>
          {items.map((item, index) => (
            <li key={index} className='sidebar-item'>
              <a href={item.url} className='sidebar-link'>
                <div className='item-iconandlabel'>
                {item.icon && <span className='item-icon'>{item.icon}</span>}
                {isSidebarOpen && item.label && <span className='item-label'>{item.label}</span>}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
