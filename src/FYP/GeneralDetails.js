import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ApplLogin.css';

const GeneralDetails = () => {
  const navigate = useNavigate();
  const [education, setEducation] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [educationError, setEducationError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleEducationChange = (event) => {
    setEducation(event.target.value);
    setEducationError('');
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setPhoneError('');
  };

  const validateInputs = () => {
    let isValid = true;

    if (!education) {
      setEducationError('Education field is required');
      isValid = false;
    }

    if (!phone) {
      setPhoneError('Phone field is required');
      isValid = false;
    } else if (!/^[0-9]+$/.test(phone)) {
      setPhoneError('Invalid phone number');
      isValid = false;
    }

    return isValid;
  };

  const handleNextClick = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    const id = localStorage.getItem('id');
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
          education: education,
          phone: phone,
        }),
      });

      navigate('/Experience');
      alert('Experiences Added!');
    } catch (error) {
      alert('Invalid Credentials');
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">General Details</h1>
      <form className="login-form">
        <label className="login-label">
          Education: <span className="required">*</span>
        </label>
        <input
          className="login-input"
          type="text"
          value={education}
          onChange={handleEducationChange}
          required
        />
        {educationError && <span className="error-message">{educationError}</span>}
        <label className="login-label">
          Phone: <span className="required">*</span>
        </label>
        <input
          className="login-input"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          required
        />
        {phoneError && <span className="error-message">{phoneError}</span>}
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

export default GeneralDetails;
