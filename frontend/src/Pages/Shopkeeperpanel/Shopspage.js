import React from 'react';
import Table from '../../Components/Atoms/Table';
import Navbar from '../../Components/Atoms/Navbar';
const ProductSellPage = () => {
  const tableHeaders = [  'id', 'name', 'city', 'Area', 'Status'];
  return (
    <div className='shop-page'>
      <Navbar userRole="shopkeeper"/>
      <div className="container">
        <Table headers={tableHeaders} 
        showSearchBar
        showAddButton/>
      </div>
    </div>
  );
}

export default ProductSellPage;
