import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../App.css";
import "../Dash.css";

export default function OrgDashboard() {
  const navigate = useNavigate();

  const [designation, setDesignation] = useState('');
  const [designationError, setDesignationError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [location, setLocation] = useState('');
  const [locationError, setLocationError] = useState('');
  const [salary, setSalary] = useState('');
  const [salaryError, setSalaryError] = useState('');
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
    validateDesignation(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    validateDescription(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    validateLocation(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
    validateSalary(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    validateCategory(event.target.value);
  };

  const validateInputs = () => {
    let isValid = true;
  
    if (designation.trim() === '') {
      setDesignationError('Designation is required');
      isValid = false;
    } else {
      setDesignationError('');
    }
  
    if (description.trim() === '') {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }
  
    if (location.trim() === '') {
      setLocationError('Location is required');
      isValid = false;
    } else {
      setLocationError('');
    }
  
    if (salary.trim() === '') {
      setSalaryError('Salary is required');
      isValid = false;
    } else {
      setSalaryError('');
    }
  
    if (category.trim() === '') {
      setCategoryError('Category is required');
      isValid = false;
    } else {
      setCategoryError('');
    }
  
    return isValid;
  };
  
  
  const handleNextClick = async () => {
    if (validateInputs()){
    setIsLoading(true);
    const id = localStorage.getItem('id');
    console.log(id);
  
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          org_id: id,
          designation: designation,
          location: location,
          salary: salary,
          category: category,
          description: description,
        }),
      });
  
      const json = await response.json();
      localStorage.setItem('job_id', json.id);
      alert(localStorage.getItem('job_id'));
      setIsLoading(false);
      navigate("/ReqSkills")
    } catch (error) {
      console.log('Invalid Credentials');
      alert('Invalid Credentials');
      console.error(error);
      setIsLoading(false);
    }
    }
  };
  

  const isFormValid = () => {
    return (
      designationError === '' &&
      descriptionError === '' &&
      locationError === '' &&
      salaryError === '' &&
      categoryError === ''
    );
  };

  const validateDesignation = (value) => {
    if (value.trim() === '') {
      setDesignationError('Designation is required');
    } else {
      setDesignationError('');
    }
  };

  const validateDescription = (value) => {
    if (value.trim() === '') {
    setDescriptionError('Description is required');
    } else {
    setDescriptionError('');
    }
    };
    
    const validateLocation = (value) => {
    if (value.trim() === '') {
    setLocationError('Location is required');
    } else {
    setLocationError('');
    }
    };
    
    const validateSalary = (value) => {
    if (value.trim() === '') {
    setSalaryError('Salary is required');
    } else {
    setSalaryError('');
    }
    };
    
    const validateCategory = (value) => {
    if (value.trim() === '') {
    setCategoryError('Category is required');
    } else {
    setCategoryError('');
    }
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
    <div className='header'><h1 className='title'>Post Job</h1></div>

<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
  <form className='hello'>
    <label className="login-label">
      Job Title:
      <input
        type="text"
        value={designation}
        onChange={handleDesignationChange}
        className="login-input"
      />
      {designationError && <div className="error-message">{designationError}</div>}
    </label>
    <label className="login-label">
      Description:
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        className="login-input"
      />
      {descriptionError && <div className="error-message">{descriptionError}</div>}
    </label>
    <label className="login-label">
      Location:
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        className="login-input"
      />
      {locationError && <div className="error-message">{locationError}</div>}
    </label>
    <label className="login-label">
      Salary:
      <input
        type="text"
        value={salary}
        onChange={handleSalaryChange}
        className="login-input"
      />
      {salaryError && <div className="error-message">{salaryError}</div>}
    </label>
    <label className="login-label">
      Category:
      <input
        type="text"
        placeholder="Remote/Full-Time/Part-Time"
        value={category}
        onChange={handleCategoryChange}
        className="login-input"
      />
      {categoryError && <div className="error-message">{categoryError}</div>}
    </label>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
<button onClick={() => handleNextClick()} className="login-button">
  Next
</button>


    )}
  </form>
</div>
</>
    );
}
