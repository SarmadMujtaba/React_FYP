import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './FYP/Home';
import ApplLogin from './FYP/AppLogin';
import AppSignup from './FYP/AppSignup';
import GeneralDetails from './FYP/GeneralDetails';
import Experience from './FYP/Experience';
import Skill from './FYP/Skill';
import AppVerify from './FYP/AppVerify';
import Dash from './FYP/OrgDashboard';
import OrgSignup from './FYP/OrgSignup';
import OrgLogin from './FYP/OrgLogin';
import OrgVerify from './FYP/OrgVerify';
import OrgDashboard from './FYP/OrgDashboard';
import ReqSkills from './FYP/ReqSkills';
import AppDashboard from './FYP/AppDashboard';
import MyJobs from './FYP/MyJobs';
import AppProfile from './FYP/AppProfile';
import OurJobs from './FYP/OurJobs';
import Shorlisted from './FYP/Shortlisted';
import OrgProfile from './FYP/OrgProfile';
import Message from './FYP/Message';
import CVForm from './FYP/CVForm';




export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AppLogin" element={<ApplLogin />} />
        <Route path="/AppSignup" element={<AppSignup />} />
        <Route path="/GeneralDetails" element={<GeneralDetails />} />
        <Route path="/Experience" element={<Experience />} />
        <Route path="/Skill" element={<Skill />} />
        <Route path="/AppVerify" element={<AppVerify />} />
        <Route path="/Dash" element={<Dash />} />
        <Route path="/OrgSignup" element={<OrgSignup />} />
        <Route path="/OrgLogin" element={<OrgLogin />} />
        <Route path="/OrgVerify" element={<OrgVerify />} />
        <Route path="/OrgDashboard" element={<OrgDashboard />} />
        <Route path="/ReqSkills" element={<ReqSkills />} />
        <Route path="/AppDashboard" element={<AppDashboard />} />
        <Route path="/MyJobs" element={<MyJobs />} />
        <Route path="/AppProfile" element={<AppProfile />} />
        <Route path="/OurJobs" element={<OurJobs />} />
        <Route path="/Shorlisted" element={<Shorlisted />} />
        <Route path="/OrgProfile" element={<OrgProfile />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/CVForm" element={<CVForm />} />






        </Routes>
      </BrowserRouter>
    </div>
  )
}
