import React, { useState } from 'react';
import InputField from '../Atoms/Inputfield';
import '../../Styles/ComponentStylecss/registrationform.css';

// Create a ref outside the component
const fileInputRef = React.createRef();

const RegistrationForm = ({ showRegisterAs, showCNICNumber, showCNICPhotos }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    confirmPassword:'',
    phone: '',
    cnic: '',
    ntn:'',
    photos: [],
    userType: '',
  });

  const handleInputChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhotoUpload = (e) => {
    // Check if e is defined
    if (e && e.target) {
      const photos = Array.from(e.target.files);
      setFormData({ ...formData, photos });
    }
  };

  const handleUserTypeChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, userType: name });
    } else {
      setFormData({ ...formData, userType: '' });
    }
  };

  // Handle face structure click
  const handleFaceStructureClick = () => {
    // Trigger the click event of the hidden file input
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
    {
      console.log("Password don't match");
      return;
    }
    console.log('Form submitted:', formData);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        {/* Left side: User picture and options */}
        <div className="left-section">
          <div className="user-picture" onClick={handleFaceStructureClick}>
            {/* Placeholder face structure */}
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#ddd', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Add face structure or image here */}
              {formData.photos.length > 0 ? (
                <img
                  src={URL.createObjectURL(formData.photos[0])}
                  alt="User"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span role="img" aria-label="User Face" style={{ fontSize: '48px' }}>😀</span>
              )}
            </div>
            {/* Hidden file input */}
            <input
              type="file"
              id="photoInput"
              name="photos"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Right side: User information */}
        <div className="form">
          <div>
            {showRegisterAs && <div className='register'>
              <label>Register as:</label><br />
              <div className='user'>
                <label htmlFor="user"> User</label>
                <input type="checkbox" name="user" checked={formData.userType === 'user'} onChange={handleUserTypeChange} />

              </div>
              <div className='shopk'>
                <label htmlFor="shopkeeper"> Shopkeeper</label>
                <input type="checkbox" name="shopkeeper" checked={formData.userType === 'shopkeeper'} onChange={handleUserTypeChange} />
              </div>
            </div>}
          </div>
          <div className='right-section-wrapper'>
            <div className='right-section'>
              <div>
                <label>First Name:</label>
                <InputField type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Last Name:</label>
                <InputField type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Email:</label>
                <InputField type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Password:</label>
                <InputField type="password" name="password" value={formData.password} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Confirm Password:</label>
                <InputField type="password" name="password" value={formData.confirmPassword} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Phone No:</label>
                <InputField type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              {showCNICNumber && formData.userType !== 'user' && <div>
                <label>CNIC No:</label>
                <InputField type="text" name="cniic" value={formData.cnic} onChange={handleInputChange} required />
              </div>}
            </div>
          </div>


        </div>

        {/* Address section */}
        <div className="address-section">
          {/* <div>
            <label>City:</label>
            <InputField type="text" name="city" value={formData.city} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Area:</label>
            <InputField type="text" name="area" value={formData.area} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleInputChange} required />
          </div> */}
          {showCNICPhotos && formData.userType !== 'user' && <div>
            <label>CNIC Front:</label>
            <InputField type="file" name="photos" onChange={handlePhotoUpload} multiple />
          
            <label>CNIC Back:</label>
            <InputField type="file" name="photos" onChange={handlePhotoUpload} multiple />
          </div>}
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
