const jwt = require('jsonwebtoken');

// Load environment variables
require('dotenv').config();

// Middleware to verify JWT token
function authMiddleware(req, res, next) {
    // Get token from header
    const token = req.header('Authorization'); // Assumes token is sent as "Bearer TOKEN"

    // Check if not token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    // Extract token (remove "Bearer " prefix)
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Token format is "Bearer <token>".' });
    }
    const actualToken = tokenParts[1];

    try {
        // Verify token
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

        // Attach user from payload to request object
        req.user = decoded.user; // req.user.id will contain the user's MongoDB ID
        next(); // Proceed to the next middleware/route handler

    } catch (err) {
        console.error('Token verification error:', err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired.' });
        }
        res.status(401).json({ message: 'Token is not valid.' });
    }
}

module.exports = authMiddleware;