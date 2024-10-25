const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import user model to verify admin

// Middleware to handle authentication and admin check
const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the JWT token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          console.log('Token has expired');
        } else {
          console.log('Token verification error:', err.message);
        }
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
  
      req.userId = decoded.id;
      next();
    });
    req.userId = decoded.userId;

    // Fetch user by ID
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Attach user to request object
    req.user = user;

    // Proceed to next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
