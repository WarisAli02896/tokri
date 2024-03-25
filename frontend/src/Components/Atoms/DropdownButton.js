import React, { useState } from 'react';
import Dropdown from './Dropdown';
import '../../Styles/dropdownbutton.css'

const DropdownButton = ({ buttonText, options }) => {
  const [selectedOption, setSelectedOption] = useState(buttonText);

  const updateButtonLabel = (option) => {
    setSelectedOption(option.text);
  };

  return (
    <div className='button-dropdown'>
      <Dropdown
        options={options}
        trigger={<button className="dropdown-button">{selectedOption}</button>}
        onSelect={updateButtonLabel}
        useLinks={false}
      />
    </div>
  );
};

export default DropdownButton;