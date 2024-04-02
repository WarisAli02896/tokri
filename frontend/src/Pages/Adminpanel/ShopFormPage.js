import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShopRequestForm from '../../Components/Forms/ShopRequestForm';
import Button from '../../Components/Atoms/Button';
import '../../Styles/PagesStylescss/adminpage/shopformpage.css';

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
      <div className='srf'>
        <ShopRequestForm showRegisterAs 
        showCNICNumber
        showNTNNumber
        showShopPhotos
        showCNICPhotos/>
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