const Principal = require('../models/principalModel');
const ScholarshipApplication = require('../models/scholarshipApplicationModel');
const Scholarship = require('../models/scholarshipModel');
const Notification = require('../models/notificationModel');

// Create a new Principal
exports.createPrincipal = async (req, res) => {
    try {
        const { PrincipalID, Name, Email } = req.body;

        const principal = new Principal({
            PrincipalID,
            Name,
            Email
        });

        await principal.save();
        res.status(201).json({ message: 'Principal created successfully', principal });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Principal', error });
    }
};

// Get all Principals
exports.getPrincipals = async (req, res) => {
    try {
        const principals = await Principal.find();
        res.status(200).json(principals);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Principals', error });
    }
};

// Get a Principal by ID
exports.getPrincipalById = async (req, res) => {
    try {
        const { id } = req.params;
        const principal = await Principal.findById(id);
        if (!principal) {
            return res.status(404).json({ message: 'Principal not found' });
        }
        res.status(200).json(principal);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Principal', error });
    }
};

// Update a Principal by ID
exports.updatePrincipal = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const principal = await Principal.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!principal) {
            return res.status(404).json({ message: 'Principal not found' });
        }
        res.status(200).json({ message: 'Principal updated successfully', principal });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Principal', error });
    }
};

// Delete a Principal by ID
exports.deletePrincipal = async (req, res) => {
    try {
        const { id } = req.params;
        const principal = await Principal.findByIdAndDelete(id);
        if (!principal) {
            return res.status(404).json({ message: 'Principal not found' });
        }
        res.status(200).json({ message: 'Principal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Principal', error });
    }
};

// Review and approve scholarship applications
exports.reviewAndApproveApplications = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { Status } = req.body;

        const application = await ScholarshipApplication.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if the application is already approved or rejected
        if (application.Status !== 'Pending') {
            return res.status(400).json({ message: 'Application has already been reviewed' });
        }

        application.Status = Status;
        await application.save();

        // Send notification to student
        const notification = new Notification({
            StudentID: application.StudentID,
            Message: `Your scholarship application has been ${Status}.`,
            DateSent: new Date()
        });

        await notification.save();

        res.status(200).json({ message: 'Application status updated successfully', application });
    } catch (error) {
        res.status(500).json({ message: 'Error reviewing application', error });
    }
};

// Set scholarship criteria and guidelines
exports.setScholarshipCriteria = async (req, res) => {
    try {
        const { ScholarshipID } = req.params;
        const { Criteria } = req.body;

        const scholarship = await Scholarship.findById(ScholarshipID);
        if (!scholarship) {
            return res.status(404).json({ message: 'Scholarship not found' });
        }

        scholarship.Criteria = Criteria;
        await scholarship.save();

        res.status(200).json({ message: 'Scholarship criteria updated successfully', scholarship });
    } catch (error) {
        res.status(500).json({ message: 'Error updating scholarship criteria', error });
    }
};

// Generate reports on scholarship applications
exports.generateReports = async (req, res) => {
    try {
        // This example generates a simple count of applications by status
        const applications = await ScholarshipApplication.aggregate([
            { $group: { _id: '$Status', count: { $sum: 1 } } }
        ]);

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error generating reports', error });
    }
};

// Communicate with students and HODs about scholarship decisions
exports.communicateDecision = async (req, res) => {
    try {
        const { StudentID, Message } = req.body;

        // Create a notification for the student
        const notification = new Notification({
            StudentID,
            Message,
            DateSent: new Date()
        });

        await notification.save();

        res.status(200).json({ message: `Communication sent to student ${StudentID}`, notification });
    } catch (error) {
        res.status(500).json({ message: 'Error communicating decision', error });
    }
};
