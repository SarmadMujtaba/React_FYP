import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import "../App.css"
import "../Dash.css"
import axios from 'axios';

export default function OurJobs() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [clickedItems, setClickedItems] = useState([])

  const fetchData = async () => {
    try {
        const id = localStorage.getItem("id")
      const response = await axios.get(`/api/jobs?org_id=${id}`);
      const jsonData = response.data;
      setData(jsonData);
    } catch (error) {
      alert("Failed to fetch!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick =  async(itemId) => {
        try {
            const response = await fetch(`/api/jobs?id=${itemId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    //         const data = await response.json();
    //         console.log("response:", response);
    // console.log("data:", data);
            alert("Job Deleted!")
            window.location.reload();
          } catch (error) {
            console.error(error);
            alert("Something went wrong!")
          }
  };



  const Shorlisted = async (itemId) => {
    localStorage.setItem('job_id',itemId);
     try {
      const response = await fetch(`/api/application/shortlist?job_id=${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
     alert('Candidates Shorlisted!');
     navigate('/Shorlisted');
    } catch (error) {
      console.log('invalid Credentials');
     alert('Invalid Credentials');
      console.error(error);
    }
      console.log(`Shorlisted Job: ${itemId}`);
  };


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

  const labelStyle = {
    display: "inline",
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const buttonStyle = {
    backgroundColor: "#007aff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const handleLogout = () => {
    localStorage.removeItem("id")
    window.location.href = '/';
  };

  const filteredData = data.filter(item => item.designation.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      {/* <div className="free bg-gray-200 h-screen w-64 py-6 px-4 " style={{ height: "110vh", position: "fixed" }}>
        <h2 className="font-bold mb-4 text-2xl text-center">Dashbord</h2>
        <ul>
          <li className="login-button"><a href="/home">Find Job</a></li>
          <li className="login-button"><a href="/about">My Jobs</a></li>
          <li className="login-button"><a href="/message">Message</a></li>
          <li className="login-button"><a href="/profile">My Profile</a></li>
        </ul>
      </div> */}
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

    <div className='header'><h1 className='title'>Your Jobs</h1></div>

      <div className="data">
        <input placeholder="Search Job" style={inputStyle} type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        {filteredData.map((item) => (
          <div key={item.id} className="job-card">
            <h3 className="org-title">Organization</h3>
            <h2 className="org-name">{item.name}</h2>
            <h3 className="org-title">Job Title</h3>
            <p className="job-description">{item.designation}</p>           
            <h3 className="org-title">Category</h3>
            <p className="job-description">{item.category}</p>
            <h3 className="org-title">Description</h3>
            <p className="job-description">{item.description}</p>            
            <h3 className="org-title">Location</h3>
            <p className="job-description">{item.location}</p>
            <h3 className="org-title">Salary</h3>
            <p className="job-description">{item.salary}</p>
            <h3 className="org-title">Posted At</h3>
            <p className="job-description">{item.CreatedAt}</p>
            {!clickedItems.includes(item.id) ? (
              <button className='withdraw' onClick={() => handleButtonClick(item.id)}>Delete Job!</button>
            ) : (
              <button className='deactive' disabled>Job Deleted</button>
            )}
            {!clickedItems.includes(item.id) ? (
              <button className='active' onClick={() => Shorlisted(item.id)}>Shortlist!</button>
            ) : (
              <button className='deactive' disabled>Shortlisted</button>
            )}
    
          </div>
        ))}



      </div>
    </>
  );
};
