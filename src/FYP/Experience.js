import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ApplLogin.css';

const Experience = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);
  const [experienceErrors, setExperienceErrors] = useState(['']);

  const handleExperienceChange = (index, event) => {
    const newExperiences = [...experiences];
    newExperiences[index] = event.target.value;
    setExperiences(newExperiences);
    validateExperience(index);
  };

  const validateExperience = (index) => {
    const errors = [...experienceErrors];
    const experience = experiences[index];

    if (!experience) {
      errors[index] = 'Experience field is required';
    } else {
      errors[index] = '';
    }

    setExperienceErrors(errors);
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, '']);
    setExperienceErrors([...experienceErrors, '']);
  };

  const validateInputs = () => {
    let isValid = true;

    const errors = [...experienceErrors];
    experiences.forEach((experience, index) => {
      if (!experience) {
        errors[index] = 'Experience field is required';
        isValid = false;
      } else {
        errors[index] = '';
      }
    });

    setExperienceErrors(errors);

    return isValid;
  };

  const handleNextClick = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    const id = localStorage.getItem('id');
    try {
      const response = await fetch('/api/profile/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
          experiences: experiences,
        }),
      });
      alert('Experiences Saved');
      navigate('/Skill');
    } catch (error) {
      alert('Invalid Credentials');
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Experience</h1>
      <form style={styles.form}>
        {experiences.map((experience, index) => (
          <div key={index} style={styles.inputContainer}>
            <label className="login-label">Experience: <span style={{ color: 'red' }}>*</span></label>
            <input
              className="login-input"
              type="text"
              value={experience}
              onChange={(event) => handleExperienceChange(index, event)}
              onBlur={() => validateExperience(index)}
            />
            {experienceErrors[index] && <span className="error-message">{experienceErrors[index]}</span>}
          </div>
        ))}
        <div style={styles.buttonContainer}>
          <button
            className="login-button"
            type="button"
            onClick={handleAddExperience}
          >
            Add Experience
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

export default Experience;
