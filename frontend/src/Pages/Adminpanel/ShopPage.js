import React from 'react';
import Table from '../../Components/Atoms/Table'; // Importing the Table component
import Navbar from '../../Components/Atoms/Navbar'; // Importing the Navbar component

// Importing the CSS file for this page
import '../../Styles/PagesStylescss/adminpage/shoppage.css';

const ShopPage = () => {
  // Defining the table headers
  const tableHeaders = [
    'id', 'name','Email', 'OwnerName', 'CNIC', 'NTN', 'Area', 'Status'
  ];

  return (
    <div className='shop-page'>
      {/* Rendering the Navbar component with the userRole prop set to "admin" */}
      <Navbar userRole="admin"/>

      <div className="container">
        {/* Rendering the Table component with the required props */}
        <Table
          headers={tableHeaders}
          showSearchBar
        
        />
      </div>
    </div>
  );
}

// Exporting the ShopPage component
export default ShopPage;