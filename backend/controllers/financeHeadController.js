const FinanceHead = require('../models/financeHeadModel');
const Scholarship = require('../models/scholarshipModel');
const Notification = require('../models/notificationModel');

// Create a new Finance Head
exports.createFinanceHead = async (req, res) => {
    try {
        const { FinanceHeadID, Name, Email, BudgetAllocated, BudgetSpent } = req.body;

        const financeHead = new FinanceHead({
            FinanceHeadID,
            Name,
            Email,
            BudgetAllocated,
            BudgetSpent
        });

        await financeHead.save();
        res.status(201).json({ message: 'Finance Head created successfully', financeHead });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Finance Head', error });
    }
};

// Get all Finance Heads
exports.getFinanceHeads = async (req, res) => {
    try {
        const financeHeads = await FinanceHead.find();
        res.status(200).json(financeHeads);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Finance Heads', error });
    }
};

// Get a Finance Head by ID
exports.getFinanceHeadById = async (req, res) => {
    try {
        const { id } = req.params;
        const financeHead = await FinanceHead.findById(id);
        if (!financeHead) {
            return res.status(404).json({ message: 'Finance Head not found' });
        }
        res.status(200).json(financeHead);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Finance Head', error });
    }
};

// Update a Finance Head by ID
exports.updateFinanceHead = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const financeHead = await FinanceHead.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!financeHead) {
            return res.status(404).json({ message: 'Finance Head not found' });
        }
        res.status(200).json({ message: 'Finance Head updated successfully', financeHead });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Finance Head', error });
    }
};

// Delete a Finance Head by ID
exports.deleteFinanceHead = async (req, res) => {
    try {
        const { id } = req.params;
        const financeHead = await FinanceHead.findByIdAndDelete(id);
        if (!financeHead) {
            return res.status(404).json({ message: 'Finance Head not found' });
        }
        res.status(200).json({ message: 'Finance Head deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Finance Head', error });
    }
};

// Allocate funds for approved scholarships
exports.allocateFunds = async (req, res) => {
    try {
        const { ScholarshipID, Amount } = req.body;

        const scholarship = await Scholarship.findById(ScholarshipID);
        if (!scholarship) {
            return res.status(404).json({ message: 'Scholarship not found' });
        }

        // Update scholarship amount and save
        scholarship.Amount = Amount;
        await scholarship.save();

        res.status(200).json({ message: 'Funds allocated successfully', scholarship });
    } catch (error) {
        res.status(500).json({ message: 'Error allocating funds', error });
    }
};

// Track the disbursement of scholarship funds
exports.trackDisbursement = async (req, res) => {
    try {
        const { FinanceHeadID } = req.params;
        const financeHead = await FinanceHead.findById(FinanceHeadID);
        if (!financeHead) {
            return res.status(404).json({ message: 'Finance Head not found' });
        }

        // Fetch the disbursement details
        const disbursementDetails = {
            BudgetAllocated: financeHead.BudgetAllocated,
            BudgetSpent: financeHead.BudgetSpent
        };

        res.status(200).json(disbursementDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error tracking disbursement', error });
    }
};

// Generate financial reports on scholarship spending
exports.generateFinancialReports = async (req, res) => {
    try {
        // Example: Get total budget allocated and spent
        const totalBudget = await FinanceHead.aggregate([
            { $group: { _id: null, totalAllocated: { $sum: '$BudgetAllocated' }, totalSpent: { $sum: '$BudgetSpent' } } }
        ]);

        res.status(200).json(totalBudget);
    } catch (error) {
        res.status(500).json({ message: 'Error generating financial reports', error });
    }
};
