import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import JobList from './pages/JobList';
import CreateJob from './pages/CreateJob';
import Profile from './pages/Profile';
import JobDetail from './pages/JobDetail';
import Apply from './pages/Apply';
import MyApplications from './pages/MyApplications';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<JobList />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/my-applications" element={<MyApplications />} />
      </Routes>
    </Router>
  );
};

export default App;
