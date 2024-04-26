import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Atoms/Button';
import '../Styles/registrationpage.css';
import RegistrationForm from '../Components/Forms/RegistrationForm';

const RegistrationPage = () => {
  const navigate = useNavigate();
  // const [status, setStatus] = useState('');

  const handleSubmit = () => {
    navigate('/shop');
  }
  
  const handleCancel = () => {
    navigate('/shop');
  }

  return (
    <div className='create-form-page'>
      <div className='srf'>
        <RegistrationForm showRegisterAs 
        showCNICNumber
        showCNICPhotos/>
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
  )
}

export default RegistrationPage;