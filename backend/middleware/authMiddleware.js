const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    // Log tokens for debugging
    console.log("🔐 Checking authentication...");
    console.log("Cookies:", req.cookies);
    console.log("Authorization header:", req.headers.authorization);

    // Extract token from cookie or Authorization header
    const cookieToken = req.cookies?.token;
    const authHeader = req.headers.authorization;

    let headerToken = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      headerToken = authHeader.split(" ")[1];
    }

    const token = cookieToken || headerToken;

    if (!token) {
      console.warn("❌ No token provided in cookies or headers");
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        console.error("❌ Token verification failed:", err.name);

        if (err.name === "TokenExpiredError") {
          res.clearCookie("token", { httpOnly: true });
          return res.status(401).json({
            message: "Token expired",
            code: "TOKEN_EXPIRED"
          });
        }

        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      // Token is valid, find user
      const user = await User.findById(decoded.id);
      if (!user) {
        console.warn("❌ User not found for decoded token:", decoded);
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      // Attach user to request
      req.user = user;
      console.log("✅ Authenticated user:", user.email || user._id);
      next();
    });
  } catch (error) {
    console.error("🔥 AuthMiddleware internal error:", error);
    res.status(500).json({ message: "Internal server error in auth middleware", error });
  }
};

module.exports = authMiddleware;
