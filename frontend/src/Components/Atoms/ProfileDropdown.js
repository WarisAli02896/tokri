// ProfileDropdown.js
import React from 'react';
import Dropdown from './Dropdown';

const ProfileDropdown = ({ user }) => {
  const menuItems = ['Settings', 'Logout'];

  return (
    <div className="profile-dropdown">
      <Dropdown items={menuItems} trigger={<img src={user.profileImage} alt="Profile" className="profile-icon" />} />
    </div>
  );
};

export default ProfileDropdown;
