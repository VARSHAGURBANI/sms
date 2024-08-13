// src/components/NotificationForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotificationForm.css';

const NotificationForm = ({ notification, onSuccess }) => {
    const [formData, setFormData] = useState({
        NotificationID: notification?.NotificationID || '',
        StudentID: notification?.StudentID || '',
        Message: notification?.Message || '',
        DateSent: notification?.DateSent || ''
    });

    useEffect(() => {
        if (notification) {
            setFormData({
                NotificationID: notification.NotificationID,
                StudentID: notification.StudentID,
                Message: notification.Message,
                DateSent: notification.DateSent
            });
        }
    }, [notification]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (notification) {
                // Edit existing notification
                await axios.put(`/api/notifications/${notification._id}`, formData);
            } else {
                // Create new notification
                await axios.post('/api/notifications', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="notification-form">
            <h1>{notification ? 'Edit Notification' : 'Add Notification'}</h1>
            <form onSubmit={handleSubmit}>
                <label>Notification ID:</label>
                <input type="text" name="NotificationID" value={formData.NotificationID} onChange={handleChange} required />

                <label>Student ID:</label>
                <input type="text" name="StudentID" value={formData.StudentID} onChange={handleChange} required />

                <label>Message:</label>
                <textarea name="Message" value={formData.Message} onChange={handleChange} required />

                <label>Date Sent:</label>
                <input type="date" name="DateSent" value={formData.DateSent} onChange={handleChange} required />

                <button type="submit">{notification ? 'Update Notification' : 'Add Notification'}</button>
            </form>
        </div>
    );
};

export default NotificationForm;
