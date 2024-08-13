const mongoose = require('mongoose');

// Define the Finance Head schema based on the ERD
const financeHeadSchema = new mongoose.Schema({
    FinanceHeadID: {
        type: Number,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    BudgetAllocated: {
        type: Number,
        required: true
    },
    BudgetSpent: {
        type: Number,
        required: true
    },
    password: { // Added for authentication
        type: String,
        required: true
    }
}, { timestamps: true });

// Create an index on FinanceHeadID for faster queries
financeHeadSchema.index({ FinanceHeadID: 1 });

// Pre-save hook to hash the password before saving it to the database
financeHeadSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const bcrypt = require('bcryptjs');
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords during login
financeHeadSchema.methods.comparePassword = async function (enteredPassword) {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
const FinanceHead = mongoose.model('FinanceHead', financeHeadSchema);

module.exports = FinanceHead;
