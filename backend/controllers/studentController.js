const Student = require('../models/studentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const { StudentID, Name, Email, Department, Course, Year, GPA, password } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            StudentID,
            Name,
            Email,
            Department,
            Course,
            Year,
            GPA,
            password: hashedPassword
        });

        await student.save();
        res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error });
    }
};

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error });
    }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student', error });
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Update student details
        const student = await Student.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
};

// Authenticate a student and generate a JWT
exports.loginStudent = async (req, res) => {
    try {
        const { Email, password } = req.body;

        // Find student by email
        const student = await Student.findOne({ Email });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: student._id, Email: student.Email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
