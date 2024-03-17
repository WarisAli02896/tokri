import React from 'react';
import Button from './Button'; 

const Link = ({ text, onClick }) => {
  return (
    <div>
      <Button
        label={text}
        onClick={onClick}
        type="button"
        className="forgot-password"
      />
    </div>
  );
};

export default Link;
