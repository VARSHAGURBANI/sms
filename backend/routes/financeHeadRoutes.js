const express = require('express');
const router = express.Router();
const financeHeadController = require('../controllers/financeHeadController');

// Create a new Finance Head
router.post('/finance-heads', financeHeadController.createFinanceHead);

// Get all Finance Heads
router.get('/finance-heads', financeHeadController.getFinanceHeads);

// Get a Finance Head by ID
router.get('/finance-heads/:id', financeHeadController.getFinanceHeadById);

// Update a Finance Head by ID
router.put('/finance-heads/:id', financeHeadController.updateFinanceHead);

// Delete a Finance Head by ID
router.delete('/finance-heads/:id', financeHeadController.deleteFinanceHead);

// Allocate funds for scholarships
router.post('/finance-heads/allocate-funds', financeHeadController.allocateFunds);

// Track scholarship fund disbursement
router.get('/finance-heads/:id/disbursement', financeHeadController.trackDisbursement);

// Generate financial reports
router.get('/finance-heads/reports', financeHeadController.generateFinancialReports);

module.exports = router;
