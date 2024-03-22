import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Atoms/Dropdown';
import '../../Styles/ComponentStylecss/profiledropdown.css';

const ProfileDropdown = ({ user }) => {
  let menuItems = [
    { label: 'Logout', link: '/login' }
  ];

  if (user.role === 'admin') {
    menuItems.unshift({ label: 'orders', link: '/shop' });
  } else if (user.role === 'shopkeeper') {
    menuItems.unshift({ label: ' Option', link: '/shop' });
  } else{
    menuItems.unshift({ label: 'User Option', link: '/user' });
  }

  return (
    <div className="profile-dropdown">
      <Dropdown className='dropdown'
        items={menuItems.map(item => (
          <Link to={item.link} key={item.label}>
            {item.label}
          </Link>
        ))}
        trigger={<img src={user.profileImage} alt="Profile" className="profile-icon" />}
      />
    </div>
  );
};

export default ProfileDropdown;
