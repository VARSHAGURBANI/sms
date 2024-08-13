// src/pages/HODDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HODDashboard.css';

const HODDashboard = () => {
    return (
        <div className="dashboard">
            <h1>HOD Dashboard</h1>
            <div className="buttons-container">
                <Link to="/applications" className="button">Review Applications</Link>
                <Link to="/profile" className="button">Profile</Link>
            </div>
        </div>
    );
};

export default HODDashboard;
