// src/components/ApplicationForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApplicationForm.css';

const ApplicationForm = ({ application, onSuccess }) => {
    const [formData, setFormData] = useState({
        ApplicationID: application?.ApplicationID || '',
        StudentID: application?.StudentID || '',
        ScholarshipID: application?.ScholarshipID || '',
        SubmissionDate: application?.SubmissionDate || '',
        Status: application?.Status || '',
        HODFeedback: application?.HODFeedback || '',
        PrincipalFeedback: application?.PrincipalFeedback || ''
    });

    useEffect(() => {
        if (application) {
            setFormData({
                ApplicationID: application.ApplicationID,
                StudentID: application.StudentID,
                ScholarshipID: application.ScholarshipID,
                SubmissionDate: application.SubmissionDate,
                Status: application.Status,
                HODFeedback: application.HODFeedback,
                PrincipalFeedback: application.PrincipalFeedback
            });
        }
    }, [application]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (application) {
                // Edit existing application
                await axios.put(`/api/scholarship-applications/${application._id}`, formData);
            } else {
                // Create new application
                await axios.post('/api/scholarship-applications', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="application-form">
            <h1>{application ? 'Edit Application' : 'Add Application'}</h1>
            <form onSubmit={handleSubmit}>
                <label>Application ID:</label>
                <input type="text" name="ApplicationID" value={formData.ApplicationID} onChange={handleChange} required />

                <label>Student ID:</label>
                <input type="text" name="StudentID" value={formData.StudentID} onChange={handleChange} required />

                <label>Scholarship ID:</label>
                <input type="text" name="ScholarshipID" value={formData.ScholarshipID} onChange={handleChange} required />

                <label>Submission Date:</label>
                <input type="date" name="SubmissionDate" value={formData.SubmissionDate} onChange={handleChange} required />

                <label>Status:</label>
                <input type="text" name="Status" value={formData.Status} onChange={handleChange} required />

                <label>HOD Feedback:</label>
                <textarea name="HODFeedback" value={formData.HODFeedback} onChange={handleChange}></textarea>

                <label>Principal Feedback:</label>
                <textarea name="PrincipalFeedback" value={formData.PrincipalFeedback} onChange={handleChange}></textarea>

                <button type="submit">{application ? 'Update Application' : 'Add Application'}</button>
            </form>
        </div>
    );
};

export default ApplicationForm;
