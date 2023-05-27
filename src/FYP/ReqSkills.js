import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import "../App.css"
import "../Dash.css"



export default function ReqSkills() {

    const navigate = useNavigate();

    const [skills, setSkills] = useState(['']);
    const [isLoading, setIsLoading] = useState(false);

    const handleSkillChange = (index, event) => {
        const newSkills = [...skills];
        newSkills[index] = event.target.value;
        setSkills(newSkills);
      }
      
      const handleAddSkill = () => {
        setSkills([...skills, '']);
      }

    const handleNextClick = async () => {
        const id = localStorage.getItem('job_id');
        try {
          const response = await fetch('/api/jobs/skills', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              job_id: id,
              skills: skills,
            }),
          });
          const body = {job_id: id, skills: skills}; 
          console.log('data',body);
          console.log('job_id:', id);
          setIsLoading(false);
          alert('Job Posted!');
          navigate('/OrgDashboard');
        } catch (error) {
          console.log('invalid Credentials');
          setIsLoading(false);
         alert('Invalid Data');
          console.error(error);
        }
    }
    
    


      
  const inputStyle = {
    display: "block",
    marginBottom: "10px",
    padding: "5px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
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




        return (
            <>
                 <div className="sidebar">
      <h2 className="font-bold mb-4 text-2xl text-center">Dashboard</h2>
      <ul>
      <li className="sidbar-button"><a href="/AppDashboard">Post Job</a></li>
      <li className="sidbar-button"><a href="/MyJobs">Our Jobs</a></li>
      
        <li className="sidbar-button"><a href="/message">Message</a></li>
        <li className="sidbar-button"><a href="/AppProfile">Your Profile</a></li>
        <li className="sidbar-button-logout"><a href="#" onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>

    <div className='header'><h1 className='title'>Add Skills</h1></div>

            <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={styles.container}>

      <form className='hello2'>
        {skills.map((skill, index) => (
          <div key={index} style={styles.inputContainer}>

<label className="login-label">Skill:
        <input
          type="text"
          value={skill}
          onChange={(event) => handleSkillChange(index, event)}
          className="login-input"
        />
      </label>


          </div>
        ))}
        <div style={styles.buttonContainer}>
          <button
            className="login-button"
            type="button"
            onClick={handleAddSkill}
          >
            Add Skill
          </button>
          <button
            className="login-button"
            type="button"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </form>
    </div>
            </div>
            </>
        );
}

        
const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: "60%",
    },
    title: {
      fontSize: '2rem',
      marginBottom: '2rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%',
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '1rem',
      width: "100%",
    },
    label: {
      fontSize: '1rem',
      marginBottom: '0.5rem',
    },
    input: {
      padding: '0.5rem',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '5px',
      width: "100%"
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '1rem',
      width: '100%',
    },
    button: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '5px',
      background: '#007bff',
      color: '#fff',
      cursor: 'pointer',
    },
  };

