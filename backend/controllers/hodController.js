const HOD = require('../models/hodModel');
const ScholarshipApplication = require('../models/scholarshipApplicationModel');

// Create a new HOD
exports.createHOD = async (req, res) => {
    try {
        const { HODID, Name, Email, Department } = req.body;

        const hod = new HOD({
            HODID,
            Name,
            Email,
            Department
        });

        await hod.save();
        res.status(201).json({ message: 'HOD created successfully', hod });
    } catch (error) {
        res.status(500).json({ message: 'Error creating HOD', error });
    }
};

// Get all HODs
exports.getHODs = async (req, res) => {
    try {
        const hods = await HOD.find();
        res.status(200).json(hods);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving HODs', error });
    }
};

// Get a HOD by ID
exports.getHODById = async (req, res) => {
    try {
        const { id } = req.params;
        const hod = await HOD.findById(id);
        if (!hod) {
            return res.status(404).json({ message: 'HOD not found' });
        }
        res.status(200).json(hod);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving HOD', error });
    }
};

// Update a HOD by ID
exports.updateHOD = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const hod = await HOD.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!hod) {
            return res.status(404).json({ message: 'HOD not found' });
        }
        res.status(200).json({ message: 'HOD updated successfully', hod });
    } catch (error) {
        res.status(500).json({ message: 'Error updating HOD', error });
    }
};

// Delete a HOD by ID
exports.deleteHOD = async (req, res) => {
    try {
        const { id } = req.params;
        const hod = await HOD.findByIdAndDelete(id);
        if (!hod) {
            return res.status(404).json({ message: 'HOD not found' });
        }
        res.status(200).json({ message: 'HOD deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting HOD', error });
    }
};

// Get all scholarship applications reviewed by a specific HOD
exports.getApplicationsReviewedByHOD = async (req, res) => {
    try {
        const { id } = req.params;
        const applications = await ScholarshipApplication.find({ HOD: id });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving applications reviewed by HOD', error });
    }
};

// Provide feedback on a scholarship application
exports.provideFeedback = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { HODFeedback } = req.body;

        const application = await ScholarshipApplication.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.HODFeedback = HODFeedback;
        await application.save();

        res.status(200).json({ message: 'Feedback provided successfully', application });
    } catch (error) {
        res.status(500).json({ message: 'Error providing feedback', error });
    }
};

// Approve or reject a scholarship application
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { Status } = req.body;

        const application = await ScholarshipApplication.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.Status = Status;
        await application.save();

        res.status(200).json({ message: 'Application status updated successfully', application });
    } catch (error) {
        res.status(500).json({ message: 'Error updating application status', error });
    }
};
