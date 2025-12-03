
import React from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './screens/Welcome';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { Dashboard } from './screens/Dashboard';
import { CreateProject } from './screens/CreateProject';
import { ProjectDetails } from './screens/ProjectDetails';
import { ApplicantsList } from './screens/ApplicantsList';
import { ApplicantProfile } from './screens/ApplicantProfile';

const App: React.FC = () => {
  return (
    <MemoryRouter>
      <div className="min-h-screen bg-background-light text-gray-900 font-display">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-student" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateProject />} />
          
          {/* Student View for Project */}
          <Route path="/project/:id" element={<ProjectDetails />} />
          
          {/* Creator View for Project Applicants */}
          <Route path="/project/:id/applicants" element={<ApplicantsList />} />
          
          {/* Applicant Details */}
          <Route path="/applicant/:id" element={<ApplicantProfile />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </MemoryRouter>
  );
};

export default App;
