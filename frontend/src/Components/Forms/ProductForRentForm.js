import React, { useState } from 'react';
import '../../Styles/ComponentStylecss/productforrent.css';
import InputField from '../Atoms/Inputfield';

const ProductForRentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        size: [],
        rent: [],
        pictures: [],
        description: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSizeCheckboxChange = (size) => {
        const newSize = [...formData.size];
    
        if (newSize.includes(size)) {
          newSize.splice(newSize.indexOf(size), 1);
        } else {
          newSize.push(size);
        }
    
        setFormData({ ...formData, size: newSize });
      };

      const handleRentCheckboxChange = (rent) => {
        const newRent = [...formData.rent];
    
        if (newRent.includes(rent)) {
          newRent.splice(newRent.indexOf(rent), 1);
        } else {
          newRent.push(rent);
        }
    
        setFormData({ ...formData, rent: newRent });
      };
    
      const handlePictureChange = (e) => {
        const pictures = Array.from(e.target.files);
        setFormData({ ...formData, pictures });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle form submission
        console.log(formData);
      };
    
      return (
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Name:
              <InputField type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
    
            <label>
              Category:
              <InputField type="text" name="category" value={formData.category} onChange={handleInputChange} />
            </label>
          </div>
    
          <div className="size-checbox">
            <label>
              Size:
              <div>
                {['Small', 'Medium', 'Large', 'XL', '2XL', '3XL'].map((size) => (
                  <label key={size} className="size-checkbox-label">
                    <InputField
                      type="checkbox"
                      name="size"
                      value={size}
                      checked={formData.size.includes(size)}
                      onChange={() => handleSizeCheckboxChange(size)}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </label>
          </div>

          <div className='rent-checkbox'>
          <label>
              Rent:
              <div>
                {['Per Hour', 'Per Day', 'Per Week', 'Per Month'].map((rent) => (
                  <label key={rent} className="rent-checkbox-label">
                    <InputField
                      type="checkbox"
                      name="rent"
                      value={rent}
                      checked={formData.rent.includes(rent)}
                      onChange={() => handleRentCheckboxChange(rent)}
                    />
                    {rent}
                  </label>
                ))}
              </div>
            </label>
          </div>
    
          <div className="form-row">
            <label>
              Pictures:</label>
              <div className="uploaded-pictures">
                    {formData.pictures.length > 0 &&
                        Array.from(formData.pictures).map((picture, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(picture)}
                                alt={`Uploaded ${index + 1}`}
                                style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                            />
                        ))}
                </div>
              <input 
              type="file" 
              name="pictures" 
              multiple 
              onChange={handlePictureChange} />
            
          </div>
    
          <div className="form-row">
            <label>
              Description:
              <textarea name="description" value={formData.description} onChange={handleInputChange} />
            </label>
          </div>
        </form>
      );
};

export default ProductForRentForm;