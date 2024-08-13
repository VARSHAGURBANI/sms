const mongoose = require('mongoose');

// Define the Notification schema based on the ERD
const notificationSchema = new mongoose.Schema({
    NotificationID: {
        type: Number,
        required: true,
        unique: true
    },
    StudentID: {
        type: Number,
        required: true,
        ref: 'Student' // Reference to the Student model
    },
    Message: {
        type: String,
        required: true
    },
    DateSent: {
        type: Date,
        required: true
    }
}, { timestamps: true });

// Create an index on NotificationID for faster queries
notificationSchema.index({ NotificationID: 1 });

// Export the model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
