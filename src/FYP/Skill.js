import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ApplLogin.css';

const Skill = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(['']);
  const [skillErrors, setSkillErrors] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);

  const handleSkillChange = (index, event) => {
    const newSkills = [...skills];
    newSkills[index] = event.target.value;
    setSkills(newSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, '']);
    setSkillErrors([...skillErrors, '']);
  };

  const validateSkill = (index) => {
    const newSkillErrors = [...skillErrors];
    if (skills[index].trim() === '') {
      newSkillErrors[index] = 'Skill is required';
    } else {
      newSkillErrors[index] = '';
    }
    setSkillErrors(newSkillErrors);
  };

  const handleNextClick = async () => {
    setIsLoading(true);
    const id = localStorage.getItem('id');

    // Filter out empty skills
    const filteredSkills = skills.filter(skill => skill.trim() !== '');

    if (filteredSkills.length === 0) {
      setSkillErrors(['At least one skill is required']);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/profile/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
          skills: filteredSkills,
        }),
      });
      alert('Skills Saved');
      navigate('/AppVerify');
    } catch (error) {
      alert('Invalid Credentials');
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className='login-container'>
    <div style={styles.container}>
      <h1 style={styles.title}>Add Skills</h1>
      <form className='login-form'>
        {skills.map((skill, index) => (
          <div key={index} style={styles.inputContainer}>
            <label className="login-label">Skill: <span style={{ color: 'red' }}>*</span></label>
            <input
              className="login-input"
              type="text"
              value={skill}
              onChange={(event) => handleSkillChange(index, event)}
              onBlur={() => validateSkill(index)}
            />
            {skillErrors[index] && <span className="error-message">{skillErrors[index]}</span>}
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
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
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

export default Skill;
