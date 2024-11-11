const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import the User model

// Middleware to handle authentication and token verification
const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          console.log("Token has expired");
          return res
            .status(401)
            .json({ message: "Token expired", code: "TOKEN_EXPIRED" });
        } else {
          console.log("Token verification error:", err.message);
          return res.status(401).json({ message: "Invalid token" });
        }
      }

      req.userId = decoded.id;

      // Fetch user by ID
      const user = await User.findById(req.userId);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      // Attach user to request object
      req.user = user;

      // Proceed to the next middleware or route
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
