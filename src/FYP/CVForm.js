import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import "../CVForm.css"


export default function CVForm() {
  const [formData, setFormData] = useState({
    personalname: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  

  const generateCV = (cvData) => {
    const { personalname, email, phone, education, experience, skills } = cvData;
  
    const cvContent = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding-left: 90px; /* Adjust the value as needed */
        }
        h1 {
          font-size: 2.5em; 
          margin-bottom: 15px;
        }
        h2 {
          font-size: 2.5em;        margin-bottom: 15px;
       
        }
        p {
          margin-bottom: 5px;
        
        }
      </style>
    </head>
    <body>
      <h1 style="text-align: center; font-size: 2.5em; font-weight:bold">Curriculum Vitae </h1><br><br>
      <h2 style="text-indent: 75px; font-size: 2em; font-weight:bold">Personal Information</h2>
      <p style="text-indent: 75px; font-size: 1.5em;" >Name: ${personalname}</p>
      <p style="text-indent: 75px; font-size: 1.5em;" >Email: ${email}</p>
      <p style="text-indent: 75px; font-size: 1.5em;" >Phone: ${phone}</p><br><hr>
  
      <h2 style="text-indent: 75px; font-size: 2em; font-weight:bold" >Experience</h2>
      <p style="text-indent: 75px; font-size: 1.5em;" >${experience}</p><br><hr>
  
      <h2 style="text-indent: 75px; font-size: 2em; font-weight:bold">Education</h2>
      <p style="text-indent: 75px; font-size: 1.5em;" >${education}</p><br><hr>
  
      <h2 style="text-indent: 75px; font-size: 2em; font-weight:bold" >Skills</h2>
      <p style="text-indent: 75px; font-size: 1.5em; ">${skills}</p>
    </body>
  </html>  
    `;
  
    return new Promise((resolve, reject) => {
      const element = document.createElement('div');
      element.innerHTML = cvContent;
  
      html2pdf()
        .from(element)
        .save()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Generate CV and download link
    const cvData = {
      personalname: formData.personalname,
      email: formData.email,
      phone: formData.phone,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills
    };
  
    try {
      // Generate CV
      await generateCV(cvData);
  
      // Clear form data
      setFormData({
        personalname: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        skills: ''
      });
    } catch (error) {
      console.log('Error generating CV:', error);
    }
  };
  

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f2f2f2"}}>
      <form  onSubmit={handleSubmit}>
      <h1 className='top-heading'>Curriculum Vitae</h1>
      <br /><br />
      <div className='cv-card'>
      <h2 className='heading'>Personal Information</h2>
      <p className='info'>Name:&nbsp;
        <input style={{ marginBottom: "5px", marginLeft: "5.3%", borderRadius: "5px", border: "1px solid black", fontSize: "1.2em" }} type="text" name="personalname" value={formData.personalname} onChange={handleChange}  />
     </p>
      <p className='info'>Email:&nbsp;
        <input className='value' type="email" name="email" value={formData.email} onChange={handleChange} required />
      </p>
      <p className='info'>Phone:
      <input className='value' type="tel" name="phone" value={formData.phone} onChange={handleChange} required /><br />
      </p>
      <h2 className='heading'>Experience</h2>
      <textarea className='value' name="education" value={formData.education} onChange={handleChange} required /><br />
        
      <h2 className='heading'>Education</h2>
      <textarea className='value' name="experience" value={formData.experience} onChange={handleChange} required /><br />
  
      <h2 className='heading'>Skills</h2>
      <textarea className='value' name="skills" value={formData.skills} onChange={handleChange} required /><br />
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button className='template-button' type="submit">Generate CV</button>
      </div>
      </div>
      
      </form>
      </div>
     
    
  );
}
