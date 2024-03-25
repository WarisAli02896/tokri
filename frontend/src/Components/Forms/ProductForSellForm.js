import React, { useState } from 'react';
import '../../Styles/ComponentStylecss/productforsell.css';
import InputField from '../Atoms/Inputfield';

const sizes = ['Small', 'Medium', 'Large', 'X-Large', '2X-Large', '3X-Large'];

const ProductForSellForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        sizes: [],
        pictures: [],
    });

    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleCheckboxChange = (size) => {
        const newSizes = [...formData.sizes];
        const index = newSizes.indexOf(size);
        if (index === -1) {
            newSizes.push(size);
        } else {
            newSizes.splice(index, 1);
        }
        handleChange('sizes', newSizes);
    };

    const handlePictureChange = (e) => {
        const pictures = Array.from(e.target.files);
        setFormData({ ...formData, pictures });
      };

    return (
        <form className="product-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <InputField
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price:</label>
                <InputField
                    type="text"
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <InputField
                    type="number"
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                >
                    <option>Select Category</option>
                    <option value="clothing">Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="grocery">Grocery</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
            <div className="form-group-checkboxes">
            <label htmlFor="sizes">Size:</label>
                {sizes.map((size) => (
                    <label key={size}>
                        <InputField
                            type="checkbox"
                            checked={formData.sizes.includes(size)}
                            onChange={() => handleCheckboxChange(size)}
                        />
                        {size}
                    </label>
                ))}
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
        </form>
    );
};

export default ProductForSellForm;
