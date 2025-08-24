// server/models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }, // Store as Date object
    time: { type: String, default: '' },
    location: { type: String, required: true },
    type: { type: String, enum: ['Workshop', 'Session', 'Speaker', 'Meeting', 'Other'], default: 'Other' },
    imageUrl: { type: String, default: '' },
    rsvp: { type: Boolean, default: false },
    materials: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);