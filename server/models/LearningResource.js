// server/models/LearningResource.js
const mongoose = require('mongoose');

const LearningResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['Challenge', 'Guide', 'Library', 'Workshop Material', 'Other'], default: 'Other' },
    category: { type: String, required: true }, // e.g., 'Coding Challenges', 'Advanced Guides'
    contentItems: { type: [String], default: [] }, // List of specific items or topics
    link: { type: String }, // Optional link for external resources
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LearningResource', LearningResourceSchema);