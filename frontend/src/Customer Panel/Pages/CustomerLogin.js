import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../Components/Forms/Loginform';
import logo from '../../Assets/logopic.png';
import '../../Styles/PagesStylescss/customerpage/customerLogin.css';

const CustomerLogin = () => {
  const navigate= useNavigate();
 /* const handleLogin = async (e, email, password) => {
    e.preventDefault();

    const userData = {
      user: {
        email,
        password
      }
    };
    await fetch(
      'localhost:3000/fyp/user/login',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData.user)
      })
      .then(response => response.json())
      .then((response) => {
        if (response.data.response != null) {
          alert(response.data.response)

          
          let token = response.data.User.token
        
          localStorage.setItem('token', token);
          console.log(localStorage.getItem('token'))
          navigate("/customer");
        }
        else if (response.error && response.error.errorMessage) {
          alert(response.error.errorMessage);
        }
       
      })

      .catch((error) => {
        alert(error.error.errorMessage);
      })

  };*/

const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/fyp/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      // Handle non-200 status code
      throw new Error('Failed to login');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle fetch error
    console.error('Error while fetching:', error);
    throw error;
  }
};

 

  return (
    <div className='login-page'>
      <div className='loginformcomp'>
        <LoginForm onLogin={handleLogin} showRememberMe />
      </div>
      <div className='logopic'>
        <img src={logo} alt='Logo' />
      </div>
    </div>
  );
}

export default CustomerLogin;
