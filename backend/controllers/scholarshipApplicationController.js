const ScholarshipApplication = require('../models/scholarshipApplicationModel');
const Student = require('../models/studentModel');
const Scholarship = require('../models/scholarshipModel');

// Create a new scholarship application
exports.createApplication = async (req, res) => {
    try {
        const { StudentID, ScholarshipID, SubmissionDate, Status, HODFeedback, PrincipalFeedback } = req.body;

        // Verify that the student and scholarship exist
        const student = await Student.findById(StudentID);
        const scholarship = await Scholarship.findById(ScholarshipID);

        if (!student || !scholarship) {
            return res.status(404).json({ message: 'Student or Scholarship not found' });
        }

        const application = new ScholarshipApplication({
            StudentID,
            ScholarshipID,
            SubmissionDate,
            Status,
            HODFeedback,
            PrincipalFeedback
        });

        await application.save();
        res.status(201).json({ message: 'Application created successfully', application });
    } catch (error) {
        res.status(500).json({ message: 'Error creating application', error });
    }
};

// Get all scholarship applications
exports.getApplications = async (req, res) => {
    try {
        const applications = await ScholarshipApplication.find().populate('StudentID').populate('ScholarshipID');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving applications', error });
    }
};

// Get a scholarship application by ID
exports.getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await ScholarshipApplication.findById(id).populate('StudentID').populate('ScholarshipID');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving application', error });
    }
};

// Update a scholarship application by ID
exports.updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const application = await ScholarshipApplication.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ message: 'Application updated successfully', application });
    } catch (error) {
        res.status(500).json({ message: 'Error updating application', error });
    }
};

// Delete a scholarship application by ID
exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await ScholarshipApplication.findByIdAndDelete(id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting application', error });
    }
};
