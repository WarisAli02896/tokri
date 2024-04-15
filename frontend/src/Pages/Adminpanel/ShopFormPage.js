import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Atoms/Button';
import '../../Styles/PagesStylescss/adminpage/shopformpage.css';
import ShopRequestForm from '../../Components/Forms/ShopRequestForm';
import Navbar from '../../Components/Atoms/Navbar';

const ShopFormPage = () => {
  const navigate = useNavigate();
  // const [status, setStatus] = useState('');

  const handleAccept = () => {
    navigate('/shop');
  }
  
  const handleReject = () => {
    navigate('/shop');
  }

  return (
    <div className='shop-form-page'>
      <Navbar/>
      <div className='shop-r-f'>
        <ShopRequestForm/>
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
  )
}

export default ShopFormPage;