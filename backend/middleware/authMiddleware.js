const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtSecret = process.env.JWT_SECRET;

// Middleware to verify token and attach user to request
const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Token has expired");
        res.clearCookie("token", { httpOnly: true });
        return res.status(401).json({ message: "Token expired", code: "TOKEN_EXPIRED" });
      }
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ message: "Error fetching user data", error });
    }
  });
};



module.exports =  authMiddleware ;
