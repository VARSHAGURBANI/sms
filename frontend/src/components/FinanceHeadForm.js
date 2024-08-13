// src/components/FinanceHeadForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FinanceHeadForm.css';

const FinanceHeadForm = ({ financeHead, onSuccess }) => {
    const [formData, setFormData] = useState({
        FinanceHeadID: financeHead?.FinanceHeadID || '',
        Name: financeHead?.Name || '',
        Email: financeHead?.Email || '',
        BudgetAllocated: financeHead?.BudgetAllocated || '',
        BudgetSpent: financeHead?.BudgetSpent || ''
    });

    useEffect(() => {
        if (financeHead) {
            setFormData({
                FinanceHeadID: financeHead.FinanceHeadID,
                Name: financeHead.Name,
                Email: financeHead.Email,
                BudgetAllocated: financeHead.BudgetAllocated,
                BudgetSpent: financeHead.BudgetSpent
            });
        }
    }, [financeHead]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (financeHead) {
                // Edit existing Finance Head
                await axios.put(`/api/finance-heads/${financeHead._id}`, formData);
            } else {
                // Create new Finance Head
                await axios.post('/api/finance-heads', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="finance-head-form">
            <h1>{financeHead ? 'Edit Finance Head' : 'Add Finance Head'}</h1>
            <form onSubmit={handleSubmit}>
                <label>ID:</label>
                <input type="text" name="FinanceHeadID" value={formData.FinanceHeadID} onChange={handleChange} required />

                <label>Name:</label>
                <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />

                <label>Budget Allocated:</label>
                <input type="number" name="BudgetAllocated" value={formData.BudgetAllocated} onChange={handleChange} step="0.01" required />

                <label>Budget Spent:</label>
                <input type="number" name="BudgetSpent" value={formData.BudgetSpent} onChange={handleChange} step="0.01" required />

                <button type="submit">{financeHead ? 'Update Finance Head' : 'Add Finance Head'}</button>
            </form>
        </div>
    );
};

export default FinanceHeadForm;

