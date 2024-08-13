const Student = require('../models/studentModel');
const HOD = require('../models/hodModel');
const Principal = require('../models/principalModel');
const FinanceHead = require('../models/financeHeadModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Sign up a new user
exports.signup = async (req, res) => {
    try {
        const { role, Name, Email, Password } = req.body;

        let User;
        switch (role) {
            case 'Student':
                User = Student;
                break;
            case 'HOD':
                User = HOD;
                break;
            case 'Principal':
                User = Principal;
                break;
            case 'FinanceHead':
                User = FinanceHead;
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        const hashedPassword = await bcrypt.hash(Password, 12);

        const user = new User({
            Name,
            Email,
            Password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: `${role} created successfully`, user });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up user', error });
    }
};

// Log in a user
exports.login = async (req, res) => {
    try {
        const { role, Email, Password } = req.body;

        let User;
        switch (role) {
            case 'Student':
                User = Student;
                break;
            case 'HOD':
                User = HOD;
                break;
            case 'Principal':
                User = Principal;
                break;
            case 'FinanceHead':
                User = FinanceHead;
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id, role);

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
};
