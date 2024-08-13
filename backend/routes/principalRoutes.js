const express = require('express');
const router = express.Router();
const principalController = require('../controllers/principalController');

// Create a new Principal
router.post('/principals', principalController.createPrincipal);

// Get all Principals
router.get('/principals', principalController.getPrincipals);

// Get a Principal by ID
router.get('/principals/:id', principalController.getPrincipalById);

// Update a Principal by ID
router.put('/principals/:id', principalController.updatePrincipal);

// Delete a Principal by ID
router.delete('/principals/:id', principalController.deletePrincipal);

module.exports = router;
