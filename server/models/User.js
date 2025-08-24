const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Remove whitespace from both ends of a string
        lowercase: true, // Store emails in lowercase
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Basic email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Enforce minimum password length
    },
    // ✅ NEW PROFILE FIELDS ADDED BELOW
    name: {
        type: String,
        default: '' // Default to empty string if not provided
    },
    studentId: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    skills: {
        type: [String], // Array of strings (e.g., ['Python', 'Web Dev'])
        default: []
    },
    photoUrl: {
        type: String,
        default: '' // Store the URL of the profile photo
    },
    // ✅ END NEW PROFILE FIELDS
    createdAt: {
        type: Date,
        default: Date.now
    },
    // ⭐ ADD THIS NEW FIELD FOR USER ROLES ⭐
    role: {
        type: String,
        enum: ['member', 'admin'], // Explicitly define allowed roles
        default: 'member' // Default role for new users
    }
});

// Middleware to hash the password before saving the user document
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) { // Only hash if the password has been modified (or is new)
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
    }
    next(); // Continue with the save operation
});

// Method to compare a given password with the hashed password in the database
UserSchema.methods.comparePassword = async function(candidatePassword) {
    // Compares the provided plain text password with the stored hashed password
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);