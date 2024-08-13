// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Welcome to the Scholarship Management System</h1>
            <div className="buttons-container">
                <Link to="/login" className="button">Login</Link>
                <Link to="/signup" className="button">Sign Up</Link>
            </div>
        </div>
    );
};

export default HomePage;
