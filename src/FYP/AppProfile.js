import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Profile.css'

export default function AppProfile() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [clickedItems, setClickedItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  const fetchData = async () => {
    try {
      const id = localStorage.getItem('id');
      const response = await axios.get(`/api/profile?user_id=${id}`);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };


  const handleButtonClick = async (itemId) => {
    if (selectedFile) {
        try {
            const id = localStorage.getItem("id")
          const formData = new FormData();
          formData.append('myFile', selectedFile);
    
          const response = await axios.post(`/api/upload?user_id=${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          alert('File uploaded successfully!');
          // Perform any additional actions after successful upload
    
          // Reset the selected file
          setSelectedFile(null);
        } catch (error) {
          console.error('Error uploading file:', error);
          // Handle the error condition
        }
      } else {
        console.log('No file selected.');
        // Handle the case when no file is selected
      }
    };

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
         <div className="sidebar">
      <h2 className="font-bold mb-4 text-2xl text-center">Dashboard</h2>
      <ul>
      <li className="sidbar-button"><a href="/AppDashboard">Find Job</a></li>
      <li className="sidbar-button"><a href="/MyJobs">My Jobs</a></li>
      
        <li className="sidbar-button"><a href="/message">Message</a></li>
        <li className="sidbar-button"><a href="/CVForm">Generate CV</a></li>
        <li className="sidbar-button"><a href="/AppProfile">My Profile</a></li>
        <li className="sidbar-button-logout"><a href="#" onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>

    <div className='header'><h1 className='title'>My Profile</h1></div>

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
              <span className="profile-label">Education:</span>
              <span className="profile-value">{data.education}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Phone:</span>
              <span className="profile-value">{data.phone}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Experience:</span>
              <span className="profile-value">{data.experiences}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Skills:</span>
              <span className="profile-value">{data.skills}</span>
            </div>
            <div className="profile-row">
          
            </div>
            <div>
            <label htmlFor="file-input" className="cv-upload">
        Choose File
      </label>
      <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        className="file-input"
      />
      {selectedFile && (
        <p className="selected-file">Selected File: {selectedFile.name}</p>
      )}


          {!clickedItems.includes(data.id) ? (
            <button className="active" onClick={() => handleButtonClick()}>
              Upload CV
            </button>
          ) : (
            <button className="deactive" disabled>
              Uploaded!
            </button>
          )}
            </div>
          </div>
        </div>
      )}
    </div>

    
    </>
  );
}
