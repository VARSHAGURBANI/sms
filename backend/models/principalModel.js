const mongoose = require('mongoose');

// Define the Principal schema based on the ERD
const principalSchema = new mongoose.Schema({
    PrincipalID: {
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
    password: { // Added for authentication
        type: String,
        required: true
    }
}, { timestamps: true });

// Create an index on PrincipalID for faster queries
principalSchema.index({ PrincipalID: 1 });

// Pre-save hook to hash the password before saving it to the database
principalSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const bcrypt = require('bcryptjs');
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords during login
principalSchema.methods.comparePassword = async function (enteredPassword) {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
const Principal = mongoose.model('Principal', principalSchema);

module.exports = Principal;
