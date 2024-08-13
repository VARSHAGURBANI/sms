const express = require('express');
const router = express.Router();
const hodController = require('../controllers/hodController');

// Create a new HOD
router.post('/hods', hodController.createHOD);

// Get all HODs
router.get('/hods', hodController.getHODs);

// Get an HOD by ID
router.get('/hods/:id', hodController.getHODById);

// Update an HOD by ID
router.put('/hods/:id', hodController.updateHOD);

// Delete an HOD by ID
router.delete('/hods/:id', hodController.deleteHOD);

module.exports = router;
