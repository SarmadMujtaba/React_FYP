import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import "../Dash.css"
import axios from 'axios';

export default function AppDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [clickedItems, setClickedItems] = useState([])
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/jobs');
      const jsonData = response.data;
      setData(jsonData);
    } catch (error) {
      alert("Failed to fetch!");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick =  async(itemId) => {
    const id = localStorage.getItem('id');
   {
    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
          job_id: itemId,
          status: 'Waiting',
        }),
      });
     alert('Application Submitted!');
     setClickedItems([...clickedItems, itemId]);
    } catch (error) {
      console.log('invalid Credentials');
      alert('Invalid Credentials');
      console.error(error);
    }
      console.log(`Applied to Job: ${itemId}`);
      // Update the state to include the clicked item
    }
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
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
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

    <div className='header'><h1 className='title'>Find Jobs</h1></div>

    <div className="data">
  <input
    placeholder="Search Job"
    style={inputStyle}
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  {filteredData.map((item) => (
    <div key={item.id} className="job-card">
      <h3 className="org-title">Organization</h3>
      <h2 className="org-name">{item.name}</h2>
      <h3 className="job-title">Job Title</h3>
      <p className="job-description">{item.designation}</p>
      <h3 className="category-title">Category</h3>
      <p className="category">{item.category}</p>
      <h3 className="description-title">Description</h3>
      <p className="description">{item.description}</p>
      <h3 className="location-title">Location</h3>
      <p className="location">{item.location}</p>
      <h3 className="salary-title">Salary</h3>
      <p className="salary">{item.salary}</p>
      <h3 className="postedAt-title">Posted At</h3>
      <p className="postedAt">{item.CreatedAt}</p>
      {!clickedItems.includes(item.id) ? (
        <button className="active" onClick={() => handleButtonClick(item.id)}>
          Apply Now!
        </button>
      ) : (
        <button className="deactive" disabled>
          Applied
        </button>
      )}
    </div>
  ))}
</div>

    </>
  );
};
