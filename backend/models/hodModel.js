const mongoose = require('mongoose');

// Define the HOD schema based on the ERD
const hodSchema = new mongoose.Schema({
    HODID: {
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
    Department: {
        type: String,
        required: true
    },
    password: { // Added for authentication
        type: String,
        required: true
    }
}, { timestamps: true });

// Create an index on HODID for faster queries
hodSchema.index({ HODID: 1 });

// Pre-save hook to hash the password before saving it to the database
hodSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const bcrypt = require('bcryptjs');
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords during login
hodSchema.methods.comparePassword = async function (enteredPassword) {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
const HOD = mongoose.model('HOD', hodSchema);

module.exports = HOD;
