import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/StudentDashboard';
import HODDashboard from './pages/HODDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';
import FinanceHeadDashboard from './pages/FinanceHeadDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/hod-dashboard" element={<HODDashboard />} />
        <Route path="/principal-dashboard" element={<PrincipalDashboard />} />
        <Route path="/finance-head-dashboard" element={<FinanceHeadDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
