// server/routes/learn.js
const express = require('express');
const router = express.Router();
const LearningResource = require('../models/LearningResource');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/learning-resources
// @desc    Get all learning resources
// @access  Private
router.get('/learning-resources', authMiddleware, async (req, res) => {
    try {
        const resources = await LearningResource.find().sort({ createdAt: -1 });
        // You might want to structure the response by category here for frontend convenience
        const categorizedResources = {};
        resources.forEach(resource => {
            if (!categorizedResources[resource.category]) {
                categorizedResources[resource.category] = [];
            }
            categorizedResources[resource.category].push(resource);
        });
        res.json(categorizedResources);
    } catch (error) {
        console.error('Fetch learning resources error:', error);
        res.status(500).json({ message: 'Server error while fetching learning resources.' });
    }
});

module.exports = router;