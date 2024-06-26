import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Atoms/Navbar';
import AddShop from '../../Components/Forms/AddShop';
import Button from '../../Components/Atoms/Button';

import '../../Styles/PagesStylescss/shopkeeperpage/addshoppage.css'

const AddShopPage = () => {
  const navigate = useNavigate();
  // const [status, setStatus] = useState('');

  const handleSubmit = () => {
    navigate('/shops');
  }
  
  const handleCancel = () => {
    navigate('/shops');
  }

  return (
    <div>
        <Navbar userRole="shopkeeper"/>
        <div className='add-shop-page'> 
        <div className='sp'> 
        <AddShop/>
        <div className="button-container">
        <Button label="Submit" 
        onClick={handleSubmit} 
        type="button" 
        className="accept-button" />
        <Button label="Cancel" 
        onClick={handleCancel} 
        type="button" 
        className="reject-button" />
      </div>
        </div>
        </div>
    </div>
  )
}

export default AddShopPage;