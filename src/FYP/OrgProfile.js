import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Profile.css'

export default function OrgProfile() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [clickedItems, setClickedItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  const fetchData = async () => {
    try {
      const id = localStorage.getItem('id');
      const response = await axios.get(`/api/organizations/profile?id=${id}`);
      const jsonData = response.data;
      setData(jsonData);
    } catch (error) {
      alert('Failed to fetch!');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const buttonStyle = {
    backgroundColor: '#007aff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const handleLogout = () => {
    localStorage.removeItem("id")
    window.location.href = '/';
  };

  return (
    <>
         <div className="org-sidebar">
      <h2 className="font-bold mb-4 text-2xl text-center">Dashboard</h2>
      <ul>
      <li className="org-sidbar-button"><a href="/OrgDashboard">Find Job</a></li>
      <li className="org-sidbar-button"><a href="/OurJobs">My Jobs</a></li>
      
        <li className="org-sidbar-button"><a href="/message">Message</a></li>
        <li className="org-sidbar-button"><a href="/OrgProfile">My Profile</a></li>
        <li className="org-sidbar-button-logout"><a href="#" onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>

    <div className='header'><h1 className='title'>My Profile</h1></div>

      {/* Your other JSX code */}
      <div className="profile-container">
      {data && (
        <div className="profile-card">
          <h2 className="profile-heading">Profile Information</h2>
          <div className="profile-details">
            <div className="profile-row">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{data.name}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{data.email}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">About:</span>
              <span className="profile-value">{data.about}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Website:</span>
              <span className="profile-value">{data.website}</span>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
