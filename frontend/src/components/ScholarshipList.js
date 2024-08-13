// src/components/ScholarshipList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ScholarshipList.css';

const ScholarshipList = () => {
    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await axios.get('/api/scholarships');
                setScholarships(response.data);
            } catch (error) {
                console.error('Error fetching scholarships:', error);
            }
        };

        fetchScholarships();
    }, []);

    return (
        <div className="scholarship-list">
            <h1>Scholarship List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Criteria</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {scholarships.map(scholarship => (
                        <tr key={scholarship._id}>
                            <td>{scholarship.ScholarshipID}</td>
                            <td>{scholarship.Name}</td>
                            <td>{scholarship.Description}</td>
                            <td>{scholarship.Criteria}</td>
                            <td>{scholarship.Amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScholarshipList;
