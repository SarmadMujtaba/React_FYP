import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css'

const Home = () => {
  const navigate = useNavigate();

  const handleApplicantClick = () => {
    navigate('/AppLogin');
  };

  const handleOrgClick = () => {
    navigate('/OrgLogin');
  };

  return (
    <div className="home-contain">
      <h1 className="home-title">Welcome to J2E!</h1>
      <p className="home-text">Please let us know your role!</p>
      <div>
        <button className="home" onClick={handleApplicantClick}>Applicant</button>
        <button className="home" onClick={handleOrgClick}>Organization</button>
      </div>
    </div>
  );
};

export default Home;
