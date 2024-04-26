import React, { useState } from 'react';
import InputField from '../Atoms/Inputfield';
import '../../Styles/ComponentStylecss/editform.css';

// Create a ref outside the component
const fileInputRef = React.createRef();

const EditForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cnic: '',
        ntn: '',
        city: '',
        area: '',
        address: '',
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
                <div className="right-section">
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
                        <label>Phone No:</label>
                        <InputField type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>CNIIC No:</label>
                        <InputField type="text" name="cniic" value={formData.cnic} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>NTN No:</label>
                        <InputField type="text" name="ntn" value={formData.ntn} onChange={handleInputChange} required />
                    </div>
                </div>

                {/* Address section */}
                <div className="address-section">
                    <div>
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
                        <label>Shop Photos:</label>
                        <InputField type="file" name="photos" onChange={handlePhotoUpload} multiple />
                    </div>
                    <div>
                        <label>CNIC Photos:</label>
                        <InputField type="file" name="photos" onChange={handlePhotoUpload} multiple />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditForm;
