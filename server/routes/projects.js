// server/routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Import the Project model
const User = require('../models/User'); // Needed to get user email/name from ID
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to protect routes

// @route   GET /api/projects
// @desc    Get all projects
// @access  Private (requires JWT)
router.get('/projects', authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }); // Sort by most recent
        res.json(projects);
    } catch (error) {
        console.error('Fetch projects error:', error);
        res.status(500).json({ message: 'Server error while fetching projects.' });
    }
});

// @route   POST /api/project-ideas
// @desc    Submit a new project idea
// @access  Private (requires JWT)
router.post('/project-ideas', authMiddleware, async (req, res) => {
    const { title, description } = req.body; // Frontend sends title and description
    const userId = req.user.id; // Get user ID from the authenticated token (set by authMiddleware)

    try {
        // Fetch the user to get their email (or name) for the 'suggestedBy' field
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Submitting user not found.' });
        }

        const newProjectIdea = new Project({
            title,
            description,
            suggestedBy: user.email, // Use the user's email as suggestedBy
            status: 'Open' // New ideas typically start as 'Open'
        });
        await newProjectIdea.save(); // Save the new project idea to MongoDB
        res.status(201).json(newProjectIdea); // Respond with the created project idea
    } catch (error) {
        console.error('Submit project idea error:', error);
        res.status(500).json({ message: 'Server error while submitting idea.' });
    }
});

module.exports = router;