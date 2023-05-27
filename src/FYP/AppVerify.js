import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppVerify = () => {
  const navigate = useNavigate();


  const handleLoginClick = () => {
    navigate('/AppLogin');
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: "#f2f2f2",
    }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '1rem',
      }}>Registered!</h1>
      <p style={{
        fontSize: '1.5rem',
        marginBottom: '2rem',
      }}>Verify Your Email Before Login</p>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <button className='general-details'onClick={handleLoginClick}>Login</button>

      </div>
    </div>
  );
};

export default AppVerify;
