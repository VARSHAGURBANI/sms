const mongoose = require('mongoose');

// Define the Scholarship Application schema based on the ERD
const scholarshipApplicationSchema = new mongoose.Schema({
    ApplicationID: {
        type: Number,
        required: true,
        unique: true
    },
    StudentID: {
        type: Number,
        required: true,
        ref: 'Student' // Reference to the Student model
    },
    ScholarshipID: {
        type: Number,
        required: true,
        ref: 'Scholarship' // Reference to the Scholarship model
    },
    SubmissionDate: {
        type: Date,
        required: true
    },
    Status: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Rejected'] // Possible values for status
    },
    HODFeedback: {
        type: String,
        default: ''
    },
    PrincipalFeedback: {
        type: String,
        default: ''
    }
}, { timestamps: true });

// Create an index on ApplicationID for faster queries
scholarshipApplicationSchema.index({ ApplicationID: 1 });

// Export the model
const ScholarshipApplication = mongoose.model('ScholarshipApplication', scholarshipApplicationSchema);

module.exports = ScholarshipApplication;
