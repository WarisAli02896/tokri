import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/ComponentStylecss/navbar.css';
import { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import logo from '../../Assets/logopic.png'


const Navbar = ({ userRole }) => {
  const menuItems = getNavbarMenu(userRole);

  const [user, setUser] = useState('user'); // Set the user state variable based on the current user

  const userProfilePicture = {logo}; // Set the user profile picture


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
        <ProfileDropdown user={user} userProfilePicture={userProfilePicture} />
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
        { label: 'Shop', link: '/shops' },
        { label: 'Product For Sell', link: '/pfs'},
        { label: 'Order', link: '/orders'},
      ];
    default:
      return [];
  }
};

export default Navbar;
