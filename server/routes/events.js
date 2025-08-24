// server/routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/member-events
// @desc    Get all member-exclusive events
// @access  Private
router.get('/member-events', authMiddleware, async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 }); // Sort by date descending
        // Add isPast flag dynamically for frontend consumption
        const eventsWithPastStatus = events.map(event => ({
            ...event.toObject(),
            isPast: new Date(event.date) < new Date()
        }));
        res.json(eventsWithPastStatus);
    } catch (error) {
        console.error('Fetch events error:', error);
        res.status(500).json({ message: 'Server error while fetching events.' });
    }
});

module.exports = router;