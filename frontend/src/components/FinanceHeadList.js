// src/components/FinanceHeadList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FinanceHeadList.css';

const FinanceHeadList = () => {
    const [financeHeads, setFinanceHeads] = useState([]);

    useEffect(() => {
        const fetchFinanceHeads = async () => {
            try {
                const response = await axios.get('/api/finance-heads');
                setFinanceHeads(response.data);
            } catch (error) {
                console.error('Error fetching Finance Heads:', error);
            }
        };

        fetchFinanceHeads();
    }, []);

    return (
        <div className="finance-head-list">
            <h1>Finance Head List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Budget Allocated</th>
                        <th>Budget Spent</th>
                    </tr>
                </thead>
                <tbody>
                    {financeHeads.map(financeHead => (
                        <tr key={financeHead._id}>
                            <td>{financeHead.FinanceHeadID}</td>
                            <td>{financeHead.Name}</td>
                            <td>{financeHead.Email}</td>
                            <td>{financeHead.BudgetAllocated}</td>
                            <td>{financeHead.BudgetSpent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FinanceHeadList;
