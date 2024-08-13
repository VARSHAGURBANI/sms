// src/components/HODForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HODForm.css';

const HODForm = ({ hod, onSuccess }) => {
    const [formData, setFormData] = useState({
        HODID: hod?.HODID || '',
        Name: hod?.Name || '',
        Email: hod?.Email || '',
        Department: hod?.Department || ''
    });

    useEffect(() => {
        if (hod) {
            setFormData({
                HODID: hod.HODID,
                Name: hod.Name,
                Email: hod.Email,
                Department: hod.Department
            });
        }
    }, [hod]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (hod) {
                // Edit existing HOD
                await axios.put(`/api/hods/${hod._id}`, formData);
            } else {
                // Create new HOD
                await axios.post('/api/hods', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="hod-form">
            <h1>{hod ? 'Edit HOD' : 'Add HOD'}</h1>
            <form onSubmit={handleSubmit}>
                <label>ID:</label>
                <input type="text" name="HODID" value={formData.HODID} onChange={handleChange} required />

                <label>Name:</label>
                <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />

                <label>Department:</label>
                <input type="text" name="Department" value={formData.Department} onChange={handleChange} required />

                <button type="submit">{hod ? 'Update HOD' : 'Add HOD'}</button>
            </form>
        </div>
    );
};

export default HODForm;
