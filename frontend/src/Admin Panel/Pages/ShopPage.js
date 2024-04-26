import React, { useState } from 'react';
import Table from '../../Components/Atoms/Table'; // Importing the Table component
import Navbar from '../../Components/Atoms/Navbar'; // Importing the Navbar component

// Importing the CSS file for this page
import '../../Styles/PagesStylescss/adminpage/shoppage.css';

const ShopPage = () => {
  // Defining the table headers
  const tableHeaders = [
    'id', 'Name','Email', 'OwnerName', 'CNIC', 'NTN', 'Area', 'Status'
  ];
  const [currentPage, setCurrentPage] = useState('shops');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className='shop-page'>
      {/* Rendering the Navbar component with the userRole prop set to "admin" */}
      <Navbar userRole="admin" onPageChange = {handlePageChange}/>

      <div className="container">
        {/* Rendering the Table component with the required props */}
        <Table userRole="admin"
        currentPage={currentPage}
          headers={tableHeaders}
          showSearchBar
        
        />
      </div>
    </div>
  );
}

// Exporting the ShopPage component
export default ShopPage;