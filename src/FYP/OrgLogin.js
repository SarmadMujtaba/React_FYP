import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ApplLogin.css';

const OrgLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateEmail = () => {
    if (email.trim() === '') {
      setEmailError('Email is required');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = () => {
    if (password.trim() === '') {
      setPasswordError('Password is required');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/organizations/login', {
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
      const id = json.id;
      // Store the ID in local storage
      localStorage.setItem('id', id);
      setIsLoading(false);
      navigate('/OrgDashboard');
    } catch (error) {
      setIsLoading(false);
      console.log('Invalid Credentials');
      alert('Invalid Credentials');
      console.error(error);
    }
  };

  const handleSignupClick = () => {
    navigate('/OrgSignup');
  };

  return (
    <div className='background'>
    <div className="login-container">
      <h1 className="login-title">Organization Login</h1>
      <form className="login-form">
        <label className="login-label">
          Email: <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={validateEmail}
        />
        {emailError && <span className="error-message">{emailError}</span>}
        <label className="login-label">
          Password: <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={validatePassword}
        />
        {passwordError && <span className="error-message">{passwordError}</span>}
        <div className="login-buttons">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <button className="login-button" type="button" onClick={handleLoginClick}>
              Login
            </button>
          )}
          <button className="login-button" type="button" onClick={handleSignupClick}>
            Signup
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default OrgLogin
