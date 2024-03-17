import React from 'react';
import '../../Styles/ComponentStylecss/button.css';

const Button = ({ 
    label, 
    onClick,
    type,
    className}) => {
        return (
            <button className={'submit-button ${className)'}
            type={type}
            onClick={onClick}>
                <span>{label}</span>
            </button>
        );
};

export default Button;