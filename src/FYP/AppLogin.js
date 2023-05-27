import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ApplLogin.css';

const ApplLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const validateInputs = () => {
    let isValid = true;
  
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }
  
    if (!password) {
      setPasswordError('Password is required1');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Enter at least 6 characters!');
      isValid = false;
    } else if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      setPasswordError('Enter letters and numbers!');
      isValid = false;
    }
  
    return isValid;
  };
  

  const handleLoginClick = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          pass: password,
        }),
      });

      const json = await response.json();
      localStorage.setItem('id', json.id);

      navigate('/AppDashboard');
    } catch (error) {
      alert('Invalid Credentials');
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleSignupClick = () => {
    navigate('/AppSignup');
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Applicant Login</h1>
      <form className="login-form">
        <label className="login-label">
          Email: <span className="required">*</span>
        </label>
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <span className="error-message">{emailError}</span>}
        <label className="login-label">
          Password: <span className="required">*</span>
        </label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && <span className="error-message">{passwordError}</span>}
        <div className="login-buttons">
          <button className="login-button" type="button" onClick={handleLoginClick}>
            Login
          </button>
          <button className="login-button" type="button" onClick={handleSignupClick}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplLogin;
