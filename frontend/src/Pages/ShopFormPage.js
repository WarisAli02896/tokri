import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShopRequestForm from '../Components/Forms/ShopRequestForm';
import Button from '../Components/Atoms/Button';
import '../Styles/PagesStylescss/shopformpage.css';

const ShopFormPage = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate('/shop');
  }
  
  const handleReject = () => {
    navigate('/shop');
  }

  return (
    <div className='shopformpage'>
      <div className='srf'>
        <ShopRequestForm />
        <div className='buttons'>
        <Button onClick={handleAccept}>Accept</Button>
        <Button onClick={handleReject}>Reject</Button>
    </div>
    </div>
    </div>
  )
}

export default ShopFormPage;