const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors for handling Cross-Origin Resource Sharing
const dotenv = require('dotenv'); // Import dotenv to load environment variables
const path = require('path'); // Import path module for directory manipulation

console.log('--- Starting server initialization ---'); // Debug log

const authRoutes = require('./routes/auth'); // Import authentication routes
const userRoutes = require('./routes/user'); // Import user profile routes
const eventsRoutes = require('./routes/events'); // Import events routes
const forumRoutes = require('./routes/forum'); // Import forum routes
const projectsRoutes = require('./routes/projects'); // Import projects routes
const learnRoutes = require('./routes/learn'); // ✅ NEW: Import learn routes


dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000; // Define the port for the server

// Middleware
app.use(express.json()); // Allows parsing of JSON request bodies
console.log('Middleware: express.json() applied'); // Debug log

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your React frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
})); // Enable CORS for all routes (adjust origin for production)
console.log('Middleware: CORS applied for origin http://localhost:5173'); // Debug log

// NEW: Serve static files from the 'uploads' directory.
// This makes uploaded profile pictures accessible via http://localhost:5000/uploads/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('Middleware: Static files from /uploads served'); // Debug log

// Global request logger - logs every incoming request
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Deprecated in newer Mongoose versions, but good for compatibility
    useUnifiedTopology: true, // Deprecated, but ensures modern topology engine
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes); // Auth routes (signup, signin) are prefixed with /api
console.log('Routes: /api/auth loaded'); // Debug log

app.use('/api/user', userRoutes); // User profile routes
console.log('Routes: /api/user loaded'); // Debug log

app.use('/api', eventsRoutes); // Events routes
console.log('Routes: /api/events loaded'); // Debug log

app.use('/api', forumRoutes); // Forum & Announcements routes
console.log('Routes: /api/forum loaded'); // Debug log

app.use('/api', projectsRoutes); // Projects routes
console.log('Routes: /api/projects loaded'); // Debug log

app.use('/api', learnRoutes); // ✅ NEW: Learn routes
console.log('Routes: /api/learn loaded'); // Debug log


// Basic test route
app.get('/', (req, res) => {
    console.log('HIT: GET /'); // Debug log
    res.send('Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the backend at http://localhost:${PORT}`);
    console.log('--- Server initialization complete ---'); // Debug log
});
