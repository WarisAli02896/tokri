import React from 'react';
import LoginForm from '../../Components/Forms/Loginform';
import logo from '../../Assets/logopic.png';
import '../../Styles/PagesStylescss/adminpage/adminLogin.css';

const AdminLoginPage = () => {
  return (
    <div className='login-page'>
      <div className='loginformcomp'>
    <LoginForm showRememberMe userRole="Admin" />
    </div>
      <div className='logopic'>
      <img src={logo}  alt='Logo'/>
    </div>
    
    </div>
  )
}

export default AdminLoginPage;