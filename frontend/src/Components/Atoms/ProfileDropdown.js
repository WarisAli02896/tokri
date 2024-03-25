import Dropdown from '../Atoms/Dropdown';

const ProfileDropdown = ({ user, userProfilePicture }) => {
  let options = [];
  // Set options based on user role
  switch (user) {
    case 'user':
      options = [{text: 'Edit Profile', link: '/edit-profile' },
      {text: 'logout', link: '/login' }];
      break;
    case 'admin':
      options = [ {text: 'Manage Users', link: '/Manage Users' },
      {text: 'Settings', link: '/setting' }, 
      {text: 'Logout', link: '/LoginPage' }];
      break;
    case 'shopkeeper':
      options = ['Manage Products', 'Settings', 'Logout'];
      break;
    default:
      options =[{text: 'Edit Profile', link: '/edit-profile' },
      {text: 'Logout', link: '/login' }];
      break;
  }

  const handleSelect = (index) => {
    // Handle option selection
    // ...
  }

  return (
    <div className="profile-dropdown">
      {/* Use the Dropdown component with the selectOption prop set to false */}
      <Dropdown options={options} trigger={<img src={userProfilePicture} alt="User Avatar" className='profile-icon' />}
       useLinks={true}
        selectOption={false}
         onSelect={handleSelect} />
    </div>
  );
};

export default ProfileDropdown;