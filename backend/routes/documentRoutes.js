const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Upload a new document
router.post('/documents', documentController.uploadDocument);

// Get all documents for a specific application
router.get('/documents/application/:applicationId', documentController.getDocumentsByApplicationId);

// Get a document by ID
router.get('/documents/:id', documentController.getDocumentById);

// Update a document by ID
router.put('/documents/:id', documentController.updateDocument);

// Delete a document by ID
router.delete('/documents/:id', documentController.deleteDocument);

module.exports = router;
