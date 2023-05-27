import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import "../App.css"
import "../Dash.css"
import axios from 'axios';

export default function Shorlisted() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const item = localStorage.getItem('job_id');
    console.log('Itemid: ', item);
    try {
      const response = await axios.get(`/api/application?job_id=${item}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const inputStyle = {
    display: "inline",
    marginBottom: "10px",
    padding: "5px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "50%",
    boxSizing: "border-box",
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
          <li className="org-sidbar-button"><a href="/OrgDashboard">Post Job</a></li>
          <li className="org-sidbar-button"><a href="/OurJobs">Your Jobs</a></li>
          <li className="org-sidbar-button"><a href="/message">Message</a></li>
          <li className="org-sidbar-button"><a href="/OrgProfile">My Profile</a></li>
          <li className="org-sidbar-button-logout"><a href="#" onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>

      <div className='header'>
        <h1 className='title'>Shortlisting Results</h1>
      </div>

      <div className="data">
        {data.map((item) => (
          <div key={item.id} className="job-card">
            <h3 className="org-title">Applicant Name</h3>
            <h2 className="org-name">{item.name}</h2>
            <h3 className="org-title">Email</h3>
            <p className="job-description">{item.email}</p>
            <h3 className="org-title">Education</h3>
            <p className="job-description">{item.education}</p>
            <h3 className="org-title">Phone</h3>
            <p className="job-description">{item.phone}</p>
            <h3 className="org-title">Skills</h3>
            <p className="job-description">{item.skills}</p>
            <h3 className="org-title">Experiences</h3>
            <p className="job-description">{item.experiences}</p>
            <h3 className="org-title">Status</h3>
            <p className="job-description">{item.status}</p>
          </div>
        ))}
      </div>
    </>
  );
};
