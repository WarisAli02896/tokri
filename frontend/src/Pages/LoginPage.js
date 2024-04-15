import React from 'react';
import LoginForm from '../Components/Forms/Loginform';
import logo from '../Assets/logopic.png';
import '../Styles/PagesStylescss/loginpage.css';

const LoginPage = () => {
  return (
    <div className='login-page'>
      <div className='loginformcomp'>
    <LoginForm showRememberMe />
    </div>
      <div className='logopic'>
      <img src={logo}  alt='Logo'/>
    </div>
    
    </div>
  )
}

export default LoginPage;