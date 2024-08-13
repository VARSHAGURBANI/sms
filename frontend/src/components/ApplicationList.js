// src/components/ApplicationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ApplicationList.css';

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('/api/scholarship-applications');
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div className="application-list">
            <h1>Scholarship Applications</h1>
            <table>
                <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>Student ID</th>
                        <th>Scholarship ID</th>
                        <th>Submission Date</th>
                        <th>Status</th>
                        <th>HOD Feedback</th>
                        <th>Principal Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(application => (
                        <tr key={application._id}>
                            <td>{application.ApplicationID}</td>
                            <td>{application.StudentID}</td>
                            <td>{application.ScholarshipID}</td>
                            <td>{new Date(application.SubmissionDate).toLocaleDateString()}</td>
                            <td>{application.Status}</td>
                            <td>{application.HODFeedback}</td>
                            <td>{application.PrincipalFeedback}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationList;
