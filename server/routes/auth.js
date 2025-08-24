const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for creating tokens

// Load environment variables (important for JWT_SECRET)
require('dotenv').config();

// @route   POST /api/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Create a new user instance
        user = new User({
            email,
            password // Password will be hashed by the pre-save hook in User model
        });

        // Save the user to the database
        await user.save();

        // Respond with success message (or you can generate a token here directly)
        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.error('Signup error:', error);
        // Handle validation errors or other database errors
        if (error.code === 11000) { // Duplicate key error (e.g., email unique constraint)
            return res.status(400).json({ message: 'Email already in use.' });
        }
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// @route   POST /api/signin
// @desc    Authenticate user & get token
// @access  Public
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Compare provided password with hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT
        const payload = {
            user: {
                id: user.id // MongoDB's _id is suitable for JWT payload
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Use the secret from .env
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token, userId: user.id }); // Send the token and user ID to the client
            }
        );

    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Server error during signin.' });
    }
});

module.exports = router;