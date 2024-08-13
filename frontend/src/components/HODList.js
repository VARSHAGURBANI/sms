// src/components/HODList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HODList.css';

const HODList = () => {
    const [hods, setHods] = useState([]);

    useEffect(() => {
        const fetchHODs = async () => {
            try {
                const response = await axios.get('/api/hods');
                setHods(response.data);
            } catch (error) {
                console.error('Error fetching HODs:', error);
            }
        };

        fetchHODs();
    }, []);

    return (
        <div className="hod-list">
            <h1>Head of Department List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {hods.map(hod => (
                        <tr key={hod._id}>
                            <td>{hod.HODID}</td>
                            <td>{hod.Name}</td>
                            <td>{hod.Email}</td>
                            <td>{hod.Department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HODList;
