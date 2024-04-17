import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Atoms/Navbar';
import AddShop from '../../Components/Forms/AddShop';
import Button from '../../Components/Atoms/Button';

import '../../Styles/PagesStylescss/shopkeeperpage/addshoppage.css'

const AddShopPage = () => {
  const navigate = useNavigate();
  // const [status, setStatus] = useState('');

  const handleAccept = () => {
    navigate('/shop');
  }
  
  const handleReject = () => {
    navigate('/shop');
  }

  return (
    <div>
        <Navbar userRole="shopkeeper"/>
        <div className='add-shop-page'> 
        <div className='sp'> 
        <AddShop/>
        <div className="button-container">
        <Button label="Accept" 
        onClick={handleAccept} 
        type="button" 
        className="accept-button" />
        <Button label="Reject" 
        onClick={handleReject} 
        type="button" 
        className="reject-button" />
      </div>
        </div>
        </div>
    </div>
  )
}

export default AddShopPage;