// Middleware to handle admin access
const adminMiddleware = async (req, res, next) => {
  try {
    // Check if the user is an admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admin access only' });
    }
    
    // If the user is an admin, proceed
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden: Admin access only: Error' });
  }
};

module.exports = adminMiddleware;
