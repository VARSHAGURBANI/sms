// src/components/PrincipalList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PrincipalList.css';

const PrincipalList = () => {
    const [principals, setPrincipals] = useState([]);

    useEffect(() => {
        const fetchPrincipals = async () => {
            try {
                const response = await axios.get('/api/principals');
                setPrincipals(response.data);
            } catch (error) {
                console.error('Error fetching Principals:', error);
            }
        };

        fetchPrincipals();
    }, []);

    return (
        <div className="principal-list">
            <h1>Principal List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {principals.map(principal => (
                        <tr key={principal._id}>
                            <td>{principal.PrincipalID}</td>
                            <td>{principal.Name}</td>
                            <td>{principal.Email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PrincipalList;
