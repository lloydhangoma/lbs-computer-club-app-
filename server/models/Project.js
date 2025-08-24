// server/models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] }, // Array of strings (e.g., ['WebDev', 'React'])
    status: { type: String, enum: ['Open', 'InProgress', 'Completed'], default: 'Open' },
    suggestedBy: { type: String, default: 'Anonymous' }, // User's email/name
    createdAt: { type: Date, default: Date.now }
    // Add more fields as needed: teamMembers, repoUrl, etc.
});

module.exports = mongoose.model('Project', ProjectSchema);