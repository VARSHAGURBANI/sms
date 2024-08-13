const Notification = require('../models/notificationModel');
const Student = require('../models/studentModel');

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const { StudentID, Message } = req.body;

        // Verify that the student exists
        const student = await Student.findById(StudentID);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const notification = new Notification({
            StudentID,
            Message,
            DateSent: new Date()
        });

        await notification.save();
        res.status(201).json({ message: 'Notification created successfully', notification });
    } catch (error) {
        res.status(500).json({ message: 'Error creating notification', error });
    }
};

// Get all notifications for a specific student
exports.getNotificationsByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;
        const notifications = await Notification.find({ StudentID: studentId }).sort({ DateSent: -1 });
        
        if (!notifications.length) {
            return res.status(404).json({ message: 'No notifications found for this student' });
        }
        
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notifications', error });
    }
};

// Get a notification by ID
exports.getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notification', error });
    }
};

// Update a notification by ID
exports.updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const notification = await Notification.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        
        res.status(200).json({ message: 'Notification updated successfully', notification });
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error });
    }
};

// Delete a notification by ID
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error });
    }
};
