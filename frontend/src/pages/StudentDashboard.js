// src/pages/StudentDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
    return (
        <div className="dashboard">
            <h1>Student Dashboard</h1>
            <div className="buttons-container">
                <Link to="/scholarships" className="button">View Scholarships</Link>
                <Link to="/applications" className="button">My Applications</Link>
                <Link to="/profile" className="button">Profile</Link>
            </div>
        </div>
    );
};

export default StudentDashboard;
