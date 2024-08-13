// src/components/NotificationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NotificationList.css';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/api/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="notification-list">
            <h1>Notifications</h1>
            <table>
                <thead>
                    <tr>
                        <th>Notification ID</th>
                        <th>Student ID</th>
                        <th>Message</th>
                        <th>Date Sent</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map(notification => (
                        <tr key={notification._id}>
                            <td>{notification.NotificationID}</td>
                            <td>{notification.StudentID}</td>
                            <td>{notification.Message}</td>
                            <td>{new Date(notification.DateSent).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NotificationList;
