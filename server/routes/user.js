const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the updated User model (with profile fields)
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to protect routes
const multer = require('multer'); // Used for handling file uploads
const path = require('path'); // Node.js built-in module for path manipulation
const fs = require('fs'); // Node.js built-in module for file system operations

// --- Multer setup for file uploads ---
// Define storage for uploaded files
const storage = multer.diskStorage({
    // Where to store the files (e.g., a 'uploads' folder in your server directory)
    destination: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, '../uploads');
        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true }); // Create directory if it doesn't exist
        }
        cb(null, uploadsDir);
    },
    // Define the filename for the uploaded file
    filename: (req, file, cb) => {
        // Use user ID to make file names unique per user, plus a timestamp and original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${req.user.id}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// Initialize multer upload middleware
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpeg, jpg, png, gif) are allowed!'));
    }
});
// --- End Multer setup ---


// @route   GET /api/user/profile
// @desc    Get current user's profile details
// @access  Private (requires JWT)
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // Find the user by ID from the JWT payload (req.user.id is set by authMiddleware)
        // Select all fields EXCEPT the password for security
        const user = await User.findById(req.user.id).select('-password -__v');
        if (!user) {
            return res.status(404).json({ message: 'User profile not found.' });
        }
        // Return the user object, which now contains all profile fields
        res.json(user);
    } catch (error) {
        console.error('Fetch profile error:', error);
        res.status(500).json({ message: 'Server error while fetching profile.' });
    }
});

// @route   PUT /api/user/profile-update
// @desc    Update current user's profile details
// @access  Private (requires JWT)
router.put('/profile-update', authMiddleware, async (req, res) => {
    // Destructure profile fields from the request body
    const { name, studentId, phone, skills, photoUrl } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update user profile fields
        user.name = name || user.name; // Use existing value if new is not provided
        user.studentId = studentId || user.studentId;
        user.phone = phone || user.phone;
        // Ensure skills are handled correctly as an array of strings
        user.skills = Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()).filter(s => s !== '') : user.skills);
        
        if (photoUrl) { // Only update photoUrl if a new one is explicitly provided
            user.photoUrl = photoUrl;
        }

        await user.save(); // Save the updated user document

        // Respond with success and the updated user profile (excluding password)
        const updatedUser = user.toObject();
        delete updatedUser.password;
        delete updatedUser.__v;

        res.json({ message: 'Profile updated successfully!', user: updatedUser });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error while updating profile.' });
    }
});

// @route   POST /api/user/upload-profile-photo
// @desc    Upload profile photo and update user's photoUrl
// @access  Private (requires JWT)
router.post('/upload-profile-photo', authMiddleware, upload.single('profilePhoto'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Construct the URL to the uploaded file
        // This assumes your server serves static files from the 'uploads' directory
        const photoUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
        
        user.photoUrl = photoUrl; // Update the user's photoUrl field
        await user.save(); // Save the updated user document

        res.json({ message: 'Photo uploaded successfully!', photoUrl: photoUrl });
    } catch (error) {
        console.error('Upload photo error:', error);
        if (error.message === 'Only images (jpeg, jpg, png, gif) are allowed!') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error during photo upload.' });
    }
});

module.exports = router;