import React from 'react';
import Table from '../../Components/Atoms/Table';
import Navbar from '../../Components/Atoms/Navbar';
import '../../Styles/PagesStylescss/adminpage/shoppage.css';

const ShopPage = () => {
  const tableHeaders = [  'Email', 'OwnerName', 'CNIC', 'NTN', 'Area', 'Status'];
  return (
    <div className='shop-page'>
      <Navbar userRole="admin"/>
      <div className="container">
        <Table headers={tableHeaders} 
        showSearchBar
        showDropdown
        showAddButton/>
      </div>
    </div>
  );
}

export default ShopPage;
