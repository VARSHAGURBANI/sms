const Scholarship = require('../models/scholarshipModel');

// Create a new scholarship
exports.createScholarship = async (req, res) => {
    try {
        const { ScholarshipID, Name, Description, Criteria, Amount } = req.body;

        const scholarship = new Scholarship({
            ScholarshipID,
            Name,
            Description,
            Criteria,
            Amount
        });

        await scholarship.save();
        res.status(201).json({ message: 'Scholarship created successfully', scholarship });
    } catch (error) {
        res.status(500).json({ message: 'Error creating scholarship', error });
    }
};

// Get all scholarships
exports.getScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.find();
        res.status(200).json(scholarships);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving scholarships', error });
    }
};

// Get a scholarship by ID
exports.getScholarshipById = async (req, res) => {
    try {
        const { id } = req.params;
        const scholarship = await Scholarship.findById(id);
        if (!scholarship) {
            return res.status(404).json({ message: 'Scholarship not found' });
        }
        res.status(200).json(scholarship);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving scholarship', error });
    }
};

// Update a scholarship by ID
exports.updateScholarship = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const scholarship = await Scholarship.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!scholarship) {
            return res.status(404).json({ message: 'Scholarship not found' });
        }
        res.status(200).json({ message: 'Scholarship updated successfully', scholarship });
    } catch (error) {
        res.status(500).json({ message: 'Error updating scholarship', error });
    }
};

// Delete a scholarship by ID
exports.deleteScholarship = async (req, res) => {
    try {
        const { id } = req.params;
        const scholarship = await Scholarship.findByIdAndDelete(id);
        if (!scholarship) {
            return res.status(404).json({ message: 'Scholarship not found' });
        }
        res.status(200).json({ message: 'Scholarship deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting scholarship', error });
    }
};
