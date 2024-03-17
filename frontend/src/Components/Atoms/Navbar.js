import React from 'react';
import { Link } from 'react-router-dom';
// import ProfileDropdown from '../Atoms/ProfileDropdown';
import '../../Styles/ComponentStylecss/navbar.css';

const Navbar = ({ userRole }) => {
  const menuItems = getNavbarMenu(userRole);

  return (
    <header className='header'>
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
        {/* <ProfileDropdown user={user} /> */}
      </div>
    </nav>
    </header>
  );
};

const getNavbarMenu = (userRole) => {
  switch (userRole) {
    case 'admin':
      return [
        { label: 'Home', link: '/admin' },
        { label: 'Shop', link: '/shop' },
      ];
    case 'customer':
      return [
        { label: 'Home', link: '/customer' },
        { label: 'Shop', link: '/shop' },
      ];
    case 'shopkeeper':
      return [
        { label: 'Home', link: '/shopkeeper' },
        { label: 'Shop', link: '/shop' },
      ];
    default:
      return [];
  }
};

export default Navbar;
