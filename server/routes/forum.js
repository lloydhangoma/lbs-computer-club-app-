const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement'); // Import the Announcement model
const ForumPost = require('../models/ForumPost');     // Import the ForumPost model
const User = require('../models/User');               // Needed to get user email/name from ID
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to protect routes

// @route   GET /api/announcements
// @desc    Get all announcements
// @access  Private (requires JWT)
router.get('/announcements', authMiddleware, async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 }); // Sort by most recent
        res.json(announcements);
    } catch (error) {
        console.error('Fetch announcements error:', error);
        res.status(500).json({ message: 'Server error while fetching announcements.' });
    }
});

// @route   GET /api/forum-posts
// @desc    Get all forum posts
// @access  Private (requires JWT)
router.get('/forum-posts', authMiddleware, async (req, res) => {
    try {
        const posts = await ForumPost.find().sort({ createdAt: -1 }); // Sort by most recent
        res.json(posts);
    } catch (error) {
        console.error('Fetch forum posts error:', error);
        res.status(500).json({ message: 'Server error while fetching forum posts.' });
    }
});

// @route   POST /api/forum-posts
// @desc    Create a new forum post
// @access  Private (requires JWT)
router.post('/forum-posts', authMiddleware, async (req, res) => {
    const { title, content } = req.body; // Frontend sends title and content
    const userId = req.user.id; // Get user ID from the authenticated token (set by authMiddleware)

    try {
        // Fetch the user to get their email (or name) for the 'author' field
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Posting user not found.' });
        }

        const newPost = new ForumPost({
            title,
            content,
            author: user.email, // Use the user's email as the author
            userId // Link the post to the user's ID
        });
        await newPost.save(); // Save the new post to MongoDB
        res.status(201).json(newPost); // Respond with the created post
    } catch (error) {
        console.error('Create forum post error:', error);
        res.status(500).json({ message: 'Server error while creating post.' });
    }
});

// Optional: You could add a route for adding comments to a post like this:
// @route   POST /api/forum-posts/:postId/comments
// @desc    Add a comment to a specific forum post
// @access  Private (requires JWT)
/*
router.post('/forum-posts/:postId/comments', authMiddleware, async (req, res) => {
    const { text } = req.body;
    const postId = req.params.postId;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Commenting user not found.' });

        const post = await ForumPost.findById(postId);
        if (!post) return res.status(404).json({ message: 'Forum post not found.' });

        const newComment = {
            author: user.email,
            text,
            createdAt: new Date()
        };

        post.comments.push(newComment);
        await post.save();
        res.status(201).json(post.comments[post.comments.length - 1]); // Return the newly added comment
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({ message: 'Server error while adding comment.' });
    }
});
*/

module.exports = router;