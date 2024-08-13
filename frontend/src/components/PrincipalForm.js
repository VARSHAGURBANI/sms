// src/components/PrincipalForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PrincipalForm.css';

const PrincipalForm = ({ principal, onSuccess }) => {
    const [formData, setFormData] = useState({
        PrincipalID: principal?.PrincipalID || '',
        Name: principal?.Name || '',
        Email: principal?.Email || ''
    });

    useEffect(() => {
        if (principal) {
            setFormData({
                PrincipalID: principal.PrincipalID,
                Name: principal.Name,
                Email: principal.Email
            });
        }
    }, [principal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (principal) {
                // Edit existing Principal
                await axios.put(`/api/principals/${principal._id}`, formData);
            } else {
                // Create new Principal
                await axios.post('/api/principals', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="principal-form">
            <h1>{principal ? 'Edit Principal' : 'Add Principal'}</h1>
            <form onSubmit={handleSubmit}>
                <label>ID:</label>
                <input type="text" name="PrincipalID" value={formData.PrincipalID} onChange={handleChange} required />

                <label>Name:</label>
                <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />

                <button type="submit">{principal ? 'Update Principal' : 'Add Principal'}</button>
            </form>
        </div>
    );
};

export default PrincipalForm;
