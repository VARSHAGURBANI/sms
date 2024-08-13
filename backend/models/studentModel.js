// backend/models/studentModel.js
const mongoose = require('mongoose');

// Define the Student schema based on the ERD
const studentSchema = new mongoose.Schema({
    StudentID: {
        type: Number,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Department: {
        type: String,
        required: true
    },
    Course: {
        type: String,
        required: true
    },
    Year: {
        type: Number,
        required: true
    },
    GPA: {
        type: Number,
        required: true
    },
    password: { // Added for authentication
        type: String,
        required: true
    },
}, { timestamps: true });

// Create an index on StudentID for faster queries
studentSchema.index({ StudentID: 1 });

// Pre-save hook to hash the password before saving it to the database
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const bcrypt = require('bcryptjs');
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords during login
studentSchema.methods.comparePassword = async function (enteredPassword) {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
