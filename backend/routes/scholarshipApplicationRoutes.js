const express = require('express');
const router = express.Router();
const scholarshipApplicationController = require('../controllers/scholarshipApplicationController');

// Create a new scholarship application
router.post('/applications', scholarshipApplicationController.createApplication);

// Get all scholarship applications
router.get('/applications', scholarshipApplicationController.getApplications);

// Get a scholarship application by ID
router.get('/applications/:id', scholarshipApplicationController.getApplicationById);

// Update a scholarship application by ID
router.put('/applications/:id', scholarshipApplicationController.updateApplication);

// Delete a scholarship application by ID
router.delete('/applications/:id', scholarshipApplicationController.deleteApplication);

module.exports = router;
