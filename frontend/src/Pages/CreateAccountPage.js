import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Atoms/Button';
import '../Styles/createaccountpage.css';
import CreateAccountForm from '../Components/Forms/CreateAccountForm';

const CreateAccountPage = () => {
  const navigate = useNavigate();
  // const [status, setStatus] = useState('');

  const handleAccept = () => {
    navigate('/shop');
  }
  
  const handleReject = () => {
    navigate('/shop');
  }

  return (
    <div className='create-form-page'>
      <div className='srf'>
        <CreateAccountForm showRegisterAs 
        showCNICNumber
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

export default CreateAccountPage;