import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Atoms/Button';
import '../../Styles/ComponentStylecss/loginform.css'; // Import the CSS file

const LoginForm = ({ showRememberMe, showForgotPassword, showCreateAccountButton }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

 
  

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in...');
    //validations
    if (!email.trim() || !password.trim()) {
      alert('Please enter both username and password.');
      return;
    }
    const userRole = 'Admin';

    navigate(`/${userRole}`);
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    console.log('Forgot Password clicked');
  };

  const handleCreateAccountRequest = () => {
    // Implement your shop request logic here
    console.log('Request for Shop clicked');
  };

  return (
    <div className="login-form-container">
      <label>
        Email:
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      {showRememberMe && (
        <label className="remember-me">
          <div className='remember-me-checkbox'>
          <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
          </div>
          Remember me
        </label>
      )}

      <Button
      label="Login" 
      className="login-button" 
      onClick={handleLogin}/>

      {showForgotPassword && (
        <p className="forgot-password">
          <a href="#" onClick={handleForgotPassword}>
            Forgot Password?
          </a>
        </p>
      )}

      {showCreateAccountButton && (
         <Button
         label="Create an Account"
         onClick={handleCreateAccountRequest}
         className="account-button"
       />
      )}
    </div>
  );
};

export default LoginForm;
