// src/pages/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="submit-button">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
