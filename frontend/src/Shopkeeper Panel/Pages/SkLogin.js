import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../Components/Forms/Loginform';
import logo from '../../Assets/logopic.png';
import '../../Styles/PagesStylescss/adminpage/adminLogin.css';

const SkLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    console.warn(email, password);
    const item = { email, password };
    try {
      let result = await fetch("http://localhost:3000/shopKeeper/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(item)
      });
      result = await result.json();
      localStorage.setItem("shopkeeper", JSON.stringify(result));
      navigate("/shopkeeper");
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error, maybe display a message to the user
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
};

export default SkLogin;
