import React, { useState } from 'react';

import InputField from '../Atoms/Inputfield';
import "../../Styles/ComponentStylecss/addshop.css";
// Create a ref outside the component
const fileInputRef = React.createRef();

const AddShop = () => {
  const [formData, setFormData] = useState({
    Name: '',
    city: '',
    area: '',
    address: '',
    photos: [],
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

  // Handle face structure click
  const handleFaceStructureClick = () => {
    // Trigger the click event of the hidden file input
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission (e.g., API call)
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
    

        {/* Address section */}
        <div className="shop-form-section">
          <div>
          <label> Name:</label>
            <InputField type="text" name="Name" value={formData.Name} onChange={handleInputChange} required />
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
          </div>
          <div>
            <label>Photos:</label>
            <InputField type="file" name="photos" onChange={handlePhotoUpload} multiple />
          </div>
        </div>
      
    </form>
  );
};

export default AddShop;