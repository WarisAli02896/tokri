import React from 'react';
import Navbar from '../Components/Atoms/Navbar';
import '../Styles/PagesStylescss/homepage.css';

const HomePage = ({ userRole }) => {
  
  let content;

  switch (userRole) {
    case 'admin':
      content = (
        <div>
          <Navbar userRole={userRole}/>
          <div className='admin-content'>
            <h2>Admin</h2>
          </div>
        </div>
      );
      break;
    case 'customer':
      content = (
        <div>
          <Navbar userRole={userRole}/>
          <div className='customer-content'>
            Welcome to Customer Home Page
          </div>
        </div>
      );
      break;
    case 'shopkeeper':
      content = (
        <div>
          <Navbar userRole={userRole}/>
          <div className='shopkeeper-content'>
            Welcome to Shopkeeper Home Page
          </div>
        </div>
      );
      break;
    default:
      content = <div>Unknown User Role</div>;
  }

  return <div className='home-page'>{content}</div>;
};

export default HomePage;
