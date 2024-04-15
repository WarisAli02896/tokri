import React, { useState } from 'react';
import DropdownButton from '../Atoms/DropdownButton';
import Button from '../Atoms/Button';
import InputField from '../Atoms/Inputfield';
import '../../Styles/ComponentStylecss/shoprequestform.css';

const ShopRequestForm = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    barcode: '',
    name: '',
    size: '',
    quantity: '',
    price: '',
    photos: [],
  });

  const [items, setItems] = useState([]); // State variable for items
  const [itemText, setItemText] = useState(''); // State variable for displaying added items

  const handleInputChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handlePhotoUpload = (e) => {
    if (e && e.target) {
      const photos = Array.from(e.target.files);
      setFormData({ ...formData, photos });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const dropdownOptions = [
    { value: 'cloths', label: 'Cloths' },
    
  ];

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectOption = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAddItem = () => {
    const { size, quantity, price } = formData;
    const newItem = { id: Date.now(), size, quantity, price }; // Add unique id to each item
    const newItems = [...items, newItem];
    setItems(newItems);
    // Update itemText state if needed
    setItemText(itemText ? `${itemText}\nSize: ${size}, Quantity: ${quantity}, Price: ${price}` : `Size: ${size}, Quantity: ${quantity}, Price: ${price}`);
    // Reset fields
    setFormData({ ...formData, size: '', quantity: '', price: '' });
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    const updatedItemText = updatedItems.map(item => `Size: ${item.size}, Quantity: ${item.quantity}, Price: ${item.price}`).join('\n');
    setItems(updatedItems);
    setItemText(updatedItemText);
  };
  return (
    <div className="shop-request-form">
      <form onSubmit={handleSubmit}>
        <div className="left-side">
          <div className="input-row">
            <label>
              Barcode:
              <InputField type="text" name="barcode" value={formData.barcode} onChange={handleInputChange} required />
            </label>
            <label>
              Name:
              <InputField type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </label>
            <label>
              Category:
              <DropdownButton options={dropdownOptions} selectedOption={selectedOption} onSelectOption={handleSelectOption} />
            </label>
          </div>
          <div className="input-row">
  <label>
    Size:
    <InputField type="text" name="size" value={formData.size} onChange={handleInputChange} required />
  </label>
  <label>
    Quantity:
    <InputField type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
  </label>
  <label>
    Price:
    <InputField type="text" name="price" value={formData.price} onChange={handleInputChange} required />
  </label>
  <Button type="button" onClick={handleAddItem}>Add</Button>
</div>


          <div className="added-items">
            <label>Added Items:</label>
            {items.map(item => (
            <div key={item.id}>
              <p>{`Size: ${item.size}, Quantity: ${item.quantity}, Price: ${item.price}`}</p>
              <button onClick={() => handleDeleteItem(item.id)}>X</button>
            </div>
          ))}
          </div>
        </div>
        <div className="right-side">
          <label>Upload Picture: <input type="file" accept="image/*" onChange={handlePhotoUpload} /></label>
        </div>
      </form>
    </div>
  );
};

export default ShopRequestForm;
