const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');

// Create a new scholarship
router.post('/scholarships', scholarshipController.createScholarship);

// Get all scholarships
router.get('/scholarships', scholarshipController.getScholarships);

// Get a scholarship by ID
router.get('/scholarships/:id', scholarshipController.getScholarshipById);

// Update a scholarship by ID
router.put('/scholarships/:id', scholarshipController.updateScholarship);

// Delete a scholarship by ID
router.delete('/scholarships/:id', scholarshipController.deleteScholarship);

module.exports = router;
