import React from 'react';
import Table from '../../Components/Atoms/Table';
import Navbar from '../../Components/Atoms/Navbar';
const ProductSellPage = () => {
  const tableHeaders = [  'id', 'Name', 'Quantity', 'Size', 'Price', 'Category', 'Status', 'Action'];
  return (
    <div className='shop-page'>
      <Navbar userRole="shopkeeper"/>
      <div className="container">
        <Table headers={tableHeaders} 
        showSearchBar
        showDropdown
        showAddButton/>
      </div>
    </div>
  );
}

export default ProductSellPage;
