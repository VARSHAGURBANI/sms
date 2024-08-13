// src/pages/FinanceHeadDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './FinanceHeadDashboard.css';

const FinanceHeadDashboard = () => {
    return (
        <div className="dashboard">
            <h1>Finance Head Dashboard</h1>
            <div className="buttons-container">
                <Link to="/scholarships" className="button">Manage Scholarships</Link>
                <Link to="/profile" className="button">Profile</Link>
            </div>
        </div>
    );
};

export default FinanceHeadDashboard;
