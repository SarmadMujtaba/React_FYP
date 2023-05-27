import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../ApplLogin.css';

function OrgSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Name is required");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (password.trim() === "") {
      setPasswordError("Password is required");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/organizations/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          pass: password,
          website: website,
          about: about,
        }),
      });
      console.log(response);
      setIsLoading(false);
      navigate('/OrgVerify');
    } catch (error) {
      setIsLoading(false);
      console.log('Invalid Credentials');
      alert('Invalid Credentials');
      console.error(error);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate('/OrgLogin');
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1 className="login-title">Organizatio Signup</h1>
        <label className="login-label">
        Name: <span style={{ color: 'red' }}>*</span>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={validateName}
            className="login-input"
          />
         
</label>
<label className="login-label">
Email: <span style={{ color: 'red' }}>*</span>
<input
         type="email"
         value={email}
         onChange={handleEmailChange}
         onBlur={validateEmail}
         className="login-input"
       />

</label>
<label className="password-label">
Password: <span style={{ color: 'red' }}>*</span>
<input
         type="password"
         value={password}
         onChange={handlePasswordChange}
         onBlur={validatePassword}
         className="password"
       />
</label>
<label className="login-label">
Website:
<input
         type="text"
         value={website}
         onChange={handleWebsiteChange}
         className="login-input"
       />
</label>
<label className="login-label">
About:
<textarea
         value={about}
         onChange={handleAboutChange}
         className="about"
       />
</label>
{isLoading ? (
<div>Loading...</div>
) : (
<button onClick={handleSignupSubmit} className="active">
Signup
</button>
)}
<button onClick={handleLoginSubmit} className="active">
Login
</button>
</form>
</div>
);
}

export default OrgSignup;
