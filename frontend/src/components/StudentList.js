// src/components/StudentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/api/students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="student-list">
            <h1>Student List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Course</th>
                        <th>Year</th>
                        <th>GPA</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.StudentID}</td>
                            <td>{student.Name}</td>
                            <td>{student.Email}</td>
                            <td>{student.Department}</td>
                            <td>{student.Course}</td>
                            <td>{student.Year}</td>
                            <td>{student.GPA}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
