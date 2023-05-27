import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ApplLogin.css';

const AppSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError('');
  };

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

    if (!name) {
      setNameError('Name is required');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Enter at least 6 characters');
      isValid = false;
    } else if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      setPasswordError('Enter both letters and numbers');
      isValid = false;
    }

    return isValid;
  };

  const handleNextClick = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          pass: password,
        }),
      });

      const json = await response.json();
      localStorage.setItem('id', JSON.stringify(json.id));
      setIsLoading(true);
      alert('Sign In Successful');
      navigate('/GeneralDetails');
    } catch (error) {
      alert('Invalid Credentials');
      console.error(error);
    }

    setIsLoading(true);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Applicant SignUp</h1>
      <form className="login-form">
        <label className="login-label">
          Name: <span className="required">*</span>
        </label>
        <input
          className="login-input"
          type="text"
          value={name}
          onChange={handleNameChange}
          required
        />
        {nameError && <span className="error-message">{nameError}</span>}
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
        <div>
          <button
            className="general-details"
            type="button"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
  
  
};


export default AppSignup;
