import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Atoms/Button';
import EditForm from '../../Components/Forms/EditForm';
import '../../Styles/PagesStylescss/adminpage/editpage.css';

const EditPage = () => {
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
      <div className='edit-form'>
        <EditForm />
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

export default EditPage;