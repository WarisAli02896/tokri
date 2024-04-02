import React from 'react';
import Navbar from '../../Components/Atoms/Navbar';
import AddShop from '../../Components/Forms/AddShop';

const AddShopPage = ({userRole}) => {
  return (
    <div>
        <Navbar userRole={userRole}/>
        <div>
        <AddShop/>
        </div>
        
    </div>
  )
}

export default AddShopPage;