import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/ComponentStylecss/navbar.css';
import ProfileDropdown from '../Atoms/ProfileDropdown';

const ReusableNavbar = ({ userRole, user }) => {
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
        <ProfileDropdown  user={user}/>
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
        { label: 'Product For Sell', link: '/pfs'},
        { label: 'Product For Rent', link: '/pfr'},
        { label: 'Order', link: '/order'},
      ];
    default:
      return [];
  }
};

export default ReusableNavbar;
