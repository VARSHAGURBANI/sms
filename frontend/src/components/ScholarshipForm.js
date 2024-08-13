// src/components/ScholarshipForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ScholarshipForm.css';

const ScholarshipForm = ({ scholarship, onSuccess }) => {
    const [formData, setFormData] = useState({
        ScholarshipID: scholarship?.ScholarshipID || '',
        Name: scholarship?.Name || '',
        Description: scholarship?.Description || '',
        Criteria: scholarship?.Criteria || '',
        Amount: scholarship?.Amount || ''
    });

    useEffect(() => {
        if (scholarship) {
            setFormData({
                ScholarshipID: scholarship.ScholarshipID,
                Name: scholarship.Name,
                Description: scholarship.Description,
                Criteria: scholarship.Criteria,
                Amount: scholarship.Amount
            });
        }
    }, [scholarship]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (scholarship) {
                // Edit existing scholarship
                await axios.put(`/api/scholarships/${scholarship._id}`, formData);
            } else {
                // Create new scholarship
                await axios.post('/api/scholarships', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="scholarship-form">
            <h1>{scholarship ? 'Edit Scholarship' : 'Add Scholarship'}</h1>
            <form onSubmit={handleSubmit}>
                <label>ID:</label>
                <input type="text" name="ScholarshipID" value={formData.ScholarshipID} onChange={handleChange} required />

                <label>Name:</label>
                <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />

                <label>Description:</label>
                <textarea name="Description" value={formData.Description} onChange={handleChange} required />

                <label>Criteria:</label>
                <textarea name="Criteria" value={formData.Criteria} onChange={handleChange} required />

                <label>Amount:</label>
                <input type="number" step="0.01" name="Amount" value={formData.Amount} onChange={handleChange} required />

                <button type="submit">{scholarship ? 'Update Scholarship' : 'Add Scholarship'}</button>
            </form>
        </div>
    );
};

export default ScholarshipForm;

