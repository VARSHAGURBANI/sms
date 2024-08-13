const mongoose = require('mongoose');

// Define the Document schema based on the ERD
const documentSchema = new mongoose.Schema({
    DocumentID: {
        type: Number,
        required: true,
        unique: true
    },
    ApplicationID: {
        type: Number,
        required: true,
        ref: 'ScholarshipApplication' // Reference to the ScholarshipApplication model
    },
    DocumentType: {
        type: String,
        required: true
    },
    FilePath: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create an index on DocumentID for faster queries
documentSchema.index({ DocumentID: 1 });

// Export the model
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
