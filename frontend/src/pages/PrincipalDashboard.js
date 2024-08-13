// src/pages/PrincipalDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PrincipalDashboard.css';

const PrincipalDashboard = () => {
    return (
        <div className="dashboard">
            <h1>Principal Dashboard</h1>
            <div className="buttons-container">
                <Link to="/applications" className="button">Approve Applications</Link>
                <Link to="/profile" className="button">Profile</Link>
            </div>
        </div>
    );
};

export default PrincipalDashboard;
