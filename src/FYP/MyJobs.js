import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import "../App.css"
import "../Dash.css"
import axios from 'axios';

export default function MyJobs() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [clickedItems, setClickedItems] = useState([])

  const fetchData = async () => {
    try {
        const id = localStorage.getItem("id")
      const response = await axios.get(`/api/application?user_id=${id}`);
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
    const id = localStorage.getItem('id');
     try {
      const response = await fetch(`/api/application?user_id=${id}&job_id=${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
     console.log('Application Withdrawed from Job: ',id);
     console.log('ItemId',itemId);
     window.location.reload();
     alert('Application Withdrawn!');
     
    } catch (error) {
      console.log('invalid Credentials');

      alert('Unable to withdraw');
      console.error(error);
    }
      console.log(`Application Withdrawn: ${itemId}`);
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

    <div className='header'><h1 className='title'>My Job Applications</h1></div>

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
            <h3 className="org-title">Status</h3>
            <p>{item.status}</p>
            {!clickedItems.includes(item.id) ? (
              <button className='withdraw' onClick={() => handleButtonClick(item.id)}>Withdraw!</button>
            ) : (
              <button className='deactive' disabled>Withdrawn</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
