import React from 'react';
import Table from '../../Components/Atoms/Table';
import Navbar from '../../Components/Atoms/Navbar';
const ShopsPage = () => {
  const tableHeaders = [  'id', 'Name', 'City', 'Area', 'Status'];
  return (
    <div className='shop-page'>
      <Navbar userRole="shopkeeper"/>
      <div className="container">
        <Table userRole="shopkeeper" headers={tableHeaders} 
        showSearchBar
        showAddButton/>
      </div>
    </div>
  );
}

export default ShopsPage;
