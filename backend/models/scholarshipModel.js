const mongoose = require('mongoose');

// Define the Scholarship schema based on the ERD
const scholarshipSchema = new mongoose.Schema({
    ScholarshipID: {
        type: Number,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Criteria: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Create an index on ScholarshipID for faster queries
scholarshipSchema.index({ ScholarshipID: 1 });

// Export the model
const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;

