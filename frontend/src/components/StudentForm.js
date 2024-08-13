// src/components/StudentForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';

const StudentForm = ({ student, onSuccess }) => {
    const [formData, setFormData] = useState({
        StudentID: student?.StudentID || '',
        Name: student?.Name || '',
        Email: student?.Email || '',
        Department: student?.Department || '',
        Course: student?.Course || '',
        Year: student?.Year || '',
        GPA: student?.GPA || '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (student) {
                // Edit existing student
                await axios.put(`/api/students/${student._id}`, formData);
            } else {
                // Create new student
                await axios.post('/api/students', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="student-form">
            <h1>{student ? 'Edit Student' : 'Add Student'}</h1>
            <form onSubmit={handleSubmit}>
                <label>ID:</label>
                <input type="text" name="StudentID" value={formData.StudentID} onChange={handleChange} required />

                <label>Name:</label>
                <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />

                <label>Department:</label>
                <input type="text" name="Department" value={formData.Department} onChange={handleChange} required />

                <label>Course:</label>
                <input type="text" name="Course" value={formData.Course} onChange={handleChange} required />

                <label>Year:</label>
                <input type="number" name="Year" value={formData.Year} onChange={handleChange} required />

                <label>GPA:</label>
                <input type="number" step="0.01" name="GPA" value={formData.GPA} onChange={handleChange} required />

                {!student && (
                    <>
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </>
                )}

                <button type="submit">{student ? 'Update Student' : 'Add Student'}</button>
            </form>
        </div>
    );
};

export default StudentForm;
