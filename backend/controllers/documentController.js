const Document = require('../models/documentModel');
const ScholarshipApplication = require('../models/scholarshipApplicationModel');

// Upload a new document
exports.uploadDocument = async (req, res) => {
    try {
        const { ApplicationID, DocumentType, FilePath } = req.body;

        // Verify that the application exists
        const application = await ScholarshipApplication.findById(ApplicationID);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        const document = new Document({
            ApplicationID,
            DocumentType,
            FilePath
        });

        await document.save();
        res.status(201).json({ message: 'Document uploaded successfully', document });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading document', error });
    }
};

// Get all documents for a specific application
exports.getDocumentsByApplicationId = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const documents = await Document.find({ ApplicationID: applicationId });
        
        if (!documents.length) {
            return res.status(404).json({ message: 'No documents found for this application' });
        }
        
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving documents', error });
    }
};

// Get a document by ID
exports.getDocumentById = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findById(id);
        
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving document', error });
    }
};

// Update a document by ID
exports.updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const document = await Document.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'Document updated successfully', document });
    } catch (error) {
        res.status(500).json({ message: 'Error updating document', error });
    }
};

// Delete a document by ID
exports.deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findByIdAndDelete(id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document', error });
    }
};
